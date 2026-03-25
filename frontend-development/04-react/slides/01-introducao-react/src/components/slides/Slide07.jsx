export default function Slide07() {
	return (
		<>
			<h1>Dados Dinâmicos</h1>

			<h2>Conceito</h2>
			<p>Dado que é determinado pelo próprio JavaScript</p>

			<h2>Como usar</h2>
			<p>
				Variáveis vem em par de <code>{"{}"}</code> e renderiza na página
			</p>

			<h2>Exemplo:</h2>
			<pre>{`export default function App() {
  const tech = "React";
  
  return (
    <div>
      <h1>{tech} is awesome!</h1>
    </div>
  );
}`}</pre>
		</>
	);
}
