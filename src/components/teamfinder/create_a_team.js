import React, { useEffect, useState } from 'react';
import $, { map } from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "../css/create_a_team.module.css"
import tag_list from "./team_tags_list.js"
import tag_styles from "../css/tag.module.css"
import TeamTag from "./tag"
import { getUser } from "../../utils/auth"

const CreateATeam = (props) => {
    const user = getUser()
    const { displayName, email, uid } = user
    const [selectedTags, setSelectedTags] = useState([]);

    function createTeam() {
        var team_name = $('#teamName').val();
        var team_description = $('#teamDescription').val();
        var team_size = $("#slct option:selected").val();
        var team_tags = selectedTags
        var team_email = $('#teamEmail').val()
        var team_pending_members = {}
        var team_members = {} 
        team_members[uid] = [displayName, email, true] 

        if (team_name.length > 20) {
            props.DisplayNotification("Max team name character limit is 20 characters [5]", "#c12c24");
            return
        }

        if (team_description.length > 500) {
            props.DisplayNotification("Max description character limit is 500 characters [5]", "#c12c24");
            return
        }

        if (team_email.length > 30) {
            props.DisplayNotification("Max email character limit is 30 characters [5]", "#c12c24");
            return
        }

        if (team_size > 4 || team_size < 2) {
            props.DisplayNotification("Team size must be between 2 and 4 members [5]", "#c12c24");
            return
        }
        
        // store copy before cleared 
        const pending_groups = props.userStatus.pending_groups;

        if (team_name.length != 0 && team_description.length != 0 && team_email.length != 0 && team_tags.length != 0) {
            var db = props.userStatus.db
            db.collection("groups").add({
                name: team_name,
                description: team_description,
                email: team_email,
                max_members: team_size,
                members: team_members,
                pending_members: team_pending_members,
                tags: team_tags
            })
            .then(function(docRef) {
                props.DisplayNotification("Team successfully created!", "#2ac124", 3000)
                // console.log("Group successfully created")
                db.collection("users").doc(uid).set({
                    group_id: docRef.id,
                    pending_groups: [],
                }, {merge: true})
            }).then(function(docRef) {
                // console.log("Removing user other requests from other groups");
                pending_groups.forEach((group_id) => {
                    db.collection("groups").doc(group_id).get().then(function(doc) {
                        const pending_group_members = doc.data().pending_members;
                        delete pending_group_members[uid];

                        db.collection("groups").doc(group_id).update({
                            pending_members: pending_group_members,
                        }).then(function(docRef) {
                            // console.log("this should have updated pending members")
                            // console.log(group_id)
                        })
                    })
                });
            })
            .catch(function(error) {
                props.DisplayNotification("Failed to create team!", "#c12c24", 5000)
                console.error("Error writing document: ", error)
            })
        } else {
            props.DisplayNotification("Please ensure that you've filled out all fields! [4]", "#c12c24");
        }

        // clear the user's current pending teams 
    }

    useEffect(() => {
        $(`div.${tag_styles.filter_tag}`).on("click", function () {
            const tagname = $(this).data('tagname');

            if (tagname.length == 0 || tagname.length > 15)
            {
                props.DisplayNotification("Invalid tag!", "#c12c24");
                return;
            }

            const selectedTagsCopy = JSON.parse(JSON.stringify(selectedTags));
            if (selectedTagsCopy.length < 5 || selectedTags.includes(tagname)) {
                if (!selectedTagsCopy.includes(tagname)) {
                    selectedTagsCopy.
                    push(tagname);
                }

                setSelectedTags(
                    selectedTags.includes(tagname) ?
                        selectedTags.filter((tag) => tag != tagname) :
                        selectedTagsCopy);
            }
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(`div.${tag_styles.filter_tag}`).off("click")
            $(`div.${styles.selectallbutton}`).off("click")
            $(`div.${styles.deselectallbutton}`).off("click")
        }
    })

    return (
        <div className={styles.createteam_container}>
            <div className={styles.team_name}>
                Team Name
                <textarea id="teamName" className={styles.inputarea} rows="2" cols="60" name="text" placeholder="Enter team name"></textarea>
            </div>

            <div className={styles.team_description}>
                Team Description
                <textarea id="teamDescription" className={styles.inputarea} rows="5" cols="60" name="text" placeholder="Enter team description"></textarea>
            </div>

            <div className={styles.team_size}>
                Team Size:
                <select name="slct" id="slct">
                    <option value="2">2</option> 
                    <option value="3">3</option> 
                    <option value="4">4</option>
                </select>
            </div>

            <div className={styles.contact_email}>
                Contact Email (Public): 
                <textarea id="teamEmail" className={styles.inputarea} rows="2" cols="60" name="text" placeholder="Enter a public team contact email"></textarea>
            </div>

            <div className={styles.tag_container}>
                Tags (select no more than 5):
                <div className={styles.tagcontainer}>
                    {tag_list.map((tag) => {
                        return <TeamTag tagname={tag} filter_tag={true} setSelectedTags={setSelectedTags} selectedTags={selectedTags} not_filled={!selectedTags.includes(tag)}></TeamTag>
                    })}
                </div>
            </div>
            
            <div className={styles.createbuttoncontainer}>
                <div onClick={createTeam} className={styles.createbutton}>CREATE TEAM</div>
            </div>
        </div>
    )
};

export default CreateATeam