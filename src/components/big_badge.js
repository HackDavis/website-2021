import React, { useState, useEffect } from 'react';
import styles from "./css/big_badge.module.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';


const BigBadge = (props) => {

    return (
        props.hasLoaded ?
            <div alt={props.date} className={`${styles.badge} ${!props.active && styles.inactive}`}>
                <img src={props.image}></img>
            </div>
        : <div className={styles.badge}><Skeleton width={50} height={50} circle={true}/></div>
    )
};

export default BigBadge