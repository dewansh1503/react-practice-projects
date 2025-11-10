function App() {
	return (
		<>
			<Greet name={'Dewansh'} />
			<Note place={'home'} />
		</>
	);
}

function Greet({ name }: { name: string }) {
	return (
		<div>
			<div>Hey {name}! </div>
		</div>
	);
}

function Note({ place }) {
	return (
		<>
			<h1>Welcome {place}</h1>
		</>
	);
}

export default App;

