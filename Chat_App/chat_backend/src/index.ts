import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
	console.log('client connected');

	socket.on('message', (e) => {
		wss.clients.forEach((c) => c.send(e.toString()));
		// console.log(e.toString());
	});
});
