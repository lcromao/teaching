export default function Slide11() {
	return (
		<>
			<h1>Boa Prática</h1>

			<h2>Cada componente terá seu próprio arquivo</h2>

			<h2>Organização de pastas:</h2>
			<p>
				Vamos inserir os componentes na pasta <code>components/</code>
			</p>

			<div className="highlight">
				<p>
					Outra forma comum de organizar os componentes é colocá-los em pastas
					com o nome do componente e chamar o arquivo em si de
					<code> index.jsx</code>.
				</p>
				<p>
					Isso acontece porque é comum termos outros arquivos relacionados a um
					componente específico e faz sentido eles ficarem todos dentro da
					mesma pasta.
				</p>
				<p>
					No entanto, como não precisamos disso, podemos continuar sem usar
					pastas para cada componente.
				</p>
			</div>
		</>
	);
}
