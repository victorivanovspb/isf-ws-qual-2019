'use strict';

const WebSocket = require('ws');
const express = require('express');
const rand = require('./common');
const sequence = require('./sequence');

const app = express();
const port =  {
    http: 8081,
    ws: 8082
};
const wss = new WebSocket.Server({ port: port.ws });
const info = () => `Starting server at:\n - http://localhost:${ port.http }\n - ws://localhost:${ port.ws }`;

app.get('/', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(info());
    response.end();
});

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${ message }`);
    });

    const go = (sequence) => {
        const item = sequence.next();
        if (!item.done) {
            ws.send(JSON.stringify(item.value));
            setTimeout(() => go(sequence), rand.getRandomInt(500, 2500));
        } else {
            console.log('Done!');
        }
    };
    go(sequence.generateSequence());
});

console.log(info());
app.listen(port.http);
