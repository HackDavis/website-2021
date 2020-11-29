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
            <div className={styles.titleContainer}>
              <a
              className={`${styles.badge_button} ${styles.title_container_real}`}
              href="/"
              onClick={event => {
                  event.preventDefault()
                  props.setBadgesOpen(false);
              }}
              >
              <div className={`${styles.titleText}`}>
                Badges
                <div className={styles.badge_icon}>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              </div>
              <hr></hr>
              </a>
              <div className={styles.cardContainer}>
                {props.data.allFile.edges.map((file, index) => {
                  return file.node.dir.endsWith("badges") &&
                  <BigBadge badgeIndex={index} data={props.data} hasLoaded={props.hasLoaded} date={props.GetBadgeDate(file.node.name)} active={props.HasBadge(file.node.name)} image={file.node.publicURL} key={index}></BigBadge>;
                })}
              </div>
            </div>
          </div>
      </div>
    )
}

export default BadgePage
