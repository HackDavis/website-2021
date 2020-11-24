import React, { useState, useEffect } from 'react';
import styles from "./css/badge_page.module.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Badge from './badge';
import BigBadge from './big_badge'
import steal from "./css/modal_profile.module.css"

const BadgePage = (props) => {

    return (
        <div className={steal.modal}>
            <div className={styles.badgePage}>
              <a
              className={styles.badge_button}
              href="/"
              onClick={event => {
                  event.preventDefault()
                  props.setBadgesOpen(false);
              }}
              >
              <div className={styles.badge_icon}>
                <svg width="0.6em" height="0.6em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </div>
              </a>
              {props.data.allFile.edges.map((file, index) => {
                return file.node.dir.endsWith("badges") &&
                <BigBadge data={props.data} hasLoaded={props.hasLoaded} date={props.GetBadgeDate(file.node.name)} active={props.HasBadge(file.node.name)} image={file.node.publicURL} key={index}></BigBadge>;
              })}
            </div>
        </div>
    )
}

export default BadgePage
