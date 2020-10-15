

import React, { useEffect, useState } from "react"
import Modal from "./modal"
import Badge from "./badge"
import styles from "./css/modal_profile.module.css"
import { logout } from "../utils/auth"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useFirebase } from "gatsby-plugin-firebase"
import { useStaticQuery, graphql } from "gatsby"

const ProfileModal = props => {
  const [firebase, setFirebase] = useState()
  const [userStatus, setUserStatus] = useState("Loading")
  const [userBadges, setUserBadges] = useState([])

  useFirebase(fb => {
    setFirebase(fb)
  }, [])

  function HasBadge(badge_id) {
    console.log(`id: ${badge_id} has: ${userBadges.includes(badge_id)}`);
    userBadges.includes(badge_id);
  }

  const data = useStaticQuery(graphql`
    {
      allFile(filter: { extension: { eq: "png" } }) {
        edges {
          node {
            publicURL
            name
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
      setUserBadges={setUserBadges}
      id="profilemodal"
    >
      <div className={styles.modal}>
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col col-xs-12">
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
          <div class="col col-xs-12">
            <div className={styles.applicationcontainer}>
              <div className={styles.modalsectiontitle}>Application Status</div>
              <div className={styles.modalsectioncontent}>{userStatus}</div>
            </div>
            <hr></hr>
            <div className={styles.teamfindercontainer}>
              <div className={styles.modalsectiontitle}>
                External Team Finder
              </div>
              <div className={styles.modalsectioncontent}>
                Find your team here
              </div>
            </div>
          </div>
          <div class="col col-xs-12">
            <hr></hr>
          </div>
          <div class="col col-xs-12">
            <div className={styles.badgescontainer}>
              <div className={styles.modalsectiontitle}>Badges</div>
              <div>{userBadges}</div>
              <div className={styles.modalsectioncontent}>
                {data.allFile.edges.map((file, index) => {
                  return <Badge active={HasBadge(file.node.name)} image={file.node.publicURL}></Badge>;
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
