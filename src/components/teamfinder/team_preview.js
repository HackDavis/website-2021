import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import styles from "../css/team_preview.module.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TeamTag from "./tag"
import {graphql, useStaticQuery} from 'gatsby'

const TeamPreview = (props) => {
    
    // Removed useeffect, didn't register on click handler on first opening of modal, so we moved this to the HTML on the bottom via build in onClick feature.
    // useEffect(() => {
        // // Register event handler
        // console.log(`div.${styles.container}#${props.team_data.teamid}`)
        // $(`div.${styles.container}#${props.team_data.teamid}`).on("click", function () {
        //     console.log("click 1")
        //     if (props.skeleton) {return;}
        //     props.setSelectedTeamId(props.team_data.teamid);
        // })
        
        // // Cleanup event handlers
        // return () => {
        //     // clean up the event handler when the component unmounts
        //     $(`div.${styles.container}`).off("click")
        // }
    // })

    // Function built to replace useEffect that registers on click handler. Essentially has the same functionality.
    function selectTeam() {
        // console.log("click 1")
        if (props.skeleton) {return;}
        props.setSelectedTeamId(props.team_data.teamid);
    }
    
    const data = useStaticQuery(graphql`
    {
        allFile(filter: { name: {eq: "rightarrow"}, extension: { eq: "svg"}}, sort: {fields:[name] order: ASC}) {
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
        !props.skeleton ? <div className={styles.container} id={props.team_data.teamid} onClick={selectTeam}>
            <div className={styles.title}>{props.team_data.name}</div>
            {props.team_data.membercount != props.team_data.maxmembers ? 
                <div className={styles.membercount}>{props.team_data.membercount}/{props.team_data.maxmembers}</div> :
                <div className={`${styles.membercount} ${styles.full}`}>Full</div>}
                <img src={data.allFile.edges[0].node.publicURL} className={styles.rightarrow}></img>
            <div className={styles.tagscontainer}>
                {props.team_data.tags.map((tagname) => {
                    return <TeamTag tagname={tagname}></TeamTag>
                })}
            </div>
        </div> : <Skeleton></Skeleton>
    )
};

export default TeamPreview