import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Skeleton from 'react-loading-skeleton';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import styles from "../css/tag.module.css"
import seedrandom from "seedrandom"

const tag_colors = 
[
    "#E86560", "#FFC75A", "#B6CF69", "#12A8B1", "916AFF"
]

const TeamTag = (props) => {

    const [tagColor, setTagColor] = useState("hsl(0, 0, 0)");

    useEffect(() => 
    {
        setTagColor(GetTagColor(props.tagname));
    })

    function GetTagColor(tagname)
    {
        const rng = seedrandom(tagname);
        return tag_colors[Math.floor(rng() * (tag_colors.length - 1))];
        return `hsl(${rng() * 255}, ${(rng() * 0.3 + 0.7) * 100}%, ${(rng() * 0.3 + 0.2) * 100}%)`;
    }

    return (
        <div data-tagname={props.tagname} className={`${styles.tag} ${props.filter_tag && styles.filter_tag} ${props.not_filled && styles.not_filled}`} style={props.not_filled ? {"border-color": tagColor, "color": tagColor} : {"backgroundColor": tagColor}}>
            {props.tagname}
        </div>
    )
};

export default TeamTag