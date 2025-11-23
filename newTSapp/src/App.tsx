import { useRef } from 'react';

function App() {
	const wsRef = useRef(new WebSocket('ws://localhost:8080'));
	const ws = wsRef.current;
	const inputref = useRef<HTMLInputElement>(null);

	ws.onmessage = (e) => {
		console.log('message from server:', e.data);
	};

	function sendMessage() {
		const message = inputref.current?.value.toString();
		if (message) ws.send(message);
	}

	return (
		<>
			<input type="text" ref={inputref} />
			<button onClick={sendMessage}>Send</button>
		</>
	);
}

export default App;

