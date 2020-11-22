import React, { useState, useEffect } from 'react';
import styles from "./css/badge_page.module.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Badge from './badge';
import steal from "./css/modal_profile.module.css"

const BadgePage = (props) => {

    return (
        <div className={steal.modal}>
            <div className={styles.badgePage}>
              {props.data.allFile.edges.map((file, index) => {
                return file.node.dir.endsWith("badges") &&
                <Badge hasLoaded={props.hasLoaded} date={props.GetBadgeDate(file.node.name)} active={props.HasBadge(file.node.name)} image={file.node.publicURL} key={index}></Badge>;
              })}
            </div>
        </div>
    )
}

export default BadgePage
