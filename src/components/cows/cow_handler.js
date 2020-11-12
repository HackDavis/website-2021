import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Cow from "./cow"
import { useFirebase } from 'gatsby-plugin-firebase';
import SocketHandler from './socket';

const CowHandler = (props) => {

    const [myId, setMyId] = useState();
    const [cows, setCows] = useState({});

    return <>
        {<SocketHandler cow={cows} setCows={setCows} myId={myId} setMyId={setMyId}></SocketHandler>}
        {Object.keys(cows).map((key) => {
            return <Cow cow={cows[key]} {...props}></Cow>
        })}</>
};

export default CowHandler