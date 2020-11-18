import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Cow from "./cow"
import { useFirebase } from 'gatsby-plugin-firebase';
import SocketHandler from './socket';

let cows_real = {}

const CowHandler = (props) => {

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
            return <Cow key={`cow_${cow}`} cow={cows[cow]}></Cow>
        })}</>
};

export default CowHandler