import React from "react"
import { navigate } from '@reach/router';
import ProfileView from "../components/profile_view"
import { useState } from "react"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser, isLoggedIn } from "../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase"

const Login = ( props ) => {
  const [firebase, setFirebase] = useState();

  useFirebase(firebase => {
    setFirebase(firebase);
  }, [])

//   if (isLoggedIn()) {
//     navigate(`/app/profile`)
//   }

  function initializeUserDocument(email, uid) {
    var db = firebase.db();
    // doc id should really be uid, haven't made writing a thing yet 
    var statusRef = db.collection("users");

    statusRef.doc(uid).set({
      userEmail: email, status: "Not Applied" });
  }

  function getUiConfig(auth) {
    return {
      signInFlow: 'popup',
      signInOptions: [
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.GoogleAuthProvider.PROVIDER_ID,
        auth.FacebookAuthProvider.PROVIDER_ID,
        auth.GithubAuthProvider.PROVIDER_ID
      ],
      // signInSuccessUrl: '/app/profile',
      callbacks: {
        signInSuccessWithAuthResult: (result) => {
          setUser(result.user);
          props.setIsOpen(false);
          initializeUserDocument(result.user.email, result.user.uid);
        }
      }
    };
  }

  return (
    <ProfileView title="Log In">
      <p>Please sign-in to access to the private route:</p>
      {firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()} />}
    </ProfileView>
  );

}

export default Login