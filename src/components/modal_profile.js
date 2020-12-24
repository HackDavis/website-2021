import React, { useEffect, useState } from "react"
import Modal from "./modal"
import Badge from "./badge"
import styles from "./css/modal_profile.module.css"
import styles_modal from "./css/modal.module.css"
import { logout, getUser } from "../utils/auth"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useFirebase } from "gatsby-plugin-firebase"
import { useStaticQuery, graphql } from "gatsby"
import Skeleton from 'react-loading-skeleton';
import TeamFinder from "./teamfinder/team_finder"
import notification_styles from "./css/notification.module.css"
import $ from "jquery";
import BadgePage from "./badge_page"

const application_status_colors =
{
    "Not Yet Applied": "#C0C0C0",
    "Pending Review": "#FFC75A",
    "Application Accepted": "#B6CF69",
    "Application Denied": "#C0C0C0",
    "Waitlisted": "#FFC75A",
    "Yes": "#B6CF69",
    "No": "#EF8F71",
}

const ProfileModal = props => {
    const [firebase, setFirebase] = useState()
    const [userStatus, setUserStatus] = useState({ status: "Loading", badges: [], group_id: "", pending_groups: [] })
    const [groups, setGroups] = useState({})
    const [hasLoaded, setHasLoaded] = useState()
    const [isInTeam, setIsInTeam] = useState()
    const [notificationState, setNotificationState] = useState({ active: false })
    const [badgesOpen, setBadgesOpen] = useState(false); // True if badges page is open
    const [RSVPVisibility, setRSVPVisibility] = useState(false);
    const [showOthers, setShowOthers] = useState(true);
    const [teamFinderHeight, setTeamFinderHeight] = useState("calc(40% - 70px)");

    useEffect(()=>{
        // scroll to the top of the container by default
        const content = document.getElementById('content');
        if (content != null)
        {
            content.scrollTo(0,0);
        }
    })
    // Displays a notification on success/failure
    function DisplayNotification(text, bg_color, time_to_display) {
        // Show notification
        time_to_display = time_to_display || 3000;
        setNotificationState({
            active: true,
            bg_color: bg_color,
            text: text,
            opacity: 1
        })

        setTimeout(() => {
            // Hide notification
            $(`div.${notification_styles.main_container}`)
                .animate(
                    {
                        opacity: 0,
                    },
                    200,
                    function () {
                        setNotificationState({ active: false })
                    }
                )
        }, time_to_display);
    }

    useFirebase(fb => {
        setFirebase(fb)
    }, [])

    function RSVPResponse(response) {
        let db = userStatus.db
        let userChoice = response ? "Yes" : "No"
        // console.log(response);

        let new_badges;
        new_badges = JSON.parse(JSON.stringify(userStatus.badges))
        new_badges["RSVP"] = new Date(Date.now()).toDateString();

        db.collection("users").doc(userStatus.uid).set({
            RSVP: userChoice,
            badges: new_badges
        }, { merge: true })
        .then(function() {
            setRSVPVisibility(false);
        });
    }

    function changeTeamFinderSize() {
        if (showOthers) {
            setShowOthers(false);
            setTeamFinderHeight("calc(100% - 70px)");
        } else {
            setShowOthers(true);
            setTeamFinderHeight("calc(40% - 70px)");
        }
    }

    function HasBadge(badge_id) {
        return userStatus.badges && badge_id in userStatus.badges;
    }

    function GetBadgeDate(badge_id) {
        return userStatus.badges && userStatus.badges[badge_id]
    }

    function ExitModal() {
        $(`div.${styles_modal.container}`)
            .animate(
                {
                    right: "-100%",
                },
                500,
                function () {
                    props.setIsOpen(false)
                }
            )
    }

    const data = useStaticQuery(graphql`
  {
    allFile(filter: { extension: { eq: "png"} }, sort: {fields:[name] order: ASC}) {
      edges {
        node {
          publicURL
          name
          dir
        }
      }
    }
  }
  `)


    function GetImageMap() {
        const image_data = {}

        for (let i = 0; i < data.allFile.edges.length; i++) {
            const image_node = data.allFile.edges[i].node;
            image_data[image_node.name] = image_node.publicURL;
        }

        return image_data;
    }

    const images = GetImageMap();
    console.log(showOthers);

    return (
        <Modal
            {...props}
            isProfile={true}
            setUserStatus={setUserStatus}
            groups={groups}
            setGroups={setGroups}
            hasLoaded={hasLoaded}
            setHasLoaded={setHasLoaded}
            setIsInTeam={setIsInTeam}
            setRSVPVisibility={setRSVPVisibility}
            isInTeam={isInTeam}
            id="profilemodal"
            DisplayNotification={DisplayNotification}
            notificationState={notificationState}
        >
            {badgesOpen ?
                <BadgePage {...props} data={data} hasLoaded={hasLoaded} GetBadgeDate={GetBadgeDate} HasBadge={HasBadge} setBadgesOpen={setBadgesOpen}></BadgePage>
                : <div className={styles.modal}>
                    <div className={styles.top_section}>
                        <a
                            className={styles.logout}
                            href="/"
                            onClick={event => {
                                event.preventDefault()
                                window.location.reload(true)
                                logout(firebase).then(() => props.setIsOpen(false))
                            }}
                        >
                                <div className={styles.signout_container}>
                                    <img className={styles.signout_button} src={images["signout"]}></img>
                                    <div style={{ display: "inline-block" }}>Sign Out</div>
                                </div>
                        </a>
                        <div className={styles.x_button} onClick={ExitModal}> X</div>
                    </div>
                    <hr></hr>
                    <div className={`${styles.relative}`}>
                        {showOthers && <div className={styles.applicationcontainer}>
                            <div className={styles.modalsectiontitle} style={{marginBottom: "0px"}}>{getUser().displayName}</div>
                            {hasLoaded && isInTeam && groups[userStatus.group_id] ? <div style={{fontWeight: "bold", marginBottom: "6px"}}>{groups[userStatus.group_id].name}</div> : <div />}
                            <div className={styles.modalsectioncontent} style={{ marginTop: "6px", overflow: "visible" }}>
                                {
                                    hasLoaded ? 
                                    (userStatus.status == "Not Yet Applied" ? 
                                        <div>
                                            Not Yet Applied
                                            <button className={styles.app_status_apply} onClick={() => window.open('https://hackdavis.typeform.com/to/t4ghuDHw')}>APPLY</button>
                                        </div> : 
                                        <div>
                                            Application Status
                                            <div className={styles.app_status} style={{backgroundColor: application_status_colors[userStatus.status]}}>{userStatus.status}</div>
                                            {userStatus.status == "Pending Review" ? <div style={{marginTop: "6px"}}>Accepted but your status is not updated? Please wait up to 24 hours for it to update.</div> : <div />}
                                            {
                                                RSVPVisibility ? 
                                                <div>
                                                    Please RSVP
                                                    <button className={styles.RSVP_button} onClick={() => RSVPResponse(true)} style={{backgroundColor: application_status_colors["Yes"]}}>Yes</button>
                                                    <button className={styles.RSVP_button} onClick={() => RSVPResponse(false)} style={{backgroundColor: application_status_colors["No"]}}>No</button>
                                                </div> 
                                                : <></>
                                            }
                                        </div>) :
                                    <Skeleton />
                                }
                            </div>
                        </div> }
                        {showOthers && <hr></hr>}

                        {showOthers && <div className={styles.badgescontainer}>
                            <a
                                className={styles.badge_button}
                                href="/"
                                onClick={event => {
                                    if (!hasLoaded) {return;}
                                    event.preventDefault()
                                    setBadgesOpen(true);
                                }}
                            >
                                <div className={styles.modalsectiontitle}>
                                    Badges
                                        <div className={styles.badge_icon}>
                                        <svg width="0.6em" height="0.6em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            <div className={styles.modalsectioncontent}>
                                {data.allFile.edges.map((file, index) => {
                                    return file.node.dir.endsWith("badges") &&
                                        <Badge hasLoaded={hasLoaded} date={GetBadgeDate(file.node.name)} active={HasBadge(file.node.name)} image={file.node.publicURL} key={index}></Badge>;
                                })}
                            </div>
                        </div> }
                        {showOthers && <hr></hr>}
                        <div className={styles.teamfindercontainer} style={{height: teamFinderHeight}}>
                            <div className={styles.team_finder} onClick={changeTeamFinderSize}>
                                Team Finder
                                <div className={styles.expand_button} onClick={changeTeamFinderSize}>
                                {!showOthers ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                        <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                                    </svg>}
                                </div>
                            </div>
                            <div className={styles.modalsectioncontent} id="content">
                                <TeamFinder
                                    {...props}
                                    setIsInTeam={setIsInTeam}
                                    isInTeam={isInTeam}
                                    hasLoaded={hasLoaded}
                                    groups={groups}
                                    setGroups={setGroups}
                                    userStatus={userStatus}
                                    setUserStatus={setUserStatus}
                                    DisplayNotification={DisplayNotification}></TeamFinder>
                            </div>
                        </div>
                    </div>
                </div>}
        </Modal>
    )
}

export default ProfileModal
