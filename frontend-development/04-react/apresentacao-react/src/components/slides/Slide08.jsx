export default function Slide08() {
	return (
		<>
			<h1>Expressões em JSX</h1>

			<h2>Também podemos inserir expressões diretamente dentro das chaves</h2>
			<p>A expressão será avaliada e o resultado é exibido.</p>

			<h3>Exemplo - Operações matemáticas:</h3>
			<pre>{`export default function App() {
  const tech = "React";
  
  return (
    <div>
      <h1>{tech} is awesome!</h1>
      <h2>It's easy, like 1 + 1 is {1 + 1}</h2>
    </div>
  );
}`}</pre>

			<h3>Exemplo - Chamadas de funções:</h3>
			<pre>{`function sum(a, b) {
  return a + b;
}

export default function App() {
  return (
    <h2>1 + 1 is {sum(1, 1)}</h2>
  );
}`}</pre>
		</>
	);
}
