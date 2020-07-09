import React, { useState } from 'react';
import styles from "./css/modal.module.css"
import { isModalOpen, setIsModalOpen } from "./modal_state"


const Modal = ( {children}) => {
    return(
        isModalOpen && (
        <div className={styles.modal}>
            <div className={styles.background}>
                <div className={styles.container}>
                    {children}
                    <h1>This is working</h1>
                </div>
            </div>
        </div>
        )
    );
};

export default Modal