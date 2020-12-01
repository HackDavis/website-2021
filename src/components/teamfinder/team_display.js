import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "../css/team_display.module.css"
import TeamTag from "./tag"
import { getUser } from "../../utils/auth"
import { useStaticQuery, graphql } from "gatsby"

const TeamDisplay = (props) => {
    
    useEffect(() =>{

        $(`#backbutton`).on("click", function(){
            props.setSelectedTeamId(0)
            props.setfiltersOpen(false)
        })

        return()=>{
            $(`#backbutton`).off("click")
        }
    })
    
    const user = getUser()
    const { displayName, email, uid } = user
    var group_pending_members = new Map([])

    function CanJoinTeam()
    {
        return props.userStatus.group_id.length == 0
    }

    function joinRequest() {

        if (props.userStatus.pending_groups.length >= 5)
        {
            props.DisplayNotification("Max team join request limit of 5 reached!", "#c12c24");
            return;
        }

        if (props.userStatus.group_id.length > 0)
        {
            props.DisplayNotification("You are already in a team!", "#c12c24");
            return;
        }

        // various checks to see if the user is valid to join a group.
        if (props.userStatus.pending_groups.length < 5 && 
            props.userStatus.group_id.length == 0 && 
            (!props.userStatus.pending_groups.includes(props.selectedTeamId)))
        {
            if ($('#applicantReason').val().length > 500) {
                props.DisplayNotification("Max join request reason limit is 500 characters", "#c12c24");
                return
            }

            var db = props.userStatus.db;
            
            props.userStatus.pending_groups.push(props.selectedTeamId)
            db.collection("users").doc(uid).set({
                pending_groups: props.userStatus.pending_groups
            }, {merge: true})
            .then(function() {
                console.log("Pending user groups successfully updated in members collection.")
                // props.DisplayNotification("Requested to join team!", "#2ac124");
            })
            .catch(function(error) {
                props.DisplayNotification("Error joining team! [1]", "#c12c24", 5000);
            })

            props.team_info.pending_members[uid] = [displayName, email, $('#applicantReason').val()];
            db.collection("groups").doc(props.selectedTeamId).set({
                pending_members: props.team_info.pending_members
            }, {merge: true})
            .then(function() {
                console.log("Pending member list has been successfully updated.")
            })
            .catch(function(error) {
                props.DisplayNotification("You currently cannot join a team [2]", "#c12c24");
            })
        }
        else {
            props.DisplayNotification("You currently cannot join a team [3]", "#c12c24");
        }
    }

    function cancelJoinRequest() {
        console.log("CANCEL JOIN REQUEST")
        var db = props.userStatus.db;

        let pending_groups = JSON.parse(JSON.stringify(props.userStatus.pending_groups));
        if (Object.entries(props.userStatus.pending_groups).length > 1)
            pending_groups = pending_groups.filter((group_id) => group_id != props.selectedTeamId);
        else 
            pending_groups = []
        db.collection("users").doc(uid).set({
            pending_groups: pending_groups
        }, { merge: true })
        .then(function (response) {
            console.log("Successfully removed the pending group from the user doc")
        })
        .catch(function (error) {
            props.DisplayNotification("Error canceling joing request! [1]", "#c12c24", 5000);
        })

        if (Object.entries(props.team_info.pending_members).length > 1)
            delete props.team_info.pending_members[uid]
        else
            props.team_info.pending_members = {}
        db.collection("groups").doc(props.selectedTeamId).set({
            pending_members: props.team_info.pending_members
        }, { merge: true })
        .then(function (response) {
            console.log("Sucessfully removed the pending member from the group doc")
        })
        .catch(function (error) {
            props.DisplayNotification("Error canceling joing request! [1]", "#c12c24");
        })
    }

    const data = useStaticQuery(graphql`
    {
        allFile(filter: { name: {eq: "leftarrow"}, extension: { eq: "svg"} }, sort: {fields:[name] order: ASC}) {
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


    return (
        <div className={styles.maincontainer} id="content_team">
            <div className={styles.left_arrow_container} id="backbutton">
                <img className={styles.leftarrow} src={data.allFile.edges[0].node.publicURL} />
            </div>
            <div className={styles.title}>{props.team_info.name}</div>
            {Object.keys(props.team_info.members).length != props.team_info.max_members ?
                <div className={styles.membercount}>{Object.keys(props.team_info.members).length}/{props.team_info.max_members}</div> :
                <div className={`${styles.membercount} ${styles.full}`}>Full</div>
            }
            <div className={styles.description}>{props.team_info.description}</div> 
            {/* <hr className={styles.hr}></hr> */}
            <div className={styles.tagscontainer} style={{marginTop: "10px"}}>
                {props.team_info.tags.map((tagname) => {
                    return <TeamTag tagname={tagname}></TeamTag>
                })}
            </div>

            <div className={styles.members}>
                <div className={styles.memberstitle}>Members</div>
                <div className={styles.memberscontainer}>
                    {Object.keys(props.team_info.members).map((id) => {
                        return <div className={styles.membername}>{props.team_info.members[id][0]}</div>
                    })}
                </div>
            </div>
            <div className={styles.email} style={{marginTop: "20px"}}>
                <div className={styles.emailtitle}>Contact Email</div>
                <div className={styles.contactemail}>{props.team_info.email}</div>
            </div>
            
            <div className={styles.applycontainer}>
                <div className={styles.textareatitle}>Why do you want to join this team?</div>
                <br></br>
                <div>
                    <textarea id="applicantReason" className={styles.inputarea} rows="5" cols="60" name="text" placeholder="Tell us about your skills and passions!"></textarea>
                </div>
            </div>
            
            {Object.keys(props.team_info.members).length != props.team_info.max_members && !props.userStatus.pending_groups.includes(props.selectedTeamId) ?
                
                (CanJoinTeam() ? 
                    <div onClick={joinRequest} className={styles.joinbuttoncontainer}>
                        <div className={styles.joinbutton}>REQUEST TO JOIN TEAM</div>
                    </div> : 
                    
                    <div></div>
                    
                    )
                 :
                
                (props.userStatus.pending_groups.includes(props.selectedTeamId) ? 
                
                    <div className={styles.joinbuttoncontainer}>
                        <div className={`${styles.joinbutton}`} onClick={cancelJoinRequest} style={{backgroundColor: "gray"}}>
                            CANCEL REQUEST
                        </div>
                    </div>
                : 
                    <div className={styles.joinbuttoncontainer}>
                        <div className={`${styles.joinbutton} ${styles.teamfullbutton}`}>
                            TEAM IS FULL
                        </div>
                    </div>
                )

            }
        </div>
    )
};

export default TeamDisplay