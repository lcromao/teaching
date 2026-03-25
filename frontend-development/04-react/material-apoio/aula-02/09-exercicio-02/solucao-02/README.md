# Resolução do Exercício 2

1. Comece criando um novo projeto e removendo tudo que não será necessário do Vite.
2. Antes de passar para o código, copie a imagem do card para a pasta "assets" dentro de "src".
3. Adicione alguns estilos globais para reescrever os estilos do navegador. Crie a pasta "styles" e dentro dela o arquivo "globals.css":

```css
* {
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
}
```

4. Inclua o arquivo "globals.css" em "main.jsx":

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

5. Prepare o arquivo "App.jsx" para receber o componente Card:

```jsx
import Card from "./components/Card"

export default function App() {
  return (
    <div>
      <Card />
    </div>
  )
}
```

6. Agora crie a pasta "components" e dentro dela uma pasta "Card". Na pasta "Card" crie os arquivos "index.jsx" e "styles.module.css". No arquivo "index.jsx" adicione a estrutura do card, a imagem e o arquivo de estilos:

Obs.: repare que aqui estamos usando uma técnica diferente para incluir imagens, o Vite já vem preparado *out-of-the-box* para permitir a importação de imagens.

```jsx
import posterImg from "../../assets/sw-poster.jpg"
import styles from "./styles.module.css"

export default function Card() {
  return (
    <div className={styles.container}>
      <img className={styles.poster} src={posterImg} alt="Star Wars poster" />
      <div>
        <h2 className={styles.title}>Pôster do filme Star Wars</h2>
        <p className={styles.description}>Um pôster decorativo épico do filme Star Wars, com moldura de MDF e tamanho A3. Uma ótima recordação de um dos mais icônicos filmes de todos os tempos. Este clássico pôster trará aventura, nostalgia e a magia de Star Wars para qualquer lugar que você decidir pendurar. Não perca a chance de adicionar essa linda memória ao seu acervo!</p>
        <button className={styles.button}>Comprar agora</button>
      </div>
    </div>
  )
}
```

7. Por fim, adicione os estilos do card no arquivo "styles.module.css":

```css
.container {
  background-color: #d7e1e7;
  border-radius: 1rem;
  display: flex;
  gap: 4rem;
  height: 30rem;
  margin: 0 auto;
  padding: 4rem;
  width: 50rem;
}

.poster {
  border: 8px solid #000;
  box-shadow: 0 24px 32px -16px rgba(0, 0, 0, 0.4);
}

.title {
  font-size: 1.75rem;
}

.description {
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 2rem;
}

.button {
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

.button:hover {
  cursor: pointer;
  margin-left: .5rem;
}
```

## Como executar

```bash
npm install
npm run dev
```
