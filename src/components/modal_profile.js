import React, { useEffect, useState } from 'react';
import Modal from "./modal"
import styles from "./css/modal_profile.module.css"
import { getUser, logout } from "../utils/auth"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useFirebase } from "gatsby-plugin-firebase"

// User's interest, technologies, application status, teams, 

const ProfileModal = (props) => {
    const user = getUser();
    const { displayName, email } = user;
    const [firebase, setFirebase] = useState();

    useFirebase(fb => {
        setFirebase(fb);
    }, [])

    return (
        <Modal {...props} id="profilemodal">
            <div className={styles.modal}>
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        <div class="col col-xs-12">
                            <div class={`${styles.title} ${styles.red}`}>Hello, {displayName}!</div>
                            <a href="/" onClick={event => { event.preventDefault(); logout(firebase).then(() => props.setIsOpen(false)) }}>
                                <u>Log Out</u>
                            </a>
                        </div>
                    </div>
                    <div class="col col-xs-12">
                        <div className={styles.applicationcontainer}>Application Container</div>
                        <div className={styles.teamfindercontainer}>Team Finder Container</div>
                    </div>
                    <div class="col col-xs-12">
                        <div className={styles.badgescontainer}>Badges Container</div>
                    </div>
                </div>
            </div>
        </Modal >
    );
}

export default ProfileModal