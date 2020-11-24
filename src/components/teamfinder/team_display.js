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

    function joinRequest() {
        // various checks to see if the user is valid to join a group.
        if (props.userStatus.pending_groups.length < 5 && 
            props.userStatus.group_id.length == 0 && 
            (!props.userStatus.pending_groups.includes(props.selectedTeamId)))
        {
            var db = props.userStatus.db;
            
            props.userStatus.pending_groups.push(props.selectedTeamId)
            db.collection("users").doc(uid).set({
                pending_groups: props.userStatus.pending_groups
            }, {merge: true})
            .then(function() {
                console.log("Pending user groups successfully updated in members collection.")
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
                props.setSelectedTeamId(0) 
            })
            .catch(function(error) {
                props.DisplayNotification("Error joining team! [2]", "#c12c24");
            })
        }
        else {
            console.log(props.userStatus.group_id)
            console.log(props.userStatus.pending_groups.length < 5)
            console.log(props.userStatus.group_id.length == 0) 
            console.log(!props.userStatus.pending_groups.includes(props.selectedTeamId))
            props.DisplayNotification("Error joining team! [3]", "#c12c24");
        }
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
        <div className={styles.maincontainer}>
            {console.log("TEAM DISPLAY INFO")}
            {console.log(props.team_info)}
            <img className={styles.leftarrow} id="backbutton" src={data.allFile.edges[0].node.publicURL} />
            <div className={styles.title}>{props.team_info.name}</div>
            {Object.keys(props.team_info.members).length != props.team_info.max_members ?
                <div className={styles.membercount}>{Object.keys(props.team_info.members).length}/{props.team_info.max_members}</div> :
                <div className={`${styles.membercount} ${styles.full}`}>Full</div>
            }
            <div className={styles.description}>{props.team_info.description}</div> 
            <div className={styles.tagscontainer}>
                {props.team_info.tags.map((tagname) => {
                    return <TeamTag tagname={tagname}></TeamTag>
                })}
            </div>
            <hr></hr>
            <div className={styles.members}>
                <div className={styles.memberstitle}>Team Members</div>
                <div className={styles.memberscontainer}>
                    {Object.keys(props.team_info.members).map((id) => {
                        return <div className={styles.membername}>{props.team_info.members[id][0]}</div>
                    })}
                </div>
            </div>
            <div className={styles.email}>
                <div className={styles.emailtitle}>Contact Email</div>
                <div className={styles.contactemail}>{props.team_info.email}</div>
            </div>
            <hr></hr>
            <div className={styles.applycontainer}>
                <div className={styles.textareatitle}>Why do you want to join this team?</div>
                <br></br>
                <div>
                    <textarea id="applicantReason" className={styles.inputarea} rows="5" cols="60" name="text" placeholder="Tell us about your skills and passions!"></textarea>
                </div>
            </div>
            {props.team_info.members.length != props.team_info.max_members ?
                
                <div onClick={joinRequest} className={styles.joinbuttoncontainer}>
                    <div className={styles.joinbutton}>Request to Join Team</div>
                </div> :
                
                <div className={styles.joinbuttoncontainer}>
                    <div className={`${styles.joinbutton} ${styles.teamfullbutton}`}>Team is Full</div>
                </div>
            }
        </div>
    )
};

export default TeamDisplay