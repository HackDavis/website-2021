import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Cow from "./cow"
import { useFirebase } from 'gatsby-plugin-firebase';
import SocketHandler from './socket';

const CowHandler = (props) => {

    const [myId, setMyId] = useState();
    const [cows, setCows] = useState({});

    useEffect(() => 
    {
        SocketHandler
    }, true)

    return <>
        {<SocketHandler cow={cows} setCows={setCows} myId={myId} setMyId={setMyId}></SocketHandler>}
        {Object.keys(cows).map((key) => {
            return <Cow cow={cows[key]} {...props}></Cow>
        })}</>
};

export default CowHandler


/*


const dotenv = require("dotenv")
dotenv.config();

const cows = {}

let cow_id = 1;

const io = require('socket.io')(process.env.PORT, {
    cors: {
        origin: ["http://localhost:8000", "http://localhost:8080", "https://hackdavis.io"],
        credentials: true
    },
});

function clamp(num, min, max)
{
    return Math.min(max, Math.max(num, min));
}

io.on('connect', client => {
    console.log("connected " + client.id)

    client.emit('set id', {id: client.id})
    cows[client.id] = {name: `Cow ${cow_id++}`, pos: {x: Math.random(), y: Math.random()}}

    client.emit('sync cows', cows);

    client.on('move cow', (args) => 
    {
        console.log("move cow")
        console.log(args)
        if (args.pos == undefined || args.pos.y == undefined) {return;}
        if (cows[client.id] == undefined) {return;}

        cows[client.id].pos = {x: clamp(args.pos.x, 0, 1), y: clamp(args.pos.y, 0, 1)};
        io.emit('sync cow', {id: client.id, cow: cows[client.id]});
        console.log('sync')
    })

    client.on('disconnect', () => {
        delete cows[client.id];
        console.log("disconnect " + client.id);
    });
});

console.log("Listening on port " + process.env.PORT)












*/