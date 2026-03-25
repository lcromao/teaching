// Conveção: Componentes em React ser eswcritos em PascalCase.
// Basicamente, um componente é uma função que retorna um elemento JSX. 
function PrimaryButton() {
	return <button>Click me</button>;
}

function Container() {
	return (
		// Usamos className em vez de class para evitar conflitos com JavaScript.
		<div className="">
			<h1>Meu Componente Container</h1>
			<p>Conteúdo do container</p>
		</div>
	);
}

