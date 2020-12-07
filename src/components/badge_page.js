import React, { useState, useEffect } from 'react';
import styles from "./css/badge_page.module.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Badge from './badge';
import BigBadge from './big_badge'
import steal from "./css/modal_profile.module.css"

const badge_info = 
{
  "0": {name: `You've Applied! (2021)`, description: `You submitted your application to HackDavis 2021!`},
  "1": {name: `Attended a Pre-Event Workshop (2021)`, description: `You attended one of our Fall 2020 pre-event workshops!`},
  "2": {name: `RSVP to HackDavis (2021)`, description: `You’ve been accepted to HackDavis and have confirmed your spot!`},
  "3": {name: `Yummy (2021)`, description: `You got a meal code from HackDavis for DoorDash and used it to get some food!`},
  "4": {name: `Submitted! (2021)`, description: `You submitted your project! Awesome job!`},
  "5": {name: `Looking for Team (2021)`, description: `You checked out five different teams in the HackDavis team finder!`},
  "6": {name: `Teaming Up! (2021)`, description: `You joined or created a team on the HackDavis team finder!`},
  "7": {name: `Mentored (2021)`, description: `You got help and worked with your mentor!`},
  "8": {name: `Attended a Workshop (2021)`, description: `You attended a workshop at HackDavis!`},
}

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
                  <BigBadge badgeIndex={index} data={props.data} info={badge_info[file.node.name]} hasLoaded={props.hasLoaded} date={props.GetBadgeDate(file.node.name)} active={props.HasBadge(file.node.name)} image={file.node.publicURL} key={index}></BigBadge>;
                })}
              </div>
            </div>
          </div>
      </div>
    )
}

export default BadgePage
