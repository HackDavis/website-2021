import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Cow from "./cow"
import { subscribeToTimer } from './socket';
import { useFirebase } from 'gatsby-plugin-firebase';

const CowHandler = (props) => {

    const [cows, setCows] = useState({
            "test id": {name: "Test Cow", pos: {x: 50, y: 50}}
        });

    console.log("got here")
    subscribeToTimer();

    return (
        Object.entries(cows).map((cow) => 
        {
            return <Cow cow={cow} {...props}></Cow>
        })
    )
};

export default CowHandler