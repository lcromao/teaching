export default function Slide10() {
	return (
		<>
			<h1>Separando em Componentes</h1>

			<h2>Vamos separar elementos da página em componentes</h2>

			<pre>{`function sum(a, b) {
  return a + b;
}

function Title() {
  const tech = "JavaScript";
  return <h1>{tech} is awesome!</h1>;
}

export default function App() {
  const status = true;
  
  return (
    <div>
      <Title /> {/* Basta incluir como HTML */}
      <h2>It's easy, like 1 + 1 is {sum(1, 1)}</h2>
      <h2>Current status: {status ? "ON" : "OFF"}</h2>
    </div>
  );
}`}</pre>
		</>
	);
}
