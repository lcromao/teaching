export default function Slide05() {
	return (
		<>
			<h1>Componentes</h1>

			<div className="two-column-layout">
				<div>
					<h2>Conhecendo os Componentes do React</h2>
					<ul>
						<li>
							Componentes são os pequenos blocos que compõem uma interface
						</li>
						<li>
							Diferente do HTML tradicional, componentes definem pequenos
							blocos reutilizáveis e extensíveis
						</li>
						<li>Basicamente é uma função do JavaScript</li>
					</ul>

					<h2>Vantagens</h2>
					<ul>
						<li>
							Podem ser escritos uma vez e reutilizados várias vezes facilmente
						</li>
						<li>
							Tornam o processo de modificar uma parte específica muito mais
							fácil
						</li>
						<li>
							Deixam a estrutura mais organizada, com cada arquivo responsável
							por uma pequena parte
						</li>
					</ul>
				</div>
				<div className="image-container">
					<img
						src="https://miro.medium.com/v2/1*TdI0YTnpoB3mb6S-7NJrMw.jpeg"
						alt="React Components"
					/>
				</div>
			</div>
		</>
	);
}
