import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import $ from "jquery";

const socket = openSocket('http://localhost:8080');


const SocketHandler = (props) => {

    useEffect(() => {

        $(window).on("click", function (e) {
            socket.emit('move cow', {
                pos: {x: e.pageX / $(window).width(), y: e.pageY / $(window).height()}
            })
        })

        socket.emit("useEffect_connected") // Tell server that we are ready on useEffect

        socket.on('connect', () => 
        {
            console.log("connected to cows!")
        })

        socket.on('set id', (args) => 
        {
            props.setMyId(args.id);
        })

        socket.on('sync cows', (sync_cows) => 
        {
            console.log('sync cows');
            console.log(sync_cows);
            props.SetCows(sync_cows);
        })
    
        socket.on('delete cow', (args) => 
        {
            props.RemoveCow(args.id)
        })
    
        socket.on('sync cow', (args) => 
        {
            props.AddCow(args.id, args.cow)
        })

        // Cleanup event handlers
        return () => {
            // clean up the event handler when the component unmounts
            $(window).off("click")
            socket.disconnect();
            socket.off('connect');
            socket.off('set id');
            socket.off('sync cows');
            socket.off('sync cow');


        }
    }, true)

return <></>
}

export default SocketHandler