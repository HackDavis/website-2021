import React, { useState, useEffect } from 'react';
import styles from "./css/big_badge.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';


const BigBadge = (props) => {

    return (
        props.hasLoaded ?
            <div className="container-fluid p-0">
                <div className={`row no-gutters align-items-center ${styles.background}`}>
                    <div alt={props.date} className={`${styles.card} ${!props.active && styles.inactive}`}>
                        <div className={`col-10 offset-1 col-md-4 offset-md-1 order-2 order-md-1 ${styles.description} ${props.fadeSocialGood && styles.slideinleft}`}>
                            <div>{props.date}</div>
                        </div>
                        <div className={`${styles.card} col-10 offset-1 col-md-5 offset-md-1 order-1 order-md-2`}>
                            <img className={styles.banana} src={props.image}></img>
                        </div>
                    </div>
                </div>
            </div>
        : <div className={styles.badge}><Skeleton width={50} height={50} circle={true}/></div>
    )
};

export default BigBadge