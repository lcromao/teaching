# Renderizando listas de dados

Nessa aula você irá aprender a mostrar listas de dados na tela, algo muito utilizado no dia-a-dia.

1. Nessa aula vamos utilizar um novo projeto, então vamos comece criando um novo projeto React com o Vite.
    
    ```jsx
    npm create vite@latest
    cd listas-de-dados
    npm install
    code .
    npm run dev
    ```
    
2. Depois de criar um novo projeto vamos remover tudo que não precisamos e deixar apenas o componente App.jsx. Nele vamos criar uma lista de dados qualquer:
    
    ```jsx
    const games = [
      {
        "id": 1,
        "coverImage": "https://i.pinimg.com/originals/d0/8b/bd/d08bbd23315fa7a430d2d6ff2575339e.jpg",
        "title": "Super Mario Bros",
        "releaseYear": 1985,
        "description": "A classic platformer game."
      },
      {
        "id": 2,
        "coverImage": "https://cdn.mobygames.com/covers/4857336-the-legend-of-zelda-nes-front-cover.jpg",
        "title": "The Legend of Zelda",
        "releaseYear": 1986,
        "description": "A top-down adventure game."
      },
      {
        "id": 3,
        "coverImage": "https://www.hellandheavennet.com/files/final-fantasy/box-nes-us-1.jpg",
        "title": "Final Fantasy",
        "releaseYear": 1987,
        "description": "A classic role-playing game."
      },
      {
        "id": 4,
        "coverImage": "https://gamefaqs.gamespot.com/a/box/0/3/4/3034_front.jpg",
        "title": "Doom",
        "releaseYear": 1993,
        "description": "A first-person shooter game."
      },
      {
        "id": 5,
        "coverImage": "https://cdn.mobygames.com/covers/4056006-warcraft-orcs-humans-dos-front-cover.jpg",
        "title": "Warcraft",
        "releaseYear": 1994,
        "description": "A real-time strategy game."
      },
      {
        "id": 6,
        "coverImage": "https://cdn.mobygames.com/covers/5346152-starcraft-windows-front-cover.jpg",
        "title": "Starcraft",
        "releaseYear": 1998,
        "description": "A military science fiction game."
      },
      {
        "id": 7,
        "coverImage": "https://i.pinimg.com/originals/a0/d0/9c/a0d09c9cd3eb770f8f83e23744da72fc.jpg",
        "title": "Half-Life",
        "releaseYear": 1998,
        "description": "A first-person shooter game."
      },
      {
        "id": 8,
        "coverImage": "http://media.ign.com/games/image/object/002/002226/Gran-Turismo-1_PS1_US_BOX.jpg",
        "title": "Gran Turismo",
        "releaseYear": 1998,
        "description": "A driving/racing simulator game."
      },
      {
        "id": 9,
        "coverImage": "https://cdn.mobygames.com/covers/3966925-halo-combat-evolved-xbox-front-cover.jpg",
        "title": "Halo",
        "releaseYear": 2001,
        "description": "A military science fiction shooter game."
      },
      {
        "id": 10,
        "coverImage": "http://s.emuparadise.org/fup/up/150757-Kingdom_Hearts_(USA)-1.jpg",
        "title": "Kingdom Hearts",
        "releaseYear": 2002,
        "description": "An action-based role-playing game with Disney and Final Fantasy characters."
      }
    ]
    
    function App() {
      return (
        <div className="app">
          <h1>Meus Jogos</h1>
    
        </div>
      )
    }
    
    export default App
    ```
    
3. Para exibir os dados de uma lista só precisamos ter um array de componentes jsx válidos. Para exemplificar vamos criar uma lista a parte:
    
    ```jsx
    // ...
      {
        "id": 10,
        "coverImage": "http://s.emuparadise.org/fup/up/150757-Kingdom_Hearts_(USA)-1.jpg",
        "title": "Kingdom Hearts",
        "releaseYear": 2002,
        "description": "An action-based role-playing game with Disney and Final Fantasy characters."
      }
    ]
    
    let gamesComponents = []
    
    games.forEach((game) => {
      gamesComponents.push(<h2>{game.title}</h2>)
    })
    
    function App() {
      return (
        <div className="app">
          <h1>Meus Jogos</h1>
          {gamesComponents}
        </div>
      )
    }
    
    export default App
    ```
    
4. Mas no React, por uma questão de praticidade, utilizamos muito o método **.map()** para isso, afinal ele serve para fazer exatamente o que precisamos, transformar elementos de um array. No nosso caso, iremos transformar o array de jogos em um array de componentes, sendo um componente para cada jogo. Fazemos isso diretamente dentro do jsx:
    
    ```jsx
    // ...
    function App() {
      return (
        <div>
          <h1>Meus Jogos</h1>
          <div>
            {games.map((game) => {
              return (
                <div>
                  <img src={game.coverImage} alt={game.title} />
                  <h2>{game.title} ({game.releaseYear})</h2>
                  <p>{game.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    
    export default App
    ```
    
5. Outra prática comum é encurtar a arrow function usando o retorno implícito:
    
    ```jsx
    // ...
    function App() {
      return (
        <div>
          <h1>Meus Jogos</h1>
          <div>
            {games.map((game) => (
              <div>
                <img src={game.coverImage} alt={game.title} />
                <h2>{game.title} ({game.releaseYear})</h2>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    export default App
    ```
    
6. Podemos acrescentar um pouco de estilização para visualizar melhor os dados:
    
    ```jsx
    function App() {
      return (
        <div style={{ padding: "0 4rem 4rem"}}>
          <h1>Meus Jogos</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>
            {games.map((game) => {
              return (
                <div>
    							<img
    	              src={game.coverImage}
    	              alt={game.title}
    	              style={{ height: "30rem", width: "20rem", objectFit: "cover" }}
    	            />
                  <h2>{game.title} ({game.releaseYear})</h2>
                  <p>{game.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    
    export default App
    ```
    
7. Quase tudo pronto. Nossa lista já está ok, porém, se você olhar o console do navegador, verá que há um aviso lá. Esse aviso nos diz que cada componente filho em uma lista deve ter uma propriedade **key** que deve ser única. Essa propriedade é muito importante no React para que ele consiga identificar qual componente está associado a qual item do array, o que é especialmente útil quando nós mudamos os itens do array (através de filtrar, ordenar, acrescentar, etc).
8. Para resolver esse último ponto, acrescente a propriedade key. O identificador único aqui será o “id” de cada jogo:
    
    ```jsx
    // ...
    function App() {
      return (
        <div style={{ padding: "0 5rem 5rem" }}>
          <h1>Meus Jogos</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5rem" }}>
            {games.map((game) => (
              <div key={game.id}>
                <img
                  src={game.coverImage}
                  alt={game.title}
                  style={{ height: "30rem", width: "20rem", objectFit: "cover" }}
                />
                <h2>{game.title} ({game.releaseYear})</h2>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    export default App
    ```