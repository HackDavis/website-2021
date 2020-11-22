import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "../css/my_team.module.css"
import TeamTag from "./tag"
import { getUser } from "../../utils/auth"

const MemberInfo = (props) => {

    const [memberExists, setMemberExists] = useState(true)

    function removeMember() {
        var all_members = props.team_info.members
        delete all_members[props.member[0]]
        props.team_info.allMembers = all_members
        props.db.collection("groups").doc(props.teamid).update({
            members: all_members
        })
        .then(function() {
            props.db.collection("users").doc(props.member[0]).update({
                group_id: "",
            })
        })

        props.setGroups(props.allGroups)
        setMemberExists(false);
    }

    function declineRequest() {
        var pending_members = props.team_info.pending_members
        if (Object.entries(pending_members).length > 1)
            delete pending_members[props.member[0]]
        else
            pending_members = {}
        props.team_info.pending_members = pending_members;
        props.db.collection("groups").doc(props.teamid).update({
            pending_members: pending_members
        });

        props.setGroups(props.allGroups)
        setMemberExists(false);
    }

    function acceptRequest() {
        var pending_members = props.team_info.pending_members
        if (Object.entries(pending_members).length > 1)
            delete pending_members[props.member[0]]
        else
            pending_members = {}
        props.team_info.pending_members = pending_members;
        props.db.collection("groups").doc(props.teamid).update({
            pending_members: pending_members
        });

        props.setGroups(props.allGroups)

        var all_members = props.team_info.members
        all_members[props.member[0]] = [props.member[1][0], props.member[1][1], false]
        props.team_info.allMembers = all_members
        props.db.collection("groups").doc(props.teamid).update({
            members: all_members
        })
        .then(function() {
            props.db.collection("users").doc(props.member[0]).update({
                group_id: props.teamid,
                pending_groups: {}
            })
        })

        props.setGroups(props.allGroups)
        // can i get jquery here to change the style of the text color to red so they look like they've been accepted thanks i hate this 
    }

    return memberExists ? (
        <div className={`${styles.member_info} ${props.pending && styles.pendingmember}`}>
            <span className={styles.name}>{props.member[1][0]}{props.pending && " (Pending)"}</span>
            <span className={styles.email}>{props.member[1][1]}</span>
            {props.pending && <div className={styles.requestText}>{props.member[1][2]}</div>}
            <div className={styles.member_buttons_container}>
                {
                    !props.pending ? 
                    props.isOwner && props.member[0] != props.uid ? <div onClick={removeMember} className={styles.removebutton}> Remove</div> : null :
                    <div><div onClick={acceptRequest} className={styles.approvebutton}>Approve</div>
                    <div onClick={declineRequest} className={styles.denybutton}>Deny</div></div>
                }
            </div>
        </div>
    ) : null;
}

const MyTeam = (props) => {
    const user = getUser()
    const { uid, name } = user

    var isOwner = false
    {console.log(props.team_info.members)}
    if (props.team_info.members[uid][2])
        isOwner=true

    function leaveGroup() {
        var db = props.userStatus.db;
        var old_group_id = props.userStatus.group_id;
        db.collection("users").doc(uid).set({
            group_id:""
        }, {merge: true})
        .then(function() {
            console.log("You have successfully left the group.")
        })
        .catch(function(error) {
            props.DisplayNotification("Failed to leave group! [1]", "#c12c24", 5000)
            // console.error("Error writing document: ", error)
        })

        var cur_team = props.team_info.members
        delete cur_team[uid]
        props.team_info.members = cur_team

        if (isOwner) {
            db.collection("groups").doc(old_group_id).delete().then(function() {
                console.log("Document successfully deleted"); 
            })
            .then(function() {
                props.setIsInTeam(false)
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            })
        } else {
            db.collection("groups").doc(old_group_id).set({
                members: props.team_info.members
            }, {merge: true})
            .then(function() {
                props.setIsInTeam(false)
            })
            .catch(function(error) {
                props.DisplayNotification("Failed to leave group! [2]", "#c12c24", 5000)
                // console.error("Error writing document: ", error)
            })
        }
    }

    return (
        <div className={styles.myTeam_container}>
            <div className={styles.team_name}>
                {props.team_info.name}
            </div>
            <div className={styles.team_description_container}>
                {props.team_info.description}
            </div>
            <div className={styles.members_container}>
                <div className={styles.memberstitle}>Members {Object.keys(props.team_info.members).length}/{props.team_info.max_members}</div>
                <div className={styles.members}>
                    {Object.entries(props.team_info.members).map((element) => 
                    {
                        return <MemberInfo member={element} team_info={props.team_info} allMembers={props.team_info.members} teamid={props.userStatus.group_id} uid={uid} isOwner={isOwner} allGroups={props.allGroups} setGroups={props.setGroups} db={props.userStatus.db}></MemberInfo>
                    })}
                    {Object.entries(props.team_info.pending_members).length > 0 && Object.entries(props.team_info.pending_members).map((element) => 
                    {
                        return <MemberInfo member={element} team_info={props.team_info} pendingMembers={props.team_info.pending_members} allMembers={props.team_info.members} pending={true} teamid={props.userStatus.group_id} uid={uid} isOwner={isOwner} allGroups={props.allGroups} setGroups={props.setGroups} db={props.userStatus.db}></MemberInfo>
                    })}
                </div>
            </div>
            <div className={styles.team_tags}> 
                {props.team_info.tags.map((tagname) => {
                    return <TeamTag tagname={tagname}></TeamTag>
                })}
            </div>
            <div className={styles.contact_email}>
                <div className={styles.contact_email_title}>Contact Email</div>
                {props.team_info.email}
            </div>
            <div onClick={leaveGroup} className={styles.leavebuttoncontainer}>
                <div onClick={leaveGroup} className={styles.leavebutton}>Leave Team</div>
            </div>
        </div>
    )
};

export default MyTeam