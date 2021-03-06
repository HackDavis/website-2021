import React, { useState, useEffect } from 'react';
import styles from "../css/team_finder.module.css"
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CreateATeam from "./create_a_team";
import JoinATeam from "./join_a_team"
import MyTeam from "./my_team"
import TeamDisplay from "./team_display"
import Filters from './filters';
import tag_list from "./team_tags_list.js"
import { getUser } from "../../utils/auth"
import { useStaticQuery, graphql } from 'gatsby'
import styles_teamcount from "../css/total_teams_section.module.css"

const TeamFinder = (props) => {
    const user = getUser()
    const { uid } = user

    const [findTeamTabSelected, setFindTeamTabSelected] = useState(true) // If the first tab is selected (Join a Team)
    const [selectedTeamId, setSelectedTeamId] = useState(0) // If a team is selected in the Join a Team tab and is displaying the detailed info
    const [filtersOpen, setfiltersOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState(tag_list);
    const [tagState, setTagState] = useState("Any")
    const [tagRoomState, setTagRoomState] = useState('')
    const [availableRooms, setAvailableRooms] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false);


    useEffect(() => {

        // scroll to the top of the container by default
        const content = document.getElementById('content')
        content.scrollTo(0, 0);
        // Register event handler
        $(`div.${styles.section}`).on("click", function () {
            // Switch tabs
            if (!props.hasLoaded) { return; }
            if ($(this).hasClass(styles.selected)) { return; }

            $(`div.${styles.section}.${styles.selected}`).removeClass(styles.selected)
            $(this).addClass(styles.selected)
            setFindTeamTabSelected($(this).hasClass('find-a-team'));

        })

        $(`#backbutton`).on("click", function () {
            setSelectedTeamId(0)
            setfiltersOpen(false)
        })

        $(`#search_button`).on("click", function () {
            setSelectedTeamId(0)
            setfiltersOpen(false)
        })

        $(`#filterbutton`).on("click", function () {
            if (!props.hasLoaded) { return; }
            setfiltersOpen(!filtersOpen)
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(`div.${styles.section}`).off("click")
            $(`#backbutton`).off("click")
            $(`#filterbutton`).off("click")
            $(`#search_button`).off("click")
        }
    })

    function triggerRefresh() {
        setIsRefreshing(true);

        var docRef = props.userStatus.db.collection("users").doc(uid).set({
            wants_refresh: true,
        }, { merge: true })
        .then(function () {
            // console.log("Document successfully written!")
        })
        .catch(function (error) {
            console.error("Error writing document: ", error)
        })

        setTimeout(() => {
            setIsRefreshing(false);
        }, 5000);
    }

    function Display() {
        if (findTeamTabSelected) {
            // They have the find team tab open
            if (filtersOpen) {
                return <Filters setTagState={setTagState} tagState={tagState} selectedTags={selectedTags} setSelectedTags={setSelectedTags} tagRoomState={tagRoomState} setTagRoomState={setTagRoomState} availableRooms={availableRooms} setAvailableRooms={setAvailableRooms}></Filters>
                // return //
            }

            if (selectedTeamId == 0 || !props.groups[selectedTeamId]) {
                return <JoinATeam {...props} tagState={tagState} selectedTags={selectedTags} setSelectedTeamId={setSelectedTeamId} tagRoomState={tagRoomState} availableRooms={availableRooms} groups={props.groups}></JoinATeam>
            }
            else {
                // Team Display
                return <TeamDisplay {...props} userStatus={props.userStatus} selectedTeamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId} team_info={props.groups[selectedTeamId]}></TeamDisplay>
            }

        }
        else {
            // The Create a team / my team tab is open
            return props.userStatus.group_id.length > 0 && props.groups[props.userStatus.group_id] ? <MyTeam {...props} setIsInTeam={props.setIsInTeam} setUserStatus={props.setUserStatus} userStatus={props.userStatus} team_info={props.groups[props.userStatus.group_id]} allGroups={props.groups} setGroups={props.setGroups}></MyTeam> : <CreateATeam {...props} userStatus={props.userStatus}></CreateATeam>
        }
    }

    function UserHasAppliedOrBeenAccepted() {
        return props.userStatus.status == "Pending Review" || props.userStatus.status == "Application Accepted" || props.userStatus.staff == true;
    }

    return (
        <div className={`${styles.main_container}`}>
            <div className="container-fluid p-0">
                <div className={`${styles.section_container} row no-gutters`}>
                    <div className={`${styles.section} find-a-team ${styles.selected} col col-xs-6`}>
                        {
                            // selectedTeamId != 0 ? 
                            // <svg width="1em" height="1em" viewBox="0 0 16 16" id="backbutton" className={`bi bi-arrow-left-short ${styles.nav_button} ${styles.backbutton}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            //     <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                            // </svg>
                        }
                        Join a team
                    </div>
                    <div className={`${styles.section} my-team col col-xs-6`}>{props.isInTeam ? `My Team` : `Create a Team`}</div>
                </div>
                <div className="row no-gutters flex-grow-1 h-100">
                    <div className={`${styles.content} col col-xs-12`} id="content">
                        {UserHasAppliedOrBeenAccepted() ? Display() :
                            <div className={styles.locked_teams}>
                                Please apply to join or create a team!
                                <br></br><br></br>
                                If the email you applied with does not match the email you logged in with, please contact us at <a style={{ color: "#0000EE" }} href='mailto:team@hackdavis.io'>team@hackdavis.io</a>.
                                <br></br><br></br><br></br>
                                <div className={`${styles.refresh_button} ${isRefreshing && styles.refresh_button_disabled}`} onClick={() => triggerRefresh()}>
                                    {isRefreshing ? "Refreshing Application Status..." : "Refresh Application Status"}
                                    {isRefreshing && <div className={styles.refresh_anim}></div>}
                                </div>
                                <br></br><br></br><br></br>
                                If refreshing does not work, please wait a few minutes and try again.
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TeamFinder