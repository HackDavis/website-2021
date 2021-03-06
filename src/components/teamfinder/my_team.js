import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "../css/my_team.module.css"
import TeamTag from "./tag"
import { getUser } from "../../utils/auth"

const MemberInfo = (props) => {

    const [memberExists, setMemberExists] = useState(true)
    const [isPending, setIsPending] = useState(props.pending);

    function removeMember() {
        var all_members = props.team_info.members
        delete all_members[props.member[0]]
        props.team_info.allMembers = all_members
        props.db.collection("groups").doc(props.teamid).update({
            members: all_members
        })
        .then(function() {
            let usersCurGroup;
            props.db.collection("users").doc(props.member[0]).get().then(function(doc) {
                usersCurGroup = doc.data().group_id;
            })
            .then(function() {
                if (usersCurGroup == props.teamid) {
                    props.db.collection("users").doc(props.member[0]).update({
                        group_id: "",
                    })
                }
            })
        })

        props.setGroups(props.allGroups)
        setMemberExists(false);
    }

    function declineRequest() {
        var pending_groups
        props.db.collection("users").doc(props.member[0]).get().then(function(doc) {
            if (doc.exists)
                pending_groups = doc.data().pending_groups;
            // else
                // console.log("this document does not currently exist");
        })
        .then(function (response) {
            // console.log(`PENDING GROUPS ARE: ${pending_groups}`)
            var pending_groups_copy = JSON.parse(JSON.stringify(pending_groups));
            if (Object.entries(pending_groups_copy).length > 1)
                pending_groups_copy = pending_groups_copy.filter((teamid) => teamid != props.teamid);
            else
                pending_groups_copy = []
            props.db.collection("users").doc(props.member[0]).update({
                pending_groups: pending_groups_copy
            })
        })

        var pending_members = props.team_info.pending_members
        if (Object.entries(pending_members).length > 1)
            delete pending_members[props.member[0]]
        else
            pending_members = {}
        // props.team_info.pending_members = pending_members;
        props.db.collection("groups").doc(props.teamid).update({
            pending_members: pending_members
        });

        // props.setGroups(props.allGroups)
        // setMemberExists(false);
    }

    function acceptRequest() {
        var all_members = props.team_info.members
        all_members[props.member[0]] = [props.member[1][0], props.member[1][1], false]
        // props.team_info.allMembers = all_members;
        props.team_info.members = all_members;
        // console.log(props.team_info.members);
        // console.log(Object.keys(props.team_info.members).length);

        var pending_members = props.team_info.pending_members
        if (Object.entries(pending_members).length > 1 && Object.keys(props.team_info.members).length != props.team_info.max_members)
            delete pending_members[props.member[0]]
        else
            pending_members = {};
            
        const old_pending_members = JSON.parse(JSON.stringify(props.team_info.pending_members));
        props.team_info.pending_members = pending_members;

        let pending_groups = [];

        props.db.collection("groups").doc(props.teamid).update({
            members: all_members,
            pending_members: pending_members
        }).then(function()
        {
            props.db.collection("users").doc(props.member[0]).get().then(function(doc) {
                pending_groups = doc.data().pending_groups;
            }).then(function() {
                props.db.collection("users").doc(props.member[0]).update({
                    group_id: props.teamid,
                    pending_groups: [],
                }).then(function() {
                    if (Object.keys(props.team_info.members).length == props.team_info.max_members) {
                        var pendingIDsToClear = old_pending_members;
                        // console.log("pendingIDsToClear: ")
                        // console.log(pendingIDsToClear);
                        Object.keys(pendingIDsToClear).forEach(function(key) {
                            let pendingGroups = []
                            props.db.collection("users").doc(key).get().then(function(doc) {
                                if (doc.exists) {
                                    pendingGroups = doc.data().pending_groups;
                                    pendingGroups = pendingGroups.filter((element) => element != props.teamid);
                                    props.db.collection("users").doc(key).update({
                                        pending_groups: pendingGroups,
                                    })
                                    .catch(function(error)
                                    {
                                        // console.log(`Failed to update user: ${error}`);
                                    })
                                } else {
                                    // console.log("Error getting document");
                                }
                            })
                        })
                    } 
                }).then(function(doc)
                {
                    // console.log("removing old requests...")
                    pending_groups.forEach((group_id) => {
                        props.db.collection("groups").doc(group_id).get().then(function(doc) {
                            // console.log("got group pending members")
                            if (doc != undefined)
                            {
                                const pending_group_members = doc.data().pending_members;
                                delete pending_group_members[props.member[0]];

                                props.db.collection("groups").doc(group_id).update({
                                    pending_members: pending_group_members,
                                }).then(function(docRef) {
                                    // console.log("this should have updated pending members on acceptance")
                                    // console.log(group_id)
                                })
                            }
                        })
                    })
                }).then(function(doc)
                {
                    props.member[1][2] = false
                    const allgroups = JSON.parse(JSON.stringify(props.allGroups));
                    allgroups[props.teamid].pending_members = pending_members;
                    props.setGroups(allgroups)
                    setIsPending(false)
                })
                
            })
        })
        
    }

    return memberExists ? (
        <div className={`${styles.member_info} ${isPending && styles.pendingmember}`}>
            <span className={styles.name}>{props.member[1][0]}{isPending && " (Pending)"}</span>
            <span className={styles.email}>{props.member[1][1]}</span>
            {isPending && <div className={styles.requestText}>{props.member[1][2]}</div>}
            <div className={styles.member_buttons_container}>
                {
                    !isPending ? 
                    props.isOwner && props.member[0] != props.uid ? <div onClick={removeMember} className={styles.removebutton}> Remove</div> : null :
                    <div className={styles.status_container}>
                        <div onClick={acceptRequest} className={`${styles.status_button} ${styles.approvebutton}`}>Approve</div>
                        <div onClick={declineRequest} className={`${styles.status_button} ${styles.denybutton}`}>Deny</div>
                    </div>
                }
            </div>
            <hr></hr>
        </div>
    ) : null;
}

const MyTeam = (props) => {
    const user = getUser()
    const { uid, name } = user

    var isOwner = false
    // {console.log(props.team_info.members)}
    if (props.team_info && props.team_info.members && props.team_info.members[uid] && props.team_info.members[uid][2])
        isOwner=true
    let leaveText = (isOwner) ? "Disband Team" : "Leave Team" 

    function clearPendingRequests() { 
        // store copy before cleared 
        const pending_groups = props.userStatus.pending_groups;
    }

    function leaveGroup() {
        var db = props.userStatus.db;
        var old_group_id = props.userStatus.group_id;
        db.collection("users").doc(uid).set({
            group_id:""
        }, {merge: true})
        .then(function() {
            // console.log("You have successfully left the group.")
        })
        .catch(function(error) {
            props.DisplayNotification("Failed to leave group! [1]", "#c12c24", 5000)
            return;
        })

        var cur_team = props.team_info.members
        delete cur_team[uid]
        props.team_info.members = cur_team

        if (isOwner) {
            var groupIDsToClear = props.allGroups[props.userStatus.group_id].members;
            var pendingGroupsToClear = props.allGroups[props.userStatus.group_id].pending_members;
            delete props.allGroups[props.userStatus.group_id]
            props.setGroups(props.allGroups)
            db.collection("groups").doc(old_group_id).delete().then(function() { 

            })
            .then(function() {
                Object.keys(groupIDsToClear).forEach(function(key) {
                    db.collection("users").doc(key).set({
                        group_id: ""
                    }, {merge: true});
                })
                Object.keys(pendingGroupsToClear).forEach(function(key) {
                    let pendingGroups = []
                    // console.log("KEY:", key);
                    db.collection("users").doc(key).get().then(function(doc) {
                        if (doc.exists) {
                            pendingGroups = doc.data().pending_groups;
                            pendingGroups = pendingGroups.filter((element) => element != props.userStatus.group_id);
                            db.collection("users").doc(key).update({
                                pending_groups: pendingGroups,
                            });
                        } else {
                            // console.log("Error getting document");
                        }
                    })
                })
                props.setIsInTeam(false)
            }).catch(function(error) {
                // console.error("Error removing document: ", error);
            })
        } else {
            db.collection("groups").doc(old_group_id).update({
                members: JSON.parse(JSON.stringify(cur_team))
            })
            .then(function() {
                props.setIsInTeam(false)
            })
            .catch(function(error) {
                props.DisplayNotification("Failed to leave group! [2]", "#c12c24", 5000)
            })
        }
    }

    return (
        <div className={styles.myTeam_container}>
            <div className={styles.team_name}>
                {props.team_info.name}
                <div className={styles.membercount}>{Object.keys(props.team_info.members).length}/{props.team_info.max_members}</div>
            </div>
            <div className={styles.team_description_container}>
                {props.team_info.description}
            </div>
            <div className={styles.team_tags}> 
                {props.team_info.tags.map((tagname) => {
                    return <TeamTag tagname={tagname}></TeamTag>
                })}
            </div>
            <hr></hr>
            <div className={styles.contact_email}>
                <div className={styles.contact_email_title}>Contact Email</div>
                {props.team_info.email}
            </div>
            <hr></hr>
            <div className={styles.members_container}>
                <div className={styles.memberstitle}>Members</div>
                <div className={styles.members}>
                    {Object.entries(props.team_info.members).map((element) => 
                    {
                        return <MemberInfo member={element} team_info={props.team_info} teamid={props.userStatus.group_id} uid={uid} pending={false} isOwner={isOwner} allGroups={props.allGroups} setGroups={props.setGroups} db={props.userStatus.db}></MemberInfo>
                    })}
                    {Object.entries(props.team_info.pending_members).length > 0 && Object.entries(props.team_info.pending_members).map((element) => 
                    {
                        return <MemberInfo member={element} team_info={props.team_info} teamid={props.userStatus.group_id} uid={uid} pending={true} isOwner={isOwner} allGroups={props.allGroups} setGroups={props.setGroups} db={props.userStatus.db}></MemberInfo>
                    })}
                </div>
            </div>
            <div onClick={leaveGroup} className={styles.leavebuttoncontainer}>
                <div className={styles.leavebutton}>{leaveText}</div>
            </div>
        </div>
    )
};

export default MyTeam