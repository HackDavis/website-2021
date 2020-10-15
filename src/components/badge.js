import React, { useState, useEffect } from 'react';
import styles from "./css/badge.module.css"
import $ from "jquery";


const Badge = (props) => {

    return (
        <div className={`${styles.badge} ${!props.active && styles.inactive}`}>
            <img src={props.image}></img>
        </div>
    )
};

export default Badge