import React, { useState, useEffect } from 'react';
import styles from "../css/cow.module.css"
import $ from "jquery";


const Cow = (props) => {

    return (
        <div className={styles.cow_container} style={props.cow.time == undefined ? 
                                                    {top: `${props.cow.pos.y * 100}%`, left: `${props.cow.pos.x * 100}%`} : 
                                                    {top: `${props.cow.pos.y * 100}%`, left: `${props.cow.pos.x * 100}%`, transition: `${props.cow.time}s linear all`}}>
            <img className={`${styles.cow_image} ${props.cow.time && styles.cow_hop_fast}`} src={props.image_src}></img>
            {/* {props.cow.name} */}
        </div>
    )
};

export default Cow