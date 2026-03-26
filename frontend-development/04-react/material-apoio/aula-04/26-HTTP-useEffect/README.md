# Requisições HTTP com useEffect

Nessa aula você irá treinar o uso do useEffect() com um exemplo um pouco mais realista, requisições HTTP no React.

1. Iremos continuar utilizando o mesmo projeto da aula anterior, mas primeiro iremos excluir todo o conteúdo do componente App.jsx.
2. Antes de prosseguir, vamos deixar o CSS preparado para termos um visual mais organizado. Adicione o seguinte código ao arquivo “index.css”:
    
    ```jsx
    * {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
    }
    
    .app {
      display: flex;
      gap: 2rem;
      padding: 1rem;
    }
    
    .pokemon {
      height: 30rem;
      width: 20rem;
      overflow-y: scroll;
    }
    
    .pokemon li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
      margin-right: 1rem;
    }
    
    .stat + .stat {
      margin-top: .5rem;
    }
    ```
    
3. A primeira coisa que precisamos é da função que irá realizar a chamada à API. Nessa aula eu irei usar a PokéAPI simplesmente por ser uma API popular e fácil de ser consumida. Crie a função que faz uma requisição e retorna a resposta:
    
    ```jsx
    async function fetchPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
      const data = await response.json()
      return data.results
    }
    
    function App() {
      return (
        <div className="app">
          <div>
            <h2>Pokémon</h2>
            
          </div>
        </div>
      )
    }
    
    export default App
    ```
    
4. Com a função pronta, precisamos chamá-la e guardar o seu valor em um estado, para que o componente inicie vazio, mas seja preenchido ao obter uma resposta. Repare que se fizermos isso diretamente dentro do componente teremos um loop infinito:
    
    Obs.: repare que a aplicação não acusa erro, mas uma rápida olhada no console irá mostrar as requisições sendo feitas continuamente.
    
    ```jsx
    import { useState } from "react"
    
    async function fetchPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
      const data = await response.json()
      return data.results
    }
    
    function App() {
      const [pokemon, setPokemon] = useState([])
    
      fetchPokemon().then(result => {
        console.log("Requisição realizada")
        console.log(result)
        setPokemon(result)
      })
    
      return (
        <div className="app">
          <div>
            <h2>Pokémon</h2>
            {JSON.stringify(pokemon)}
          </div>
        </div>
      )
    }
    
    export default App
    ```
    
5. Para resolver isso, uma saída comum e muito utilizada é o useEffect(). Podemos usar o useEffect() sem dependências para garantir que a função será executada apenas na primeira renderização. Como o useEffect() só é executado se as dependências mudarem, ele nunca mais será executado. Adicione o useEffect() e mova a chamada para dentro dele:
    
    ```jsx
    import { useEffect, useState } from "react"
    
    async function fetchPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
      const data = await response.json()
      return data.results
    }
    
    function App() {
      const [pokemon, setPokemon] = useState([])
    
      useEffect(() => {
        fetchPokemon().then(result => {
          console.log("Requisição realizada")
          console.log(result)
          setPokemon(result)
        })
      }, [])
    
      return (
    // ...
    ```
    
6. Agora adicione o código para exibir uma lista organizada de pokémon:
    
    ```jsx
    // ...
    
      return (
        <div className="app">
          <div>
            <h2>Pokémon</h2>
            <ul className="pokemon">
              {pokemon.map(mon => (
                <li key={mon.name}>
                  <span>{mon.name}</span>
                  <button>
                    Ver detalhes
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div >
      )
    }
    
    export default App
    ```