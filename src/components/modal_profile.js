import React, { useEffect } from 'react';
import Modal from "./modal"
import styles from "./css/modal_profile.module.css"


// User's interest, technologies, application status, teams, 

const ProfileModal = ( props ) => {
    
    return(
        <Modal {...props} id="profilemodal">
            <div className={styles.modal}>
                <h1>Profile</h1>
            </div>
        </Modal>
            
    ); 
}

export default ProfileModal