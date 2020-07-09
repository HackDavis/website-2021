import React, { useState } from 'react';
import Modal from "./modal"
import styles from "./css/modal_login.module.css"
import { isModalOpen, setIsModalOpen } from "./modal_state"

const LoginModal = () => {
    setIsModalOpen()
        return(
            <Modal>
                <h1>Login</h1>
            </Modal>
    );
}

export default LoginModal