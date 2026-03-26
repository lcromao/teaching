import { useEffect, useState } from "react";

// Função Assíncrona para buscar os pokémons na API com fetch e async/await
// Até então, nada de React, apenas JavaScript puro.
async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  return data.results;
}

export default function App() {
  const [pokemon, setPokemon] = useState([]);

  // Outro bom uso do useEffect é para realizar requisições HTTP, como buscar dados de uma API. O useEffect é ideal para isso, pois ele é executado após a renderização do componente, garantindo que a interface do usuário seja atualizada com os dados obtidos da API e executada somente na primeira renderização do componente, evitando requisições desnecessárias a cada atualização de estado ou props.
  useEffect(() => {
    fetchPokemon().then((result) => {
      console.log("Requisição realizada");
      console.log(result);
      setPokemon(result);
    });
    // O [] garante que o efeito seja executado apenas uma vez, na primeira renderização do componente, evitando um loop infinito de requisições. Se eu não passar o array, toda vez que o estado for atualizado, o useEffect é executado novamente, causando um loop infinito de requisições.
  }, []);

  return (
    <div className="app">
      <div>
        <h2>Pokémon</h2>

        <ul className="pokemon">
          {/* JSON.stringify(pokemon) */}
          {pokemon.map((mon) => (
            <li key={mon.name}>
              <span>{mon.name}</span>
              <button>Ver detalhes</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
