# Reutilizando Componentes

1. Os componentes do React existem justamente para serem reutilizados, para isso só precisamos colocá-lo múltiplas vezes no JSX. No arquivo `App.jsx`, adicione mais alguns cards:

```jsx
import Card from "./components/Card"

export default function App() {
  return (
    <>
      <h1>Exercício 2</h1>
      <Card />
      <Card />
      <Card />
    </>
  )
}
```

2. Seguindo essa ideia de componentização e reutilização de componentes, podemos criar também um componente `Button` dentro da pasta `components`:

`components/Button/index.jsx`

```jsx
import styles from "./styles.module.css"

export default function Button() {
  return <button className={styles.wrapper}>Comprar agora</button>
}
```

`components/Button/styles.module.css`

```css
.wrapper {
  background-color: #121212;
  border: 0;
  border-radius: .5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 1rem;
  margin-top: 2rem;
  padding: .75em 1.25em;
  transition: .3s;
}

.wrapper:hover {
  cursor: pointer;
  margin-left: .5rem;
}
```

3. Esse componente passa a poder ser reutilizável em toda a aplicação sempre que quisermos. Por exemplo, podemos importar o `Button` no `Card` e utilizá-lo:

```jsx
import posterImg from "../../assets/sw-poster.jpg"
import Button from "../Button"
import styles from "./styles.module.css"

export default function Card() {
  return (
    <div className={styles.container}>
      <img className={styles.poster} src={posterImg} alt="Star Wars poster" />
      <div>
        <h2>Pôster do filme Star Wars</h2>
        <p>Um pôster decorativo épico do filme Star Wars, com moldura de MDF e tamanho A3. Uma ótima recordação de um dos mais icônicos filmes de todos os tempos. Este clássico pôster trará aventura, nostalgia e a magia de Star Wars para qualquer lugar que você decidir pendurar. Não perca a chance de adicionar essa linda memória ao seu acervo!</p>
        <Button />
      </div>
    </div>
  )
}
```

Apenas fazendo isso nós já conseguimos reutilizar nosso componente em qualquer lugar. Poderíamos inclusive reutilizá-lo em outros componentes.

Mas temos um problema aqui, eles ainda são exatamente iguais. Isso ajuda quando temos componentes simples que se repetem, mas em um cenário real precisaremos ser capazes de mudar o conteúdo de cada instância do componente. E é justamente isso que vamos aprender na próxima aula (props).
