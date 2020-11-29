import React, { useState, useEffect} from 'react';
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import TeamPreview from "./team_preview"
import styles from "../css/total_teams_section.module.css"
import { useStaticQuery, graphql } from "gatsby"

const JoinATeam = (props) => {
    
    /**
     * Decides whether or not a team should be displayed in the list based on filter tags and preferences
     * @param {*} group 
     */
    function ShouldTeamDisplay(group)
    {
        // Include only avaible rooms 
        if(props.tagRoomState == "Available") {
            
            if (props.tagState == "Any")
            {
                if(Object.keys(group.members).length != group.max_members) {
                    for (let i = 0; i < props.selectedTags.length; i++)
                    {
                        if (group.tags.includes(props.selectedTags[i]))
                        {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return false; 
                }
            }
            else
            {
                if(Object.keys(group.members).length != group.max_members) {
                    // "Only"
                    // Loop through all selected tags. If this group does not have one of them, return false
                    for (let i = 0; i < props.selectedTags.length; i++)
                    {
                        if (!group.tags.includes(props.selectedTags[i]))
                        {
                            return false;
                        }
                    }
                    return props.selectedTags.length > 0;
                } else {
                    return false;
                }
            }
        } 
        // Include all the rooms  
        else {
            if (props.tagState == "Any")
            {
                for (let i = 0; i < props.selectedTags.length; i++)
                {
                    if (group.tags.includes(props.selectedTags[i]))
                    {
                        return true;
                    }
                }
                return false;
            }
            else
            {
                // "Only"
                // Loop through all selected tags. If this group does not have one of them, return false
                for (let i = 0; i < props.selectedTags.length; i++)
                {
                    if (!group.tags.includes(props.selectedTags[i]))
                    {
                        return false;
                    }
                }
                return props.selectedTags.length > 0;
            }
        }
    }

    function DisplayTeamPreviews()
    {
        const previews = [];

        Object.keys(props.groups).forEach((group_id) => {
            const group = props.groups[group_id];
            if (ShouldTeamDisplay(group))
            {
                previews.push(<TeamPreview {...props} key={`${group_id}_teampreview`} team_data={{teamid: group_id, name: group.name, membercount: Object.keys(group.members).length, maxmembers: group.max_members, tags: group.tags}}></TeamPreview>)
            }
        })

        $(`div.${styles.total_teams}`).text(`${previews.length} teams`);

        return previews
    }
    
    const data = useStaticQuery(graphql`
    {
        allFile(filter: { name: {eq: "filter"}, extension: { eq: "svg"} }, sort: {fields:[name] order: ASC}) {
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
        <div>
            {/* Display total number of teams and put filter button on the same line */}
            <div className="container-fluid p-0">
                <div className={`${styles.container} row no-gutters`}>
                    <div className={`${styles.total_teams} col-6`}>
                        0 teams
                    </div>
                    <div className={`${styles.filter_button} col-6`}>
                        <img className={styles.filter_image} id="filterbutton" src={data.allFile.edges[0].node.publicURL} />
                    </div>
                </div>
            </div>
            {DisplayTeamPreviews()}
            {Object.keys(props.groups).length == 0 && <TeamPreview {...props} skeleton={true} team_data={{}}></TeamPreview>}
        </div>
    )
};

export default JoinATeam