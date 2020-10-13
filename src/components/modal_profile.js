import React, { useEffect, useState } from "react"
import Modal from "./modal"
import Badge from "./badge"
import styles from "./css/modal_profile.module.css"
import { getUser, isLoggedIn, logout } from "../utils/auth"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useFirebase } from "gatsby-plugin-firebase"

const ProfileModal = props => {
  const user = getUser()
  const { uid, displayName, email } = user
  const [firebase, setFirebase] = useState()
  const [userStatus, setUserStatus] = useState("Loading")

  useFirebase(fb => {
    setFirebase(fb)
  }, [])

  useEffect(() => {
    if (!firebase) return

    // this check is only necessary because of the useEffect glitch
    if (isLoggedIn()) {
      var db = firebase.firestore()
      console.log(db)
      var docRef = db.collection("users").doc(uid)

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setUserStatus(doc.data().app_status)
          } else {
            console.log("No such document exists")
          }
        })
        .catch(function (error) {
          console.log(`Error getting document: ${error}`)
        })
    }
  })

  return (
    <Modal {...props} id="profilemodal">
      <div className={styles.modal}>
        <div class="container-fluid p-0">
          <div class="row no-gutters">
            <div class="col col-xs-12">
              <a
                href="/"
                onClick={event => {
                  event.preventDefault()
                  logout(firebase).then(() => props.setIsOpen(false))
                }}
              >
                <u>Log Out</u>
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
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={false}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={false}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={false}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={false}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={false}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={false}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
                <Badge active={true}></Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileModal
