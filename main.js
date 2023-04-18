
// var fs = require("fs");
/* var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Program Ended"); */

/* fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
 });
 
 console.log("Program Ended"); */

 var events = require('events');

 var eventEmitter = new events.EventEmitter();

 // listener1
 var listener1 = () => {
    console.log('listener1 executed.');
 }

 // listener2
    var listener2 = () => {
    console.log('listener2 executed.');
    }

    // Bind the connection event with the listener1 function
    eventEmitter.addListener('connection', listener1);

    // Bind the connection event with the listener2 function
    eventEmitter.on('connection',listener2);

    var eventListeners = eventEmitter.listenerCount(eventEmitter, 'connection');

    console.log(eventListeners + ' Listener(s) listening to the connection event');

    // Fire the connection event
    eventEmitter.emit('connection');

    // Remove the binding of listener1 function
    eventEmitter.removeListener('connection', listener1);

    console.log('Listener1 will not listen now.');

    // Fire the connection event
    eventEmitter.emit('connection');

    console.log( __filename );

    console.log( __dirname );

    console.log('Program Ended');