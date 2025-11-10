function App() {
	return (
		<>
			<Greet name={'Dewansh'} />
		</>
	);
}

function Greet({ name }: { name: string }) {
	return (
		<div>
			<div>Hey {name}! </div>
			<div>Welcome home</div>
		</div>
	);
}

export default App;

