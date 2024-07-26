import * as io from 'socket.io';
import {createServer} from 'http';
import * as express from 'express';
import {Express} from 'express';

const app: Express = express.default();
const server = createServer(app);
const ioServer = new io.Server(server, {path: '/io'});

ioServer.on('connection', (socket) => {
    console.log('connection received ' + socket.id);
    socket.on('disconnect', () => {
        console.log('disconnected: ' + socket.id);
    })

    socket.on('message', (data) => {
        console.log(`Received msg from (${socket.id}): `, data);
    })
})

app.get('/', (req, res) => {
    console.log(req.url);
    res.json({ts: new Date().toString()})
})
const PORT = (+(process.env.PORT as string)) || 3000;
server.listen(PORT, (process.env.BINDING_HOST as string ?? '127.0.0.1'), () => {
    console.log(`Listening on port ${PORT}`);
});

