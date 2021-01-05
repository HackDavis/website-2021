import React from "react"
import { useState } from "react"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser } from "../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase"
import styles from "./css/login.module.css"

const Login = (props) => {
    const [firebase, setFirebase] = useState();

    useFirebase(firebase => {
        setFirebase(firebase);
    }, [])

    function initializeUserDoc(user_email, uid) {
        var db = firebase.firestore()
        db.collection("users").doc(uid).get().then(function (doc) {
          if (doc.exists) {
            // console.log("document already exists");
          } else {
            // User does not exist so add them
            // console.log("writing to new doc")
            var docRef = db.collection("users").doc(uid).set({
                email: user_email,
                user_id: uid,
                app_status: "Not Yet Applied",
                badges: {},
                group_id: "",
                pending_groups: [],
                staff: user_email.substr(user_email.lastIndexOf("@") + 1) == "hackdavis.io",
                wants_refresh: true,
            }, { merge: true })
                .then(function () {
                    // console.log("Document successfully written!")
                })
                .catch(function (error) {
                    // console.error("Error writing document: ", error)
                })
          }
        })
        .catch(function (error) {
        })
    }

    function getUiConfig(auth) {
        return {
            signInFlow: 'popup',
            signInOptions: [
                auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
                signInSuccessWithAuthResult: (result) => {
                    setUser(result.user);
                    initializeUserDoc(result.user.email, result.user.uid);
                    props.setIsOpen(false);
                }
            }
        };
    }

    return (
        <div className={styles.Login}>
            {firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()} />}
        </div>
    );
}

export default Login