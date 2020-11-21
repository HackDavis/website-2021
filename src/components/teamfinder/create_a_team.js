import React from 'react';
import $, { map } from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "../css/create_a_team.module.css"
import { getUser } from "../../utils/auth"

const CreateATeam = (props) => {
    const user = getUser()
    const { displayName, email, uid } = user

    function createTeam() {
        var team_name = $('#teamName').val();
        var team_description = $('#teamDescription').val();
        var team_size = $("#slct option:selected").val();
        var team_tags = ["Firebase"];
        var team_email = $('#teamEmail').val()
        var team_pending_members = {}
        var team_members = {} 
        team_members[uid] = [displayName, email, true] 

        var db = props.userStatus.db
        db.collection("groups").add({
            name: team_name,
            description: team_description,
            email: team_email,
            max_members: team_size,
            members: team_members,
            pending_members: team_pending_members,
            tags: team_tags,
        })
        .then(function(docRef) {
            props.DisplayNotification("Team successfully created!", "#2ac124", 3000)
            console.log("Group successfully created")
            db.collection("users").doc(uid).set({
                group_id: docRef.id
            }, {merge: true})
        })
        .catch(function(error) {
            props.DisplayNotification("Failed to create team!", "#c12c24", 5000)
            console.error("Error writing document: ", error)
        })
    }

    return (
        <div className={styles.createteam_container}>
            <div className={styles.team_name}>
                Team Name
                <textarea id="teamName" className={styles.inputarea} rows="5" cols="60" name="text" placeholder="Enter team name"></textarea>
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

            <div className={styles.tag_container}>
                Tags:
                {/* Display a list of tags here from a premade list of tags */}
            </div>

            <div className={styles.contact_email}>
                Contact Email (Public): 
                <textarea id="teamEmail" className={styles.inputarea} rows="5" cols="60" name="text" placeholder="Enter a public team contact email"></textarea>
            </div>
            
            <div className={styles.createbuttoncontainer}>
                <div onClick={createTeam} className={styles.createbutton}>Create Team</div>
            </div>
        </div>
    )
};

export default CreateATeam