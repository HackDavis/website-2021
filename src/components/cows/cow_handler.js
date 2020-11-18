import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Cow from "./cow"
import { useStaticQuery, graphql } from "gatsby"
import { useFirebase } from 'gatsby-plugin-firebase';
import SocketHandler from './socket';

let cows_real = {}

const CowHandler = (props) => {

    const data = useStaticQuery(graphql`
    {
        allFile(filter: { name: {eq: "cowtest"} extension: { eq: "png"} }, sort: {fields:[name] order: ASC}) {
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
  
    const [myId, setMyId] = useState();
    const [cows, setCows] = useState({});

    /**
     * Why do you have cows_real and cows as a state?
     * 
     * React was causing me pain. That's all.
     * 
     */

    function SetCows(cows)
    {
        cows_real = cows;
        setCows(cows_real);
    }

    function AddCow(id, cow)
    {
        let cows_copy = JSON.parse(JSON.stringify(cows_real));
        cows_copy[id] = cow;

        if (cows_real[id] != undefined)
        {
            // Cow existed before, so we're updating its position.
            // Store distance in pixels

            if (cows_real[id].timeout)
            {
                clearTimeout(cows_real[id].timeout);
            }

            const diff = {x: (cow.pos.x - cows_real[id].pos.x) * $(window).width(), y: (cow.pos.y - cows_real[id].pos.y) * $(window).height()};
            cows_copy[id].time = Math.sqrt(diff.x * diff.x + diff.y * diff.y) / 500;
            cows_copy[id].timeout = setTimeout(() => {
                cows_copy = JSON.parse(JSON.stringify(cows_real));
                if (cows_copy[id])
                {
                    cows_copy[id].time = null;
                    cows_copy[id].timeout = null;
                    setCows(cows_copy);
                }
            }, cows_copy[id].time * 1000);
        }

        cows_real = cows_copy;
        setCows(cows_copy);
    }

    function RemoveCow(id)
    {
        const cows_copy = JSON.parse(JSON.stringify(cows_real));
        delete cows_copy[id];
        cows_real = cows_copy;
        setCows(cows_real);
    }

    return <>
        {<SocketHandler AddCow={AddCow} RemoveCow={RemoveCow} SetCows={SetCows} myId={myId} setMyId={setMyId}></SocketHandler>}
        {Object.keys(cows).map((cow) => {
            return <Cow key={`cow_${cow}`} image_src={data.allFile.edges[0].node.publicURL} cow={cows[cow]}></Cow>
        })}</>
};

export default CowHandler