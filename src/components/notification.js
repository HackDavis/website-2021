import React, { useState, useEffect } from 'react';
import styles from "./css/notification.module.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Notification = (props) =>{

    return(
        <div className={styles.main_container} style={{"backgroundColor": props.notificationState.bg_color, "opacity": props.notificationState.opacity}}>
            <div className={styles.text_container}>{props.notificationState.text}</div>
        </div>
    )
}

export default Notification



