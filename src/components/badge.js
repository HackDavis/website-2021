import React, { useState, useEffect } from 'react';
import styles from "./css/badge.module.css"
import $ from "jquery";


const Badge = (props) => {

    return (
        <div className={`${styles.badge} ${!props.active && styles.inactive}`}>
            {/* <img src={props.image}></img> */}
            <img src="https://controllergear.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/c/o/controller-gear-pokemon-phone-tech-badge-pikachu-face_1.jpg"></img>
        </div>
    )
};

export default Badge