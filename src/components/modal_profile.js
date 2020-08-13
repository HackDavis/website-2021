import React, { useEffect } from 'react';
import Modal from "./modal"
import styles from "./css/modal_profile.module.css"
import { getUser } from "../utils/auth"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// User's interest, technologies, application status, teams, 

const ProfileModal = ( props ) => {
    const user = getUser();
    const { displayName, email } = user;

    return(
        <Modal {...props} id="profilemodal">
            <div className={styles.modal}>
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        <div class="col col-xs-12">
                            <div class={`${styles.title} ${styles.red}`}>Hello, {displayName}!</div>
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col col-xs-6">
                            <div className={styles.applicationcontainer}>Application Container</div>
                            <div className={styles.teamfindercontainer}>Team Finder Container</div>
                         </div>
                         <div class="col col-xs-6">
                            <div className={styles.badgescontainer}>Badges Container</div>
                         </div>
                    </div>
                </div>
            </div>
        </Modal>
    ); 
}

export default ProfileModal