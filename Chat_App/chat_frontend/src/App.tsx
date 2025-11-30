import { useRef } from 'react';

function App() {
	const soc = useRef(new WebSocket('ws://localhost:8080'));
	const socket = soc.current;
	socket.onmessage = (e) => {
		console.log(e.data);
	};

	function connect() {
		socket.send(
			JSON.stringify({
				roomId: '123',
				type: 'join',
			})
		);
	}
	function send() {
		socket.send(
			JSON.stringify({
				roomId: '123',
				type: 'message',
				message: 'message from client' + Math.random(),
			})
		);
	}
	return (
		<>
			<button onClick={connect}> Connect</button>
			<button onClick={send}> Send message</button>
		</>
	);
}

export default App;

