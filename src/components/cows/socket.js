import openSocket from 'socket.io-client';
console.log("hello from above")

function subscribeToTimer() {
    console.log("subscribe")
    const socket = openSocket('http://localhost:8080');
    
    socket.on('connect', () => 
    {
        console.log("connected")
    })
  
    socket.on('hello', () => console.log("got hello"));
    socket.emit('hello');
}

export { subscribeToTimer };