# Você pode não precisar de um useEffect()


Nessa continuação da aula anterior vamos falar rapidamente sobre os cuidados ao usar o hook useEffect(). Esse hook é importante, porém ele serve para “quebrarmos” o funcionamento normal do React, e por isso ele deve ser usado com cuidado e somente quando for *realmente* necessário.

1. Seguindo no projeto da aula anterior, imagine que queremos agora mostrar os detalhes de um pokémon específico, o que é possível através de outra requisição à API. Um erro comum que já vi vários desenvolvedores cometendo é o seguinte:
    
    Obs.: o código jsx para exibir o pokémon individual não é o foco aqui, apenas o useEffect().
    
    ```jsx
    import { useEffect, useState } from "react"
    
    async function fetchPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
      const data = await response.json()
      return data.results
    }
    
    function App() {
      const [pokemon, setPokemon] = useState([])
      const [url, setUrl] = useState(null)
      const [pokemonShown, setPokemonShown] = useState(null)
    
      useEffect(() => {
        fetchPokemon().then(result => {
          console.log("Requisição realizada")
          console.log(result)
          setPokemon(result)
        })
      }, [])
    
      useEffect(() => {
        if (url) {
          fetch(url).then(res => res.json()).then(data => {
            console.log("pokemon encontrado")
            console.log(data)
            setPokemonShown(data)
          })
        }
      }, [url])
    
      return (
        <div className="app">
          <div>
            <h2>Pokémon</h2>
            <ul className="pokemon">
              {pokemon.map(mon => (
                <li key={mon.name}>
                  <span>{mon.name}</span>
                  <button onClick={() => setUrl(mon.url)}>
                    Ver detalhes
                  </button>
                </li>
              ))}
            </ul>
          </div>
    
          {pokemonShown && (
            <div>
              <h2>{pokemonShown.name}</h2>
              <img
                src={pokemonShown.sprites.front_default}
                alt=""
              />
              <div className="stat">
                <b>Tipo: </b>
                {pokemonShown.types.map(({ type }) => (
                  <span key={type.name}>{type.name} </span>
                ))}
              </div>
              <div className="stat">
                <b>Altura: </b>{pokemonShown.height / 10} m
              </div>
              <div className="stat">
                <b>Peso: </b>{pokemonShown.weight / 10} Kg
              </div>
              <div className="stat">
                <b>Atributos</b>
                <ul>
                  {pokemonShown.stats.map(({ base_stat, stat }) => (
                    <li key={stat.name}>
                      {stat.name}: {base_stat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="stat">
                <b>Habilidades</b>
                <ul>
                  {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                    <li key={ability.name}>
                      {ability.name}
                      {is_hidden && " (secreta)"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div >
      )
    }
    
    export default App
    ```
    
2. Talvez você esteja se perguntando qual é o problema com a implementação acima, afinal, ela parece funcionar bem. O problema são as montagens desnecessárias que estão acontecendo e o fato do useEffect() não estar sendo usado para o propósito correto dele. Nós não precisamos do useEffect para ter um “efeito colateral” da nossa própria aplicação atualizando e, na maioria das vezes, não precisamos do useEffect().
3. Ainda explicando esse ponto, no código acima, ao clicar em um botão temos uma montagem para atualizar o estado “url”, depois o useEffect acontece, gerando mais uma montagem ao atualizar o estado “pokemonShown”. Isso pode parecer pequeno aqui, mas em um componente maior e com muitos filhos pode gerar overhead e bugs.
4. Refatorando esse exemplo acima chegamos a um código muito melhor:
    
    Obs.: esse código agora causa menos renderizações e eliminamos um estado desnecessário (url) e também o próprio useEffect simplesmente ao usar um evento comum.
    
    ```jsx
    // ...
    function App() {
      const [pokemon, setPokemon] = useState([])
      const [pokemonShown, setPokemonShown] = useState(null)
    
      useEffect(() => {
        fetchPokemon().then(result => {
          console.log("Requisição realizada")
          console.log(result)
          setPokemon(result)
        })
      }, [])
    
      const showDetails = async (url) => {
        const data = await fetch(url).then(res => res.json())
        console.log(data)
        setPokemonShown(data)
      }
    
      return (
        <div className="app">
          <div>
            <h2>Pokémon</h2>
            <ul className="pokemon">
              {pokemon.map(mon => (
                <li key={mon.name}>
                  <span>{mon.name}</span>
                  <button onClick={() => showDetails(mon.url)}>
                    Ver detalhes
                  </button>
                </li>
              ))}
            </ul>
          </div>
    // ...
    ```
    
5. Neste nosso exemplo em específico é até possível se livrar completamente do useEffect(). Como sabemos que nosso array “pokemon” nunca deve estar vazio, podemos colocar a chamada ao fetchPokemon() dentro de uma condicional, assim ela não irá causar o loop infinito de renderizações. Apesar de ser uma chamada assíncrona, usamos o próprio mecanismo de estado do React para cuidar de tudo, afinal, ao chamar o “setPokemon” o componente já será renderizado novamente sem necessitar do useEffect:
    
    Obs.: **não são todos os casos em que você poderá fazer isso**. Se existisse a possibilidade da resposta da API ser um array vazio então cairíamos no mesmo problema do loop infinito de novo.
    
    ```jsx
    import { useState } from "react"
    
    async function fetchPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
      const data = await response.json()
      return data.results
    }
    
    function App() {
      const [pokemon, setPokemon] = useState([])
      const [pokemonShown, setPokemonShown] = useState(null)
    
      if (pokemon.length === 0) {
        fetchPokemon().then(result => {
          console.log("Requisição realizada")
          console.log(result)
          setPokemon(result)
        })
      }
    
      const showDetails = async (url) => {
        const data = await fetch(url).then(res => res.json())
        setPokemonShown(data)
      }
    
    // ...
    ```
    

```jsx
import { useEffect, useState } from "react"

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  const data = await response.json()
  return data.results
}

function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonShown, setPokemonShown] = useState(null)

  useEffect(() => {
    fetchPokemon().then(resuls => {
      console.log("state change")
      console.log(resuls)
      setPokemon(resuls)
    })
  }, [])

  const showDetails = async (url) => {
    const data = await fetch(url).then(res => res.json())
    console.log(data)
    setPokemonShown(data)
  }

  return (
    <div className="app">
      <div>
        <h2>Pokémon</h2>
        <ul className="pokemon">
          {pokemon.map(mon => (
            <li key={mon.name}>
              <span>{mon.name}</span>
              <button onClick={() => showDetails(mon.url)}>
                Ver detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
      {pokemonShown && (
        <div>
          <h2>{pokemonShown.name}</h2>
          <img
            src={pokemonShown.sprites.front_default}
            alt=""
          />
          <div className="stat">
            <b>Tipo: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>{pokemonShown.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>{pokemonShown.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul>
              {pokemonShown.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul>
              {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
```