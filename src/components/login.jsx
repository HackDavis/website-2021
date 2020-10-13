import React from "react"
import { useState } from "react"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser } from "../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase"
import styles from "./css/login.module.css"

const Login = ( props ) => {
  const [firebase, setFirebase] = useState();

  useFirebase(firebase => {
    setFirebase(firebase);
  }, [])

  function initializeUserDoc(user_email, uid) {
    var db = firebase.firestore()
    console.log(db)
    var docRef = db.collection("users").doc(uid).set({
      email: user_email,
      user_id: uid,
      app_status: "Not Yet Applied",
      badges: [],
    })
    .then(function() {
      console.log("Document successfully written!")
    })
    .catch(function(error) {
      console.error("Error writing document: ", error)
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
      <p>Please sign-in to access to the private route:</p>
      {firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()} />}
    </div>
  );

}

export default Login