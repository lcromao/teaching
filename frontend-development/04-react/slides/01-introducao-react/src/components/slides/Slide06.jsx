export default function Slide06() {
	return (
		<>
			<h1>VITE</h1>

			<h2>Conhecendo o Vite</h2>
			<ul>
				<li>
					Um servidor de desenvolvimento que trabalha com ESM para fornecer Hot
					Module Replacement (HMR)
				</li>
				<li>
					Um empacotador (Rollup) pré-configurado para gerar assets otimizados
					para produção
				</li>
			</ul>

			<h2>Vantagens</h2>
			<ul>
				<li>Mais rápido</li>
				<li>Mais simples</li>
			</ul>

			<h2>Criar um novo projeto é extremamente simples:</h2>
			<pre>npm create vite@latest</pre>

			<p>
				<strong>Configure o projeto para vanilla (JS puro)</strong>
			</p>
			<pre>npm dev/build</pre>
		</>
	);
}
