function sum(a, b) {
	return a + b;
}

export default function App() {
	const tech = "JavaScript";
	const status = true;

	return (
		<div>
			<h1>{tech} is awesome!</h1>
			<h2>It's easy, like 1 + 1 is {sum(1, 1)}</h2>
			<h2>Current status: {status ? "ON" : "OFF"}</h2>{" "}
			{/* Ternary operator example */}
		</div>
	);
}
