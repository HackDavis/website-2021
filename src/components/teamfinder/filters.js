import React, { useState, useEffect } from "react"
import styles from "../css/filters.module.css"
import $ from "jquery"
import Skeleton from "react-loading-skeleton"
import TeamTag from "./tag"
import tag_styles from "../css/tag.module.css"
import tag_list from "./team_tags_list.js"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Filters = props => {

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

    return (
        <div className={styles.container}>
            <div className={styles.title}>Filter Teams</div>
            <div className={styles.selectioncontainer}> 
              <div className={styles.buttoncontainer}>
                <div className={styles.selectallbutton}>Select All</div>
                <div className={styles.deselectallbutton}> Deselect All</div>
              </div>
            </div>
      
            <div>
                <label for="any_tags">
                    <input type="radio" name="tagState" id="any_tags" value="Any" onChange={SelectRadioButton} checked={props.tagState == "Any" && "checked"} required /> Any of these tags
                </label>
                <br></br>
                <label for="only_tags">
                    <input type="radio" name="tagState" id="only_tags" value="Only" onChange={SelectRadioButton} checked={props.tagState == "Only" && "checked"} required /> Only these tags
                </label>
            </div>
            <div className={styles.tagcontainer}>
                {tag_list.map((tag) => 
                {
                    return <TeamTag tagname={tag} filter_tag={true} setSelectedTags={props.setSelectedTags} selectedTags={props.selectedTags} not_filled={!props.selectedTags.includes(tag)}></TeamTag>
                })}
            </div>
        </div>
    )
}

export default Filters
