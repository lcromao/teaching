# Conhecendo melhor os hooks


Agora que você já viu o que é e como usar o state do React você irá entender melhor o que são os hooks do React.

E para iniciar, vamos criar um novo projeto com o Vite. Agora já temos os conhecimentos necessários para entender a tela de “boas-vindas” do Vite e o exemplo do contador.

Essa será um pouco mais explicativa, sem muito código. A ideia é entender 2 regras muito importantes do useState e dos hooks em geral.

1. Em primeiro lugar, o que são hooks? São funções específicas do React para “entrar” ou se conectar ao seu sistema interno. Além disso, o React segue o padrão de nomear os hooks sempre com o prefixo “use”, por exemplo, “useState”, “useRef”, “useEffect”, “useMemo”, etc.
2. Existem hooks para muitas coisas e ao longo dos módulos de React aprenderemos muitos deles, mas por enquanto vamos focar no useState.
3. O useState, como eu expliquei na aula passada, serve para se conectar ao sistema de estado do React. Esse sistema serve para monitorar valores específicos que, ao serem alterados, devem acionar uma remontagem de um componente.

### Regra 1: Onde usar os hooks (e como criar seus próprios hooks)

1. Com isso chegamos à primeira regra dos hooks: **você só pode chamar um hook em uma função que é um componente React**, você não pode chamar hooks em funções comuns do JavaScript.
2. Você pode criar seus próprios hooks seguindo o padrão de nomenclatura e retornar valores. O seu hook será uma função, mas que você também só deverá chamar dentro de um componente React.
3. Crie uma pasta “hooks” e dentro dela um arquivo “useCounter.js” com a seguinte função:
    
    ```jsx
    import { useState } from "react";
    
    export default function useCounter() {
      const [count, setCount] = useState(0)
    
      const increment = () => {
        setCount(count + 1)
      }
    
      return { count, increment }
    }
    ```
    
4.  Agora, no componente “App.jsx” podemos usar o nosso custom hook:
    
    ```jsx
    import './App.css'
    import useCounter from './hooks/useCounter'
    
    function App() {
      const { count, increment } = useCounter()
    
      return (
        <>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={increment}>
              count is {count}
            </button>
          </div>
        </>
      )
    }
    
    export default App
    ```
    
5. Uma prática comum no React é criar hooks customizados para abstrair certos comportamentos e lógicas fora do componente, o que resulta em uma estrutura muito mais organizada.

### Regra 2: A importância da ordem dos hooks

1. O React monitora os hooks através de uma lista, ele não sabe o nome que demos para eles ou onde e como estamos trabalhando com eles. Por isso, a ordem em que usamos os hooks no componente importa (e muito). O que nos leva à segunda regra.
2. A segunda regra é que **você só pode chamar um hook no top-level da função**, nunca deverá chamar os hooks dentro de blocos condicionais, repetições ou outros funções criadas dentro do componente.
3. Por causa da forma como o React lida com os hooks é necessário que a ordem e a quantidade dos hooks em um componente sejam sempre as mesmas. Se tentarmos colocar o hook dentro de uma condicional veremos que isso causará vários erros:
    
    ```jsx
    function App() {
      const { count, increment } = useCounter()
      let someState
    
      if (count > 10) {
        someState = useState("MAIOR QUE 10")
      }
    
      return (
        <>
          <h1>Vite + React {someState}</h1>
          <div className="card">
            <button onClick={increment}>
              count is {count}
            </button>
          </div>
        </>
      )
    }
    
    export default App
    ```