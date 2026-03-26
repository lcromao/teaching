import { useEffect, useState } from "react";

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  return data.results;
}

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonShown, setPokemonShown] = useState(null);

  // Outra forma, if (pokemon.length === 0) { fetchPokemon().then(setPokemon); }
  // Sem necessidade de useEffect.
  useEffect(() => {
    fetchPokemon().then((results) => {
      console.log("state change");
      console.log(results);
      setPokemon(results);
    });
  }, []);

  const showDetails = async (url) => {
    const data = await fetch(url).then((res) => res.json());
    console.log(data);
    setPokemonShown(data);
  };

  return (
    <div className="app">
      <div>
        <h2>Pokémon</h2>

        <ul className="pokemon">
          {pokemon.map((mon) => (
            <li key={mon.name}>
              <span>{mon.name}</span>
              {/* Basta chamar a API dentro do evento e não criar outro useEffect */}
              <button onClick={() => showDetails(mon.url)}>Ver detalhes</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Se o Pokemon show existir, rederizo o código abaixo... */}
      {pokemonShown && (
        <div>
          <h2>{pokemonShown.name}</h2>
          <img src={pokemonShown.sprites.front_default} alt="" />

          <div className="stat">
            <b>Tipo: </b>
            {pokemonShown.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>

          <div className="stat">
            <b>Altura: </b>
            {pokemonShown.height / 10} m
          </div>

          <div className="stat">
            <b>Peso: </b>
            {pokemonShown.weight / 10} Kg
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
  );
}
