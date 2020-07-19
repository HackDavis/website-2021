import React, { useState, useEffect } from 'react';
import styles from "./css/modal.module.css"
import $ from "jquery";


const Modal = ( props ) => { 
    
    useEffect(() => 
    {
        // Register event handler
        $(`div.${styles.background}#${props.id}`).on("click", function()
        {
            props.setIsOpen(false);
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(`div.${styles.background}#${props.id}`).off("click");
        };
    })

    return (
        props.isOpen ? (
        <div className={styles.modal}>
            <div id={props.id} className={styles.background}></div>
            <div className={styles.container}>
                {props.children}  
            </div>
        </div>
        ) : null
    )
};

export default Modal