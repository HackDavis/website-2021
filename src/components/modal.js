import React, { useState, useEffect } from "react"
import styles from "./css/modal.module.css"
import $ from "jquery"
import { getUser, isLoggedIn } from "../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase" // need to use firebase
import Notification from "./notification"

const Modal = props => {
    const user = getUser()
    const { uid } = user

    // need next 4 lines to use firebase
    const [firebase, setFirebase] = useState()

    useFirebase(fb => {
        setFirebase(fb)
    }, [])

    useEffect(() => {
        // Register event handler
        $(`div.${styles.background}#${props.id}`).on("click", function () {
            $(`div.${styles.container}`)
                .animate(
                    {
                        right: "-100%",
                    },
                    500,
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
        if (!firebase) return // if API key doesn't exist

        // this check is only necessary because of the useEffect glitch
        if (isLoggedIn()) {
            var db = firebase.firestore() // returns the address of our db 
            var docRef = db.collection("users").doc(uid) // creates a reference to the specified doc
            props.setHasLoaded(true)

            // user info call
            docRef
                .onSnapshot(function (doc) {
                    if (doc.exists) {
                        // console.log("User info has successfully been read")
                        props.setUserStatus({
                            status: doc.data().app_status,
                            badges: doc.data().badges,
                            group_id: doc.data().group_id,
                            pending_groups: doc.data().pending_groups,
                            staff: doc.data().staff,
                            wants_refresh: doc.data().wants_refresh,
                            db: db
                        }) // extracts the specific fields from the document 
                        if (doc.data().group_id.length > 0)
                            props.setIsInTeam(true)
                        else
                            props.setIsInTeam(false)
                    } else {
                        props.DisplayNotification("Failed to load user info!", "#c12c24", 10000)
                        // console.log("No such document exists")
                    }
                })

            // // Regular, no snapshot call 
            // db.collection("groups").get().then(function(querySnapshot) {
            //     querySnapshot.forEach(function(doc) {
            //         console.log(doc.data())
            //         if (dataIsValid(doc.data()))
            //             groups[doc.id] = doc.data();
            //     })
            //     props.setGroups(groups);
            // })

            // Regular snapshot call that SHOULD automatically update local states on db updates (but does not)
            docRef = db.collection("groups")
            docRef.onSnapshot(function (querySnapshot) {
                let temp_groups = {}
                querySnapshot.forEach(function (doc) {
                    if (dataIsValid(doc.data()))
                    {
                        temp_groups[doc.id] = doc.data();
                    }
                });
                props.setGroups(JSON.parse(JSON.stringify(temp_groups)));
                // props.setHasLoaded(true) // does not cause the setstate update error in the console 
            });

            // // Odd snapshot call that does not automatically update local states on db updates 
            // docRef = db.collection("groups")
            // let groups = {}
            // docRef.onSnapshot(function(snapshot) {
            //     snapshot.docChanges().forEach(function(change) {
            //         if (change.type == "added" || change.type == "modified") {
            //             groups[change.doc.id] = change.doc.data();
            //             props.setGroups(groups);
            //         }
            //         else {
            //             console.log("Group was deleted")
            //         }
            //     })
            // })
        }
    }

    function dataIsValid(data) {
        try {
            return (data.description.length > 0) &&
                (data.email.length > 0) &&
                (Object.keys(data.members).length > 0) &&
                (data.max_members.length > 0) &&
                (data.name.length > 0) &&
                (data.tags.length > 0);
        } catch (err) {
            return false;
        }
    }

    return props.isOpen ? (
        <div className={styles.modal}>
            {!props.hasLoaded && loadInfo(props.isProfile)}
            <div className={styles.background} id={props.id}></div>
            <div id={`modal_container_${props.id}`} className={styles.container} >
                {props.notificationState && props.notificationState.active && <Notification {...props}></Notification>}
                <div className={styles.container_padding}>
                    {props.children}
                </div>
            </div>
        </div>
    ) : null
}

export default Modal
