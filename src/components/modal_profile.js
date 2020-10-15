import React, { useEffect, useState } from "react"
import Modal from "./modal"
import Badge from "./badge"
import styles from "./css/modal_profile.module.css"
import { logout } from "../utils/auth"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useFirebase } from "gatsby-plugin-firebase"

const badge_ids = [1, 2, 3, 4, 5, 6]

function HasBadge(badge_id)
{
    // return badges.contains(badge_id)
}

const ProfileModal = props => {
  const [firebase, setFirebase] = useState()
  const [userStatus, setUserStatus] = useState("Loading")

  useFirebase(fb => {
    setFirebase(fb)
  }, [])

  return (
    <Modal
      {...props}
      isProfile={true}
      setUserStatus={setUserStatus}
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
              <div className={styles.modalsectioncontent}>
                {badge_ids.map(function(id, index){
                    return <Badge active={HasBadge(id)} image={`../images/badges/badge_${id}.png`}></Badge>;
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
