export default function Slide09() {
	return (
		<>
			<h1>Operador Ternário em JSX</h1>

			<div className="highlight">
				<p>
					<strong>Regra importante:</strong> Só podemos usar
					<strong> expressões</strong> dentro do JSX, ou seja, código que pode
					ser avaliado para resultar em um valor.
				</p>
				<p>
					Blocos if else, while, for, etc, não podem ser usados dentro do JSX.
				</p>
			</div>

			<h2>Podemos substituir o if else por um operador ternário:</h2>
			<pre>{`export default function App() {
  const tech = "JavaScript";
  const status = true;
  
  return (
    <div>
      <h1>{tech} is awesome!</h1>
      <h2>Current status: {status ? "ON" : "OFF"}</h2>
    </div>
  );
}`}</pre>
		</>
	);
}
