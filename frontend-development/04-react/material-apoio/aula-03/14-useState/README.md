# O que é e para que serve o “state”

Nessa aula você vai conhecer um dos conceitos mais importantes do React, o **state**. Esse recurso nos permite ter informações na tela que são renderizadas e atualizadas dinamicamente de acordo com a mudança dos nossos valores no JavaScript. Vamos passar para a prática e você irá entender exatamente do que se trata e para que utilizamos ele.

1. Assim como nas aulas anteriores, também iremos utilizar o projeto do exercício 3 aqui.
2. Imagine que queremos ter um texto dinâmico no botão de seguir para que ele mude de “Follow” para “Following” assim que clicarmos pela primeira vez. Poderíamos tentar começar fazendo o seguinte:
    
    ```jsx
    // ...
    export default function Profile(props) {
      let followButtonText = "Follow"
    
      function handleClick(ev) {
        alert("Você agora está seguindo!")
        followButtonText = "Following"
        console.log({ followButtonText })
      }
    
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <Title>
            <span>{props.name}</span>
            <button
              className={styles.followButton}
              onClick={handleClick}
            >
              {followButtonText}
            </button>
          </Title>
    // ...
    ```
    
3. Repare que ao fazermos isso temos o valor da variável no botão e conseguimos até modificá-lo na memória, o que pode ser visto através do console.log, no entanto, o que está na tela continua sendo o texto inicial “Follow”.
Isso acontece por conta da forma como o React monta os seus componentes. Alterações feitas na memória, de forma virtual, não refletem no DOM real. A menos que utilizemos o recurso do **state.**
4. O state, ou estado, é o recurso do React usado para refletir as nossas mudanças virtuais no DOM real. Quando criamos um state, o React nos dá acesso a duas coisas: uma variável imutável que contém o seu valor atual e uma função que serve para mudar o valor da variável.
5. Para usar o state só precisamos utilizar a função “useState”. Ela ainda aceita como parâmetro o valor inicial, caso queiramos defini-lo:
    
    ```jsx
    import { useState } from "react"
    
    // ...
    
    export default function Profile(props) {
      const state = useState("Follow")
      console.log(state)
    
      function handleClick(ev) {
        alert("Você agora está seguindo!")
      }
    
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <Title>
            <span>{props.name}</span>
            <button
              className={styles.followButton}
              onClick={handleClick}
            >
              {state[0]}
            </button>
    // ...
    ```
    
6. Repare que o state é uma tupla (array de tamanho fixo) de dois elementos, o valor e o modificador. O React trabalha dessa forma para que possamos renomear esses elementos através de desestruturação. Com isso, forma comum de utilizarmos o state é a seguinte:
    
    Obs.: uma convenção importante para se atentar aqui é o prefixo “set” + o nome da variável para a função modificadora, você pode usar o nome que quiser, mas a comunidade React inteira segue essa convenção.
    
    ```jsx
    // ...
    export default function Profile(props) {
      const [followText, setFollowText] = useState("Follow")
    
      function handleClick(ev) {
        alert("Você agora está seguindo!")
      }
    
      return (
        <div className={styles.container}>
          <img className={styles.avatar} src={props.avatar} alt={props.name} />
          <Title>
            <span>{props.name}</span>
            <button
              className={styles.followButton}
              onClick={handleClick}
            >
              {followText}
            </button>
    // ...
    ```
    
7. Temos o state definido, agora só precisamos alterá-lo através da função “setFollowText”:
    
    ```jsx
    // ...
    const [followText, setFollowText] = useState("Follow")
    
      function handleClick(ev) {
        alert("Você agora está seguindo!")
        setFollowText("Following")
      }
    
      return (
    // ...
    ```
    
8. A função modificadora “setState” irá acionar os mecanismos internos do React para causar uma nova renderização do componente. Nessa nova renderização o valor da variável estará atualizado com o que informamos e o resultado é que as nossas mudanças virtuais refletem no DOM real. Tudo isso de uma forma bem simples e intuitiva.