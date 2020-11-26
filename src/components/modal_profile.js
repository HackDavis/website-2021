import React, { useEffect, useState } from "react"
import Modal from "./modal"
import Badge from "./badge"
import styles from "./css/modal_profile.module.css"
import { logout } from "../utils/auth"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useFirebase } from "gatsby-plugin-firebase"
import { useStaticQuery, graphql } from "gatsby"
import Skeleton from 'react-loading-skeleton';
import TeamFinder from "./teamfinder/team_finder"
import notification_styles from "./css/notification.module.css"
import $ from "jquery";
import BadgePage from "./badge_page"

const ProfileModal = props => {
  const [firebase, setFirebase] = useState()
  const [userStatus, setUserStatus] = useState({status: "Loading", badges: [], group_id: "", pending_groups: []})
  const [groups, setGroups] = useState({})
  const [hasLoaded, setHasLoaded] = useState()
  const [isInTeam, setIsInTeam] = useState()
  const [notificationState, setNotificationState] = useState({ active: false })
  const [badgesOpen, setBadgesOpen] = useState(false); // True if badges page is open
  
    // Displays a notification on success/failure
    function DisplayNotification(text, bg_color, time_to_display) {
      // Show notification
      time_to_display = time_to_display || 3000;
      setNotificationState({
          active: true,
          bg_color: bg_color,
          text: text,
          opacity: 1
      })

      setTimeout(() => {
          // Hide notification
          $(`div.${notification_styles.main_container}`)
          .animate(
              {
                  opacity: 0,
              },
              200,
              function () {
                setNotificationState({ active: false })
              }
          )
      }, time_to_display);
  }

  useFirebase(fb => {
    setFirebase(fb)
  }, [])

  function HasBadge(badge_id) {
    return userStatus.badges && badge_id in userStatus.badges;
  }

  function GetBadgeDate(badge_id)
  {
    return userStatus.badges && userStatus.badges[badge_id]
  }

  const data = useStaticQuery(graphql`
  {
    allFile(filter: { extension: { eq: "png"} }, sort: {fields:[name] order: ASC}) {
      edges {
        node {
          publicURL
          name
          dir
        }
      }
    }
  }
  `)

  function GetImageMap()
  {
      const image_data = {}

      for (let i = 0; i < data.allFile.edges.length; i++)
      {
          const image_node = data.allFile.edges[i].node;
          image_data[image_node.name] = image_node.publicURL;
      }

      return image_data;
  }

  const images = GetImageMap();

  return (
    <Modal
      {...props}
      isProfile={true}
      setUserStatus={setUserStatus}
      groups={groups}
      setGroups={setGroups}
      hasLoaded={hasLoaded}
      setHasLoaded={setHasLoaded}
      setIsInTeam={setIsInTeam} 
      isInTeam={isInTeam}
      id="profilemodal"
      DisplayNotification={DisplayNotification}
      notificationState={notificationState}
    >
      {badgesOpen ? 
        <BadgePage {...props} data={data} hasLoaded={hasLoaded} GetBadgeDate={GetBadgeDate} HasBadge={HasBadge} setBadgesOpen={setBadgesOpen}></BadgePage>
      : <div className={styles.modal}>
        <a
          className={styles.logout}
          href="/"
          onClick={event => {
            event.preventDefault()
            window.location.reload(true)
            logout(firebase).then(() => props.setIsOpen(false))
          }}
        >
          <img className={styles.signout_button} src={images["signout"]}></img>
          <div style={{display: "inline-block"}}>Sign Out</div>
        </a>
        <div className={`${styles.relative}`}>
          <div className={styles.applicationcontainer}>
            <div className={styles.modalsectiontitle}>Application Status</div>
            <div className={styles.modalsectioncontent}>{hasLoaded ? userStatus.status : <Skeleton/>}</div>
          </div>
          <hr></hr>
          
          <div className={styles.badgescontainer}>
            <a
              className={styles.badge_button}
              href="/"
              onClick={event => {
                  event.preventDefault()
                  setBadgesOpen(true);
              }}
            >
              <div className={styles.modalsectiontitle}>
                Badges
                <div className={styles.badge_icon}>
                  <svg width="0.6em" height="0.6em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              </div>
            </a>
            <div className={styles.modalsectioncontent}>
              {data.allFile.edges.map((file, index) => {
                return file.node.dir.endsWith("badges") &&
                <Badge hasLoaded={hasLoaded} date={GetBadgeDate(file.node.name)} active={HasBadge(file.node.name)} image={file.node.publicURL} key={index}></Badge>;
              })}
            </div>
          </div>
          <hr></hr>
          <div className={styles.teamfindercontainer}>
            <div className={styles.team_finder}>
              Team Finder
            </div>
            <div className={styles.modalsectioncontent}>
              <TeamFinder 
                  {...props} 
                  setIsInTeam={setIsInTeam} 
                  isInTeam={isInTeam} 
                  hasLoaded={hasLoaded} 
                  groups={groups}
                  setGroups={setGroups}
                  userStatus={userStatus} 
                  setUserStatus={setUserStatus} 
                  DisplayNotification={DisplayNotification}></TeamFinder>
            </div>
          </div>
        </div>
      </div>}
    </Modal>
  )
}

export default ProfileModal
