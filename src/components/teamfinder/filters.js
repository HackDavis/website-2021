import React, { useState, useEffect } from "react"
import styles from "../css/filters.module.css"
import $ from "jquery"
import Skeleton from "react-loading-skeleton"
import TeamTag from "./tag"
import tag_styles from "../css/tag.module.css"
import tag_list from "./team_tags_list.js"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {graphql, useStaticQuery} from "gatsby"
const Filters = props => {

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

    useEffect(() => 
    {
        $(`div.${tag_styles.filter_tag}`).on("click", function(){
            const tagname = $(this).data('tagname');

            const selectedTagsCopy = JSON.parse(JSON.stringify(props.selectedTags));
            if (!selectedTagsCopy.includes(tagname))
            {
                selectedTagsCopy.push(tagname);
            }

            props.setSelectedTags(
                props.selectedTags.includes(tagname) ? 
                props.selectedTags.filter((tag) => tag != tagname) : 
                selectedTagsCopy );
        })

        $(`div.${styles.selectallbutton}`).on("click", function(){
            props.setSelectedTags(tag_list)
        })

        $(`div.${styles.deselectallbutton}`).on("click", function(){
            props.setSelectedTags([])
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(`div.${tag_styles.filter_tag}`).off("click")
            $(`div.${styles.selectallbutton}`).off("click")
            $(`div.${styles.deselectallbutton}`).off("click")
        }

    })

    function SelectRadioButton(e)
    {
    
        props.setTagState(e.currentTarget.value);
    }

    function SelectCheckBox(e){
        if(props.tagRoomState != 'Available'){
            props.setTagRoomState(e.currentTarget.value);
        } else {
            props.setTagRoomState('')
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.backbutton} id="backbutton">
                <img src={data.allFile.edges[0].node.publicURL} />
            </div>
            <div className={styles.title}>
                Filter Teams
                <div className={styles.selectioncontainer}> 
                    <div className={styles.buttoncontainer}>
                        <div className={styles.selectallbutton}>Select All</div>
                        <div className={styles.deselectallbutton}> Clear</div>
                    </div>
                </div>
            </div>
            <div className={styles.radio_container}>
                <label for="any_tags">
                    <input type="radio" name="tagState" id="any_tags" value="Any" onChange={SelectRadioButton} checked={props.tagState == "Any" && "checked"} required /> Any of these tags
                </label>
                <br></br>
                <label for="only_tags" className={styles.only_tag}>
                    <input type="radio" name="tagState" id="only_tags" value="Only" onChange={SelectRadioButton} checked={props.tagState == "Only" && "checked"} required /> Only these tags
                </label>
                <br></br>
                <label for="teams_with_room" className={styles.teams_with_room}>
                    <input type="radio" name="tagRoomState" id="available_room_checkbox" onChange={SelectCheckBox} checked={props.tagRoomState == "Available" && "checked"} value="Available"  required/> Teams with room
                </label>
            </div>
            <div className={styles.tagcontainer}>
                {tag_list.map((tag) => 
                {
                    return <TeamTag tagname={tag} filter_tag={true} setSelectedTags={props.setSelectedTags} selectedTags={props.selectedTags} not_filled={!props.selectedTags.includes(tag)}></TeamTag>
                })}
            </div>
            <div className={styles.search_bar_container} id="search_button">
                <div className={styles.search_bar}>SEARCH</div>
            </div>
        </div>
    )
}

export default Filters
