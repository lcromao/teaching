# O que são e como usar as "props"

Agora vai conhecer um recurso muito importante do React: as *props*. Elas nos permitem passar argumentos para os nossos componentes, tornando-os mais flexíveis e dinâmicos, o que facilita a sua reutilização.

1. Para isso vamos seguir utilizando o projeto do Card que criamos no Exercício 2. Atualmente temos 3 cards iguais na tela e queremos customizá-los para que sejam diferentes sem que precisemos criar componentes novos.

2. Vá até o arquivo `index.jsx` do componente `Card` e acrescente um parâmetro à função chamado `props`:

```jsx
// ...
export default function Card(props) {
	return (
		// ...
	)
}
```

Obs.: por ser um parâmetro, ele pode ter outro nome, mas o mais comum é `props`.

3. Esse primeiro parâmetro é padrão em todos os componentes React e representa um objeto contendo todos os atributos passados na declaração do componente no JSX. Ou seja, assim como passamos atributos para elementos HTML, nossos componentes também recebem atributos (props) que podem ser usados dentro do componente.

4. Agora, no arquivo `App.jsx`, informe um título dinâmico para cada `Card` declarado:

```jsx
import Card from "./components/Card"

export default function App() {
	return (
		<>
			<h1>Exercício 2</h1>
			<Card title="Pôster: Star Wars (1977)" />
			<Card title="Pôster: Empire Strikes Back (1980)" />
			<Card title="Pôster: Return of the Jedi (1983)" />
		</>
	)
}
```

5. No componente `Card` use a prop `title` no lugar do título hard-coded:

```jsx
import posterImg from "../../assets/sw-poster.jpg"
import styles from "./styles.module.css"

export default function Card(props) {
	return (
		<div className={styles.container}>
			<img className={styles.poster} src={posterImg} alt="Star Wars poster" />
			<div>
				<h2 className={styles.title}>{props.title}</h2>
				<p className={styles.description}>Um pôster decorativo épico do filme Star Wars, com moldura de MDF e tamanho A3. Uma ótima recordação de um dos mais icônicos filmes de todos os tempos.</p>
				<button className={styles.button}>Comprar agora</button>
			</div>
		</div>
	)
}
```

6. Vamos praticar mais: passe novas imagens como props. Primeiro, importe as imagens em `App.jsx` e passe-as como prop `poster` nos `Card`:

```jsx
import Card from "./components/Card"
import swPosterImg from "./assets/sw-poster.jpg"
import esbPosterImg from "./assets/esb-poster.jpg"
import rotjPosterImg from "./assets/rotj-poster.jpg"

export default function App() {
	return (
		<>
			<h1>Exercício 2</h1>
			<Card title="Pôster: Star Wars (1977)" poster={swPosterImg} />
			<Card title="Pôster: Empire Strikes Back (1980)" poster={esbPosterImg} />
			<Card title="Pôster: Return of the Jedi (1983)" poster={rotjPosterImg} />
		</>
	)
}
```

7. Substitua o conteúdo fixo do `Card` pelo valor de `props.poster`:

```jsx
import styles from "./styles.module.css"

export default function Card(props) {
	return (
		<div className={styles.container}>
			<img className={styles.poster} src={props.poster} alt={props.title} />
			<div>
				<h2 className={styles.title}>{props.title}</h2>
				<p className={styles.description}>Um pôster decorativo épico do filme.</p>
				<button className={styles.button}>Comprar agora</button>
			</div>
		</div>
	)
}
```

8. Um último detalhe: é comum desestruturar esse primeiro parâmetro para obter as props diretamente, evitando `props.` constantemente:

```jsx
import styles from "./styles.module.css"

export default function Card({ title, poster }) {
	return (
		<div className={styles.container}>
			<img className={styles.poster} src={poster} alt={title} />
			<div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>Um pôster decorativo épico do filme.</p>
				<button className={styles.button}>Comprar agora</button>
			</div>
		</div>
	)
}
```

---

Com isso você deixa o `Card` reutilizável e totalmente configurável a partir do `App.jsx` — na próxima aula veremos detalhes sobre como passar valores adicionais, callbacks e validação de props.

