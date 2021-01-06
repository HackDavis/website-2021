import React, { useState, useEffect } from 'react';
import styles from "./css/schedule_element.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';

const ScheduleElement = (props) => {

    return (
        props.loaded ?
            <div className="container-fluid p-0">
                <div className={`row no-gutters align-items-center ${styles.background}`}>
                    <div className={`scheduleContainer`}>
                        <div className={`col col-md-3`}>
                            <div className={styles.timeText}>
                                {props.time}
                            </div>
                        </div>
                        {/* <div className={`row`}></div>
                            {props.data[index].type}
                            {props.data[index].title}
                            {props.data[index].description}
                            {props.data[index].link}
                        </div> */}
                        {[0, 1, 2].map((index) => 
                        {
                            return <div className={`col col-md-3`}>
                                {
                                    props.data[index] && 
                                    <div className={styles.timeText}>
                                        <div className={`row`}>{props.data[index].title}</div>
                                        {
                                            props.data[index].description && 
                                                <div className={`row`}>{props.data[index].description}</div>
                                        }
                                    </div>
                                }
                            </div>
                        })}
                    </div>
                </div>
            </div>
        : <div className={styles.badge}><Skeleton width={50} height={50} circle={true}/></div>
    )
};

export default ScheduleElement