# Compartilhamento de estado com useContext

E aí, programador! o/

Nessa aula você irá aprender o recurso mais avançado nativo do React para compartilhamento de estado entre componentes, a API de Contexto.

Esse recurso é composto de 3 partes importantes:

- a função que cria o contexto e o objeto de contexto que ela retorna
- o componente provedor (ou *provider*) do contexto
- o hook useContext, que permite obter os dados do contexto

Vamos ver na prática como usar cada uma dessas partes.

1. Crie um novo projeto Vite e remova todo o conteúdo desnecessário.
2. Crie o componente inicial App.jsx:
    
    ```jsx
    // Componente pai que provê o contexto
    const App = () => {
      const user = {
        name: 'João',
        email: 'joao@example.com',
      };
    
      return (
          <div>
            <h1>Aplicação</h1>
          </div>
      );
    };
    
    export default App;
    ```
    
3. Crie o arquivo “UserContext.js” que irá conter o contexto:
    
    ```jsx
    import { createContext } from "react";
    
    // Criação do contexto
    const UserContext = createContext();
    
    export default UserContext;
    ```
    
4. De posse do objeto do contexto, é preciso adicioná-lo a uma parte específica da aplicação (ou a ela toda). Para isso, coloque o componente Provider do contexto em volta de todos os componentes filhos que usarão os dados do contexto:
    
    Obs.: repare que precisamos passar um valor para o contexto, e é daqui que definimos as formas de interagir com esse contexto.
    
    ```jsx
    import UserContext from "./contexts/UserContext";
    
    // Componente pai que provê o contexto
    const App = () => {
      const user = {
        name: 'João',
        email: 'joao@example.com',
      };
    
      return (
        <UserContext.Provider value={user}>
          <div>
            <h1>Aplicação</h1>
          </div>
        </UserContext.Provider>
      );
    };
    
    export default App;
    ```
    
5. Para usar o contexto, crie o componente “UserInfo.jsx” e use o contexto com o hook useContext:
    
    ```jsx
    import { useContext } from "react";
    import UserContext from "../contexts/UserContext";
    
    // Componente que utiliza o contexto
    const UserInfo = () => {
      const user = useContext(UserContext);
    
      return (
        <div>
          <h2>Informações do Usuário:</h2>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      );
    };
    
    export default UserInfo;
    ```
    
6. Agora, para utilizá-lo de outra parte da aplicação, crie o componente “Header.jsx”:
    
    ```jsx
    import { useContext } from "react";
    import UserContext from "../contexts/UserContext";
    
    // Componente Header que utiliza o mesmo contexto
    const Header = () => {
      const user = useContext(UserContext);
    
      return (
        <header>
          <h3>Bem-vindo, {user.name}!</h3>
          <hr />
        </header>
      );
    };
    
    export default Header;
    ```
    
7. Por fim, inclua os componentes criados no App.jsx como filhos do Provider:
    
    ```jsx
    import Header from "./components/Header";
    import UserInfo from "./components/UserInfo";
    import UserContext from "./contexts/UserContext";
    
    // Componente pai que provê o contexto
    const App = () => {
      const user = {
        name: 'João',
        email: 'joao@example.com',
      };
    
      return (
        <UserContext.Provider value={user}>
          <div>
            <Header />
            <h1>Aplicação</h1>
            <UserInfo />
          </div>
        </UserContext.Provider>
      );
    };
    
    export default App;
    ```