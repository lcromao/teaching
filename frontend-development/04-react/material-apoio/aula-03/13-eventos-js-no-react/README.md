# Usando Eventos do JavaScript no React

Nessa aula você vai ver como podemos acrescentar listeners de eventos no React, como fazemos normalmente através do .addEventListener() do JavaScript. No React esse processo é bem mais intuitivo e simples.

1. Vamos seguir utilizando o projeto com o componente Profile construído no exercício 3.
2. Usar eventos do JavaScript no React é simples, só precisamos definir uma prop de acordo com o evento que iremos ouvir e passar para ela a função a ser executada. Crie um evento “onClick” no botão de “Follow” ao lado do título:

  Obs.: repare que usamos camelCase para as props de eventos.

  ```jsx
  import LinkButton from "../LinkButton"
  import Title from "../Title"
  import ProfileSection from "./ProfileSection"
  import styles from "./styles.module.css"

  export default function Profile(props) {
    return (
      <div className={styles.container}>
        <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <span>{props.name}</span>
          <button onClick={() => alert("Você agora está seguindo!")}>Follow</button>
        </Title>
        <ProfileSection>{props.bio}</ProfileSection>
  // ...
  ```

3. Também podemos criar funções para esses eventos no nosso componente e então atribuir diretamente a função ao evento “onClick”:

  Obs.: repare que temos acesso ao parâmetro do evento que foi disparado.

  ```jsx
  // ...
  export default function Profile(props) {
    function handleClick(ev) {
      console.log(ev)
      alert("Você agora está seguindo!")
    }

    return (
      <div className={styles.container}>
        <img className={styles.avatar} src={props.avatar} alt={props.name} />
        <Title>
          <span>{props.name}</span>
          <button onClick={handleClick}>Follow</button>
        </Title>
        <ProfileSection>{props.bio}</ProfileSection>
  // ...
  ```

4. Por fim, vamos estilizar o botão de seguir porque o utilizaremos um pouco mais na próxima aula:

  ```jsx
  // ...
  <button className={styles.followButton} onClick={handleClick}>
    Follow
  </button>
  // ...
  ```

  ```jsx
  // ...
  .links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  .followButton {
    margin-left: 1rem;
    padding: .125rem .5rem;
  }
  ```

5. Dica final: Só coloque no seu componente o que é necessário, se não toda vez que o componente for renderizado, ele irá criar uma nova função para o evento, o que pode causar problemas de performance. Por isso, é recomendado criar a função do evento fora do JSX.