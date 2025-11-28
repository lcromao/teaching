# Estilizando Componentes

E aí, programador! o/

Nessa aula você vai aprender algumas das diferentes formas de se estilizar um componente React. Existem muitas formas de trabalhar a estilização de um componente, por isso essa aula vai ser focada apenas nas mais simples, que não necessitam de nenhuma biblioteca e usam apenas CSS e o próprio React.

Vamos lá!

## Passo 1: CSS Tradicional

Continuaremos trabalhando no projeto das últimas aulas. A primeira forma, e talvez a mais simples, é utilizar o CSS tradicional. O Vite já vem configurado para entender arquivos CSS, então só precisamos criar um arquivo e importá-lo no JavaScript para que ele passe a funcionar.

## Passo 2: Criando estilos globais

Vamos começar aprendendo a usar estilos globais, ou seja, que se aplicam em todas as partes da aplicação. Dentro de "src", crie uma pasta "styles" e dentro dela um arquivo "globals.css" com o seguinte conteúdo:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
}

h1 {
  font-size: 3rem;
}

h2 {
  color: #f64348;
  font-size: 2rem;
}
```

## Passo 3: Importando o CSS no main.jsx

Agora vamos importar esse arquivo em "main.jsx". Por ser o arquivo principal que renderiza toda a aplicação os estilos estarão disponíveis globalmente:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles/globals.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Passo 4: Resultado

Com isso temos o arquivo CSS aplicado na página.

## Passo 5: Estilos inline

Agora vamos à segunda forma de estilização, os estilos _inline_. O React permite que estilizemos nossos elementos diretamente na declaração do componente usando o atributo **style**. Vamos mudar o visual da div principal do app dessa forma:

Obs.: repare que, como estamos na "terra" do JavaScript, seguimos as suas regras, então as **propriedades do CSS precisam usar camelCase, strings para os valores e serem separadas por vírgula**.

```jsx
import StatusText from "./components/StatusText"
import Subtitle from "./components/Subtitle"
import Title from "./components/Title"

export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#2c2c2d",
        display: "grid",
        minHeight: "100vh",
        placeContent: "center",
        textAlign: "center"
      }}
    >
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  )
}
```

## Passo 6: Estilizando o componente Title

Para praticar, vamos estilizar também o componente "Title.jsx":

```jsx
export default function Title() {
  const tech = "React"
  return <h1 style={{ color: "#e5e5e5" }}>{tech} is awesome!</h1>
}
```

## Passo 7: Estilizando o componente Subtitle

E agora o componente "Subtitle.jsx":

Obs.: repare que os estilos inline tem **prioridade sobre os estilos globais**.

Obs²: repare também que os estilos inline **se limitam ao escopo do componente**, não sendo aplicados ao outro elemento h2 da página.

```jsx
const Subtitle = () => (
  <h2
    style={{ color: "#e5e5e5" }}
  >
    It's easy, like 1 + 1 is {1 + 1}
  </h2>
)

export default Subtitle
```

## Passo 8: Estilizando com valores dinâmicos

Por fim, vamos estilizar o componente "StatusText.jsx" e ver como definir estilos baseados em valores do JavaScript. Se o status for verdadeiro a cor deve ser verde e se for falso deve ser vermelho:

```jsx
export default () => {
  const status = true
  return (
    <h2
      style={{
        color: status ? "#00ff9f" : "#f64348"
      }}
    >
      Current status: {status ? "ON" : "OFF"}
    </h2>
  )
}
```

## Passo 9: Resumo dos estilos inline

E é assim que utilizamos os estilos _inline_.

## Passo 10: CSS Modules

A última forma que vamos ver será através dos CSS Modules. CSS Modules são arquivos css especiais, com nome no formato "**.module.css**" e que podem ser importados como módulos dentro do JavaScript. A partir daí podemos usá-los como um objeto javascript no nosso código.

## Passo 11: Criando o arquivo CSS Module

Vamos criar o arquivo "App.module.css" na pasta "src". Dentro dele escreveremos CSS normalmente, aplicando os mesmos estilos que aplicamos ao componente anteriormente:

```css
.app {
  background-color: #2c2c2d;
  display: grid;
  min-height: 100vh;
  place-content: center;
  text-align: center;
}
```

## Passo 12: Usando o CSS Module no componente

Agora usamos esses estilos dentro do arquivo JSX como um módulo do JavaScript:

```jsx
import StatusText from "./components/StatusText"
import Subtitle from "./components/Subtitle"
import Title from "./components/Title"
import styles from "./App.module.css"

export default function App() {
  return (
    <div className={styles.app}>
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  )
}
```

## Passo 13: Vantagens dos CSS Modules

Usando os CSS Modules conseguimos separar a estilização do resto do componente, deixando nosso código bem mais organizado, porém sem perder as vantagens de interagir com os estilos usando JavaScript de forma facilitada.

---
