import React, { useState, useEffect } from 'react';
import styles from "../css/cow.module.css"
import $ from "jquery";


const Cow = (props) => {

    return (
        <div className={styles.cow_container} style={{top: `${props.cow.pos.y * 100}%`, left: `${props.cow.pos.x * 100}%`}}>
            <img className={styles.cow_image} src={props.image_src}></img>
            {/* {props.cow.name} */}
        </div>
    )
};

export default Cow