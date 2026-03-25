# Resolução do Exercício 3

1. Crie um projeto React com Vite e remova o conteúdo inicial desnecessário.
2. Crie em “src” uma pasta chamada “components” e, dentro dela, uma pasta “Profile” dois arquivos: “index.jsx” e “styles.module.css”.
3. No arquivo “index.jsx” crie o componente Profile contendo a estrutura básica do perfil, imagem, informações e links utilizando props para o valores dinâmicos:
    
    ```jsx
    export default function Profile(props) {
      return (
        <div>
          <img src={props.avatar} alt={props.name} />
          <h2>{props.name}</h2>
          <div>{props.bio}</div>
          <div>{props.phone}</div>
          <div>{props.email}</div>
          <div>
            <a href={props.githubUrl} target="_blank">GitHub</a>
            <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
            <a href={props.twitterUrl} target="_blank">Twitter</a>
          </div>
        </div>
      )
    }
    ```
    
4. No componente principal App.jsx importe o Profile e crie um perfil passando os valores das props:
    
    ```jsx
    import Profile from "./components/Profile";
    
    export default function App() {
      return (
        <div className="app">
          <Profile
            avatar="https://randomuser.me/api/portraits/men/75.jpg"
            name="John Doe"
            bio="Full-stack javascript developer at Acme Inc."
            email="john.doe@email.com"
            phone="+5511987654321"
            githubUrl="https://github.com"
            linkedinUrl="https://linkedin.com"
            twitterUrl="https://twitter.com"
          />
        </div>
      )
    }
    ```
    
5. Por fim, vamos adicionar a estilização usando CSS Modules:
    
    components/Profile/index.jsx
    
    ```jsx
    import styles from "./styles.module.css"
    
    export default function Profile(props) {
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <h2 className={styles.name}>{props.name}</h2>
          <div>{props.bio}</div>
          <div>{props.phone}</div>
          <div>{props.email}</div>
          <div className={styles.links}>
            <a href={props.githubUrl} target="_blank">GitHub</a>
            <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
            <a href={props.twitterUrl} target="_blank">Twitter</a>
          </div>
        </div>
      )
    }
    ```
    
    components/Profile/styles.module.css
    
    ```jsx
    .container {
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 4px 4px 16px -8px rgba(0, 0, 0, 0.25);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      text-align: center;
      width: fit-content;
    }
    .avatar {
      border-radius: 100%;
      box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.5);
      margin: 2rem 0 1rem;
    }
    .name {
      margin: 1rem;
    }
    .container>div {
      border-top: solid 1px rgb(66, 140, 209);
      padding: 1rem 2.5rem;
    }
    .links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    .links>a {
      background: rgb(66, 140, 209);
      background: linear-gradient(45deg, rgb(30, 112, 189) 10%, rgb(124, 212, 235) 100%);
      border-radius: .75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      color: #fff;
      font-weight: 700;
      padding: .625rem;
      position: relative;
      bottom: 0;
      text-decoration: none;
      transition: .2s;
      width: 10rem;
    }
    .links>a:hover {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      bottom: .25rem;
    }
    ```
    
    index.css
    
    ```jsx
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    .app {
      background-color: rgb(66, 140, 209);
      display: grid;
      place-content: center;
      min-height: 100vh;
    }
    ```
    
    main.jsx
    
    ```jsx
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App'
    import "./index.css"
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
    ```