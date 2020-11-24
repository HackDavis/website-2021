import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import styles from "../css/team_preview.module.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TeamTag from "./tag"
import {graphql, useStaticQuery} from 'gatsby'

const TeamPreview = (props) => {
    
    useEffect(() => {
        // Register event handler
        $(`div.${styles.container}#${props.team_data.teamid}`).on("click", function () {
            if (props.skeleton) {return;}
            props.setSelectedTeamId(props.team_data.teamid);
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(`div.${styles.container}`).off("click")
        }
    })

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
        !props.skeleton ? <div className={styles.container} id={props.team_data.teamid}>
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