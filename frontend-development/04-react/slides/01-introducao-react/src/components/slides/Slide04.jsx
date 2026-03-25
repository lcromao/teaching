export default function Slide04() {
	return (
		<>
			<h1>JSX</h1>

			<h2>Conhecendo o JSX</h2>
			<ul>
				<li>JSX é uma extensão da linguagem JavaScript</li>
				<li>
					Não é entendido pelo navegador, deve ser compilado (pelo Babel, por
					exemplo)
				</li>
				<li>
					É o formato usado pelo React para representar os elementos do DOM
				</li>
			</ul>

			<h2>Facilita o processo de escrita do conteúdo</h2>
			<p>Permite escrever estrutura HTML diretamente no código JavaScript</p>

			<div className="highlight">
				<p>
					<strong>Dica:</strong> Crie um index.jsx como ponto de partida
				</p>
			</div>

			<p>
				<strong>Importante:</strong> Formato jsx não é obrigatório, é permitido
				trabalhar como .js
			</p>
		</>
	);
}
