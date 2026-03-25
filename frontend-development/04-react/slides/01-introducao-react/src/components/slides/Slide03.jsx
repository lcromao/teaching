export default function Slide03() {
	return (
		<>
			<h1>Virtual DOM</h1>

			<h2>Conhecendo o Virtual DOM</h2>
			<p>
				O Virtual DOM é uma representação virtual da estrutura HTML da página
			</p>

			<h2>O problema das atualizações na interface</h2>
			<p>Atualizar o DOM real diretamente é lento e ineficiente</p>

			<h2>A solução do React: o Virtual DOM</h2>
			<div className="highlight">
				<p>
					<strong>
						Uma cópia virtual do DOM onde fazemos todas as nossas alterações na
						interface
					</strong>
				</p>
				<p>
					O React então compara o DOM virtual com o DOM real e renderiza
					novamente todas as partes que mudaram
				</p>
			</div>

			<h3>Problemas de performance?</h3>
			<p>
				Contra-intuitivamente não, o HTML re-renderizar
				<strong> ajudou</strong>
			</p>
		</>
	);
}
