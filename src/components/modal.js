import React, { useState, useEffect } from "react"
import styles from "./css/modal.module.css"
import $ from "jquery"
import { getUser, isLoggedIn } from "../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase"

const Modal = props => {
  const user = getUser()
  const { uid } = user

  const [firebase, setFirebase] = useState()

  useFirebase(fb => {
    setFirebase(fb)
  }, [])

  useEffect(() => {
    // Register event handler
    $(`div.${styles.background}#${props.id}`).on("click", function () {
      $(`div.${styles.background}#${props.id}`)
        .parent()
        .animate(
          {
            opacity: 0,
          },
          200,
          function () {
            props.setIsOpen(false)
          }
        )
    })

    // Cleanup event handlers
    return () => {
      // clean up the event handler when the component unmounts
      $(`div.${styles.background}#${props.id}`).off("click")
    }
  })

  function loadInfo(isProfile) {
    if (!isProfile) return
    if (!firebase) return

    // this check is only necessary because of the useEffect glitch
    if (isLoggedIn()) {
      var db = firebase.firestore()
      var docRef = db.collection("users").doc(uid)

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("User info has successfully been read")
            props.setUserStatus({status: doc.data().app_status, badges: doc.data().badges})
            props.setHasLoaded(true)
          } else {
            console.log("No such document exists")
          }
        })
        .catch(function (error) {
          console.log(`Error getting document: ${error}`)
        })
    }
  }

  return props.isOpen ? (
    <div className={styles.modal}>
      {!props.hasLoaded && loadInfo(props.isProfile)}
      <div id={props.id} className={styles.background}></div>
      <div className={styles.container}>{props.children}</div>
    </div>
  ) : null
}

export default Modal
