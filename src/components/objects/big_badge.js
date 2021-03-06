import React, { useState, useEffect } from 'react';
import styles from "../css/big_badge.module.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Skeleton from 'react-loading-skeleton';

const background_gradients = 
[
    "linear-gradient(115.18deg, #95CE7A 0%, #75D790 100%)",
    "linear-gradient(115.18deg, #7ACEC9 0%, #75B4D7 100%)",
    "linear-gradient(115.18deg, #EFD475 0%, #FFB168 100%)",
    "linear-gradient(115.18deg, #867ACE 0%, #B775D7 100%)"
]

const BigBadge = (props) => {

    function GetBackgroundColor()
    {
        return background_gradients[props.active ? props.badgeIndex % background_gradients.length : 1]
    }

    return (
        props.hasLoaded ?
            <div className="container-fluid p-0">
                <div className={`row no-gutters align-items-center ${styles.background}`}>
                    <div alt={props.date} className={`${styles.card} ${!props.active && styles.inactive}`} style={{background: GetBackgroundColor()}}>
                        <div className={`row no-gutters ${styles.spacing}`}>
                            <div className={`col-8`}>
                                <div className={`row no-gutters`}>
                                    <div className={`${styles.badgeName}`}>{props.info ? props.info.name : "Badge Name"}</div>
                                </div>
                                <div className={`row no-gutters`}>
                                    <div className={`${styles.badgeDesc}`}>{props.info ? props.info.description : "This is currently a temporary description for your badge."}</div>
                                </div>
                            </div>
                            <div className={`col-4`}>
                                <div className={`${styles.image_crop} ${!props.active && styles.inactive}`}>           
                                    <img className={styles.bigBadge} src={props.image}></img>    
                                </div>                   
                            </div>
                        </div>
                        <div className={`row no-gutters ${styles.spacing}`}>
                            <div className={`row no-gutters`}>         
                                <div className={`${styles.badgeDate}`}>{props.active ? "Earned: " + props.date : "Not yet earned"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : <div className={styles.badge}><Skeleton width={50} height={50} circle={true}/></div>
    )
};

export default BigBadge