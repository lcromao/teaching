# Ciclo de vida: conhecendo o useEffect

Nessa aula você irá conhecer o segundo hook mais usado do React, depois do useState(), o **useEffect()**. O useEffect serve para sincronizar a aplicação com sistemas externos através de efeitos colaterais, ou seja, ele cria funções que são executadas quando uma dependência é modificada (como um efeito colateral dessa mudança).

**Mas atenção!** Muitas pessoas usam o useEffect para executar uma função após uma mudança no state, mesmo quando é a própria aplicação que causa essa mudança (ex.: em eventos). Isso pode gerar usos desnecessários do useEffect. Faça o possível para utilizá-lo somente em sincronização com sistemas externos (ex.: APIs, websocket, integrações, etc).

Nessa primeira aula iremos mostrar o useEffect() com um exemplo básico, na próxima traremos um uso mais realista.

1. Crie um novo projeto com o Vite e remova o conteúdo inicial desnecessário.
2. No componente App.jsx adicione o seguinte conteúdo:
    
    Obs.: repare que o useEffect é composto de dois argumentos, o callback e o array de dependencias.
    
    Obs².: é muito importante passar o array de dependências, pois sem ele o useEffect será executado em todas as renderizações do componente.
    
    ```jsx
    import { useEffect, useState } from "react"
    
    function App() {
      let [counter, setCounter] = useState(0)
    
      useEffect(() => {
        alert("O efeito colateral foi ativado!")
      }, [counter])
    
      return (
        <>
          <h1>Conhecendo o useEffect()</h1>
          <button
            onClick={() => setCounter(count => count + 1)}
          >
            Contador: {counter}
          </button>
        </>
      )
    }
    
    export default App
    ```
    
3. É muito importante passar o array de dependências, pois sem ele o useEffect será executado em todas as renderizações do componente. Crie um segundo estado e remove o array de dependências, você verá que o alert é exibido em cada renderização:
    
    ```jsx
    import { useEffect, useState } from "react"
    
    function App() {
      let [counter, setCounter] = useState(0)
      let [counter2, setCounter2] = useState(0)
    
      useEffect(() => {
        alert("O efeito colateral foi ativado!")
      })
    
      return (
        <>
          <h1>Conhecendo o useEffect()</h1>
          <button
            onClick={() => setCounter(count => count + 1)}
          >
            Contador: {counter}
          </button>
          <button
            onClick={() => setCounter2(count => count + 1)}
          >
            Contador 2: {counter2}
          </button>
        </>
      )
    }
    
    export default App
    ```
    
4. Por fim, o useEffect() conta com outro recurso importante, **um mecanismo de limpeza**. Isso existe para removermos manualmente recursos associados ao componente quando o componente for desmontado, evitando vazamento de memória e outros problemas. Para isso, retornamos uma função dentro do useEffect(), ela será executada sempre que o componente for desmontado, fazendo a limpeza necessária.
    
    Obs.: o componente separado Counter só foi criado para demonstrar a desmontagem através da renderização condicional.
    
    ```jsx
    import { useEffect, useState } from "react"
    
    function Counter() {
      let [counter, setCounter] = useState(0)
    
      useEffect(() => {
        console.log("O efeito colateral foi ativado!")
        return () => {
          console.log("Componente desmontado! Fazendo a limpeza...")
        }
      })
    
      return (
        <button onClick={() => setCounter(count => count + 1)}>
          Contador: {counter}
        </button>
      )
    }
    
    function App() {
      const [show, setShow] = useState(false)
    
      return (
        <>
          <h1>Conhecendo o useEffect()</h1>
          <div>
            <input type="checkbox" id="show" value={show} onChange={() => setShow(state => !state)} />
            <label htmlFor="show">Exibir Contador</label>
          </div>
          {show ?
            <Counter />
            : null
          }
        </>
      )
    }
    
    export default App
    ```