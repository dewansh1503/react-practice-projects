function App() {
	return (
		<>
			<Greet name={'Dewansh'} />
		</>
	);
}

function Greet({ name }: { name: string }) {
	return <div>{name}</div>;
}

export default App;

