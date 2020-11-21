import React, { useEffect } from "react"
import Modal from "./modal"
import styles from "./css/modal_login.module.css"
import Login from "./login.jsx"

const LoginModal = props => {
  return (
    <Modal {...props} isProfile={false} id="loginmodal">
      <div className={styles.modal}>
        <Login {...props}></Login>
      </div>
    </Modal>
  )
}

export default LoginModal
