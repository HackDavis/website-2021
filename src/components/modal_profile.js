import React, { useEffect, useState } from "react"
import Modal from "./modal"
import Badge from "./badge"
import styles from "./css/modal_profile.module.css"
import { logout } from "../utils/auth"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useFirebase } from "gatsby-plugin-firebase"
import { useStaticQuery, graphql } from "gatsby"
import Skeleton from 'react-loading-skeleton';

const ProfileModal = props => {
  const [firebase, setFirebase] = useState()
  const [userStatus, setUserStatus] = useState({status: "Loading", badges: []})
  const [hasLoaded, setHasLoaded] = useState()

  useFirebase(fb => {
    setFirebase(fb)
  }, [])

  function HasBadge(badge_id) {
    return userStatus.badges && badge_id in userStatus.badges;
  }

  function GetBadgeDate(badge_id)
  {
    console.log(userStatus.badges[badge_id])
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
      hasLoaded={hasLoaded}
      setHasLoaded={setHasLoaded}
      id="profilemodal"
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
                Find your team here
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
