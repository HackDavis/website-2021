import React from 'react';
import styles from "./css/badge.module.css"
import Skeleton from 'react-loading-skeleton';


const Badge = (props) => {

    return (
        props.hasLoaded ?
            <div alt={props.date} className={`${styles.badge} ${!props.active && styles.inactive}`}>
                <img src={props.image}></img>
            </div>
        : <div className={styles.badge}><Skeleton width={50} height={50} circle={true}/></div>
    )
};

export default Badge