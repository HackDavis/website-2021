import React from "react"
import { navigate } from '@reach/router';
import ProfileView from "../components/profile_view"
import { useState} from "react"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser, isLoggedIn } from "../utils/auth"
import { useFirebase } from "gatsby-plugin-firebase"

const Login = ( {setIsOpen} ) => {
  const [firebase, setFirebase] = useState();

  useFirebase(firebase => {
    setFirebase(firebase);
  }, [])

  // if (isLoggedIn()) { }

  function getUiConfig(auth) {
    return {
      signInFlow: 'redirect',
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
          setIsOpen(false);
        }
      }
    };
  }

  return (
    <div>
      <h1>Login</h1>
      {firebase && <StyledFirebaseAuth uiConfig={getUiConfig(firebase.auth)} firebaseAuth={firebase.auth()}/>}
    </div>
  );

}

export default Login