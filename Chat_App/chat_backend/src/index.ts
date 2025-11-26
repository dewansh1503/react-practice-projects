import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
	socket.onopen = (e) => {
		console.log(e);
	};
});
