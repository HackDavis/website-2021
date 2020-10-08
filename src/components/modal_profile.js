import React, { useEffect, useState } from 'react';
import Modal from "./modal"
import Badge from "./badge"
import styles from "./css/modal_profile.module.css"
import { getUser, logout } from "../utils/auth"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useFirebase } from "gatsby-plugin-firebase"

// User's interest, technologies, application status, teams, 

const ProfileModal = (props) => {
    const user = getUser();
    const { uid, displayName, email } = user;
    const [firebase, setFirebase] = useState();

    useFirebase(fb => {
        setFirebase(fb);
    }, [])

    function getStatus() {
        return "Pending";
        // var db = firebase.db();
        // console.log(`DATABASE ID: ${db}`);
        // doc id should really be uid, haven't made writing a thing yet 
        // var statusRef = db.collection("users").doc("LY7m53TxjzVcCz8uolGQmYNyVsW2");

        // statusRef.get().then(function(doc) {
        //     if (doc.exists) {
        //         console.log(`USER STATUS:: ${doc.data()}`);
        //     } else {
        //         console.log("ERROR: COULD NOT FIND THE USER DOCUMENT CONTAINING THEIR STATUS");
        //     }
        // }).catch(function(error) {
        //     console.log(`Error getting document: ${error}`);
        // });
    }

    return (
        <Modal {...props} id="profilemodal">
            <div className={styles.modal}>
                <div class="container-fluid p-0">
                    <div class="row no-gutters">
                        <div class="col col-xs-12">
                            <a href="/" onClick={event => { event.preventDefault(); logout(firebase).then(() => props.setIsOpen(false)) }}>
                                <u>Log Out</u>
                            </a>
                        </div>
                    </div>
                    <div class="col col-xs-12">
                        <div className={styles.applicationcontainer}>
                            <div className ={styles.modalsectiontitle}>Application Status</div>
                            <div className={styles.modalsectioncontent}>{getStatus()}</div>
                        </div>
                        <hr></hr>
                        <div className={styles.teamfindercontainer}>
                            <div className={styles.modalsectiontitle}>External Team Finder</div>
                            <div className={styles.modalsectioncontent}>Find your team here</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="col col-xs-12">
                        <div className={styles.modalsectiontitle}>Badges</div>
                        <div className={styles.modalsectioncontent}>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={false}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={false}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={false}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={false}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={false}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={false}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                            <Badge active={true}></Badge>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
}

export default ProfileModal