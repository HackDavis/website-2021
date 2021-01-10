import React, { useState, useEffect } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import styles from "./css/schedule_element.module.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';

const ScheduleElement = (props) => {



    return (
        props.loaded ?
            <div className={`container-fluid p-0 ${styles.line}`}>
                <div className={`row no-gutters align-items-top ${styles.bigrow}`}>
                    <div className={`col col-md-3`}>
                        <div className={styles.event_time}>
                            {props.time}
                        </div>
                    </div>

                    {[0, 1, 2].map((index) => 
                    {
                        return <div className={`col col-md-3`}>
                            {
                                props.data[index] && 
                                <a className={styles.event} target={props.data[index].link ? "_blank" : ""} href={props.data[index].link || "javascript:void(0)"} onClick={() => props.data[index].link ? null : scrollTo(`#section_livestream`)}>
                                    <div className={`row ${styles.event_title} ${styles[`type_${props.data[index].type}`]}`}>{props.data[index].title}</div>
                                    {
                                        props.data[index].description && 
                                            <div className={`row ${styles.event_description}`}>{props.data[index].description}</div>
                                    }
                                </a>
                            }
                        </div>
                    })}
                </div>
            </div>
        : <div className={styles.badge}><Skeleton width={50} height={50} circle={true}/></div>
    )
};

export default ScheduleElement