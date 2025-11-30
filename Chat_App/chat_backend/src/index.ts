import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

type Connect = {
	[roomId: string]: WebSocket[];
};
let connections: Connect = {};

interface Message {
	type: 'join' | 'message';
	roomId: string;
	message?: string;
}

wss.on('connection', (socket) => {
	// console.log('client connected');
	socket.send('connected to server');
	socket.on('message', (msg) => {
		const message: Message = JSON.parse(msg.toString());

		if (message.type === 'join') {
			if (message.roomId in connections) {
				connections[message.roomId]?.push(socket);
			} else {
				connections[message.roomId] = [socket];
			}
		} else if (message.type === 'message') {
			connections[message.roomId]?.forEach((s) => {
				if (message.message) s.send(message.message);
			});
		}
		console.log(connections);
	});
});
