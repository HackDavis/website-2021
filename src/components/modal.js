import React, { useState, useEffect } from 'react';
import styles from "./css/modal.module.css"
import $ from "jquery";


const Modal = ( {isOpen, setIsOpen, children} ) => { 
    
    useEffect(() => 
    {
        // Register event handler
        $(`div.${styles.background}`).on("click", function()
        {
            setIsOpen(false);
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(`div.${styles.background}`).off("click");
        };
    })

    return (
        isOpen && (
        <div className={styles.modal}>
            <div className={styles.background}></div>
            <div className={styles.container}>
                {children}  
                <h1>This is working</h1>
            </div>
        </div>
        )
    )
};

export default Modal