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

    function SetCows(cows)
    {
        cows_real = cows;
        setCows(cows_real);
    }

    function AddCow(id, cow)
    {
        const cows_copy = JSON.parse(JSON.stringify(cows_real));
        cows_copy[id] = cow;
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