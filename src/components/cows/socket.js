import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import $ from "jquery";


const SocketHandler = (props) => {

    const [socket, setSocket] = useState(openSocket('http://localhost:8080'));

    socket.on('connect', () => 
    {
        console.log("connected")
    })

    socket.on('set id', (args) => 
    {
        props.setMyId(args.id);
    })

    socket.on('sync cows', (sync_cows) => 
    {
        props.setCows(sync_cows);
    })
  
    socket.on('sync cow', (args) => 
    {
        const cows_copy = JSON.parse(JSON.stringify(props.cows || {}));
        cows_copy[args.id] = args.cow;
        props.setCows(cows_copy);
    })

    useEffect(() => {

        $(window).on("click", function (e) {
            socket.emit('move cow', {
                pos: {x: e.pageX / $(window).width(), y: e.pageY / $(window).height()}
            })
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(window).off("click")
            socket.disconnect();
        }
    })

    return <></>
}

export default SocketHandler