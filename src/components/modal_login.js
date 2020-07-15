import React, { useState } from 'react';
import Modal from "./modal"
import styles from "./css/modal_login.module.css"
import Footer from './footer';

const LoginModal = ( {isOpen, setIsOpen} ) => {
    return(
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1>Login</h1>
        </Modal>
    );
}

export default LoginModal