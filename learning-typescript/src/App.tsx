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

type noteProp = {
	place: string;
};
function Note({ place }: noteProp) {
	return (
		<>
			<h1>Welcome {place}</h1>
		</>
	);
}

export default App;

