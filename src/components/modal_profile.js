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

const ProfileModal = props => {
  const [firebase, setFirebase] = useState()
  const [userStatus, setUserStatus] = useState({status: "Loading", badges: [], group_id: "", pending_groups: []})
  const [groups, setGroups] = useState({})
  const [hasLoaded, setHasLoaded] = useState()
  const [groupsHasLoaded, setGroupsHasLoaded] = useState()
  const [isInTeam, setIsInTeam] = useState()
  const [notificationState, setNotificationState] = useState({ active: false })
  
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

  return (
    <Modal
      {...props}
      isProfile={true}
      setUserStatus={setUserStatus}
      setGroups={setGroups}
      hasLoaded={hasLoaded}
      setHasLoaded={setHasLoaded}
      groupsHasLoaded = {groupsHasLoaded}
      setGroupsHasLoaded = {setGroupsHasLoaded}
      setIsInTeam={setIsInTeam} 
      isInTeam={isInTeam}
      id="profilemodal"
      DisplayNotification={DisplayNotification}
      notificationState={notificationState}
    >
      <div className={styles.modal}>
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col col-xs-12">
              <a
                className={styles.logout}
                href="/"
                onClick={event => {
                  event.preventDefault()
                  logout(firebase).then(() => props.setIsOpen(false))
                }}
              >
                <div>Log Out</div>
              </a>
            </div>
          </div>
          <div className="col col-xs-12">
            <div className={styles.applicationcontainer}>
              <div className={styles.modalsectiontitle}>Application Status</div>
              <div className={styles.modalsectioncontent}>{hasLoaded ? userStatus.status : <Skeleton/>}</div>
            </div>
            <hr></hr>
            <div className={styles.teamfindercontainer}>
              <div className={styles.modalsectiontitle}>
                Team Finder
              </div>
              <div className={styles.modalsectioncontent}>
                {/* {console.log("RERENDER TEAM FINDER IN MODAL PROFILE")} */}
                <TeamFinder 
                  {...props} 
                  setIsInTeam={setIsInTeam} 
                  isInTeam={isInTeam} 
                  hasLoaded={hasLoaded} 
                  groups={groups}
                  userStatus={userStatus} 
                  setUserStatus={setUserStatus} 
                  DisplayNotification={DisplayNotification}></TeamFinder>
              </div>
            </div>
          </div>
          <div className="col col-xs-12">
            <hr></hr>
          </div>
          <div className="col col-xs-12">
            <div className={styles.badgescontainer}>
              <div className={styles.modalsectiontitle}>Badges</div>
              <div className={styles.modalsectioncontent}>
                {data.allFile.edges.map((file, index) => {
                  return file.node.dir.endsWith("badges") &&
                  <Badge hasLoaded={hasLoaded} date={GetBadgeDate(file.node.name)} active={HasBadge(file.node.name)} image={file.node.publicURL} key={index}></Badge>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileModal
