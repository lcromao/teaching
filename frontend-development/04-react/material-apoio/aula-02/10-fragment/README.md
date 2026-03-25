# Conhecendo o Fragment

Aqui você vai aprender a usar o Fragment, um componente muito útil do próprio React.

1. Como o Fragment é bem simples vamos usá-lo no projeto do exercício que acabamos de resolver para ganhar tempo.

2. Os componentes do React possuem uma regra muito importante: **o JSX retornado deve sempre possuir um único componente pai**, ou seja, temos que sempre retornar um componente ou tag “em volta” de todos os outros, não podemos retornar dois elementos separados. Por exemplo, o código a seguir lançaria um erro imediatamente:

```jsx
import Card from "./components/Card"

export default function App() {
	return (
		<h1>Exercício 2</h1>
		<Card />
	)
}
```

3. Por isso sempre colocamos um elemento qualquer como pai de todos os outros:

```jsx
import Card from "./components/Card"

export default function App() {
	return (
		<div>
			<h1>Exercício 2</h1>
			<Card />
		</div>
	)
}
```

4. Mas isso pode acabar gerando um problema, o acúmulo de tags `<div>` (ou qualquer outra) desnecessárias em nosso HTML. Para resolver isso o React possui o Fragment. Ele é um componente que, ao ser renderizado, desaparece do HTML:

Obs.: repare que ao abrir o DevTools na aba de Elementos temos o `<h1>` e o `<Card>` diretamente dentro da `<div id="root">`.

```jsx
import Card from "./components/Card"
import { Fragment } from "react"

export default function App() {
	return (
		<Fragment>
			<h1>Exercício 2</h1>
			<Card />
		</Fragment>
	)
}
```

5. Esse é um componente tão útil do React que nas versões mais recentes o seu uso foi facilitado através de um “atalho”. Agora, para usarmos o Fragment não precisamos nem mesmo importá-lo, basta usar uma tag vazia:

```jsx
import Card from "./components/Card"

export default function App() {
	return (
		<>
			<h1>Exercício 2</h1>
			<Card />
		</>
	)
}
```

6. Repare que agora temos o mesmo efeito de forma muito mais fácil. Com isso podemos respeitar a regra do JSX sem poluir o nosso HTML de uma forma super simples.
