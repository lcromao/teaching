# Persistindo valores com o useRef

Nessa aula você irá conhecer mais um hook do React, o **useRef()**.

Ele é parecido com o useState(), mas serve para algo um pouco mais específico e menos comum, mas também é bem importante conhecê-lo. O useRef() é capaz de persistir valores entre as renderizações do componente, como o useState(), mas mudar o valor da ref criada não irá causar uma nova renderização.

1. Para demonstrar o useRef() vamos criar um novo projeto com o VIte.
2. Nesse novo projeto, remova todo o conteúdo desnecessário de boas-vindas.
3. Crie no componente App.jsx os elementos abaixo para ver como o useRef se compara a uma variável comum do JavaScript e a um estado criado com useState():
    
    ```jsx
    import { useRef, useState } from "react";
    import RefExample from "./RefExample";
    
    function App() {
      let variable = 0
      const ref = useRef(0);
      let [state, setState] = useState(0);
    
      const showValues = () => {
        alert(`
          Variável: ${variable}
          Ref: ${ref.current}
          State: ${state}
        `)
      }
    
      return (
        <div>
          <p>Variável: {variable}</p>
          <p>Ref: {ref.current}</p>
          <p>State: {state}</p>
          <button onClick={() => variable++}>Aumentar Variável</button>
          <button onClick={() => ref.current++}>Aumentar Ref</button>
          <button onClick={() => setState(state => state + 1)}>Aumentar State</button>
          <button onClick={showValues}>Exibir valores</button>
          <hr />
          <RefExample />
        </div>
      );
    }
    
    export default App
    ```
    
4. Agora vamos a um dos casos de uso mais comuns do useRef(), **referenciar elementos do DOM diretamente**. Crie um componente RefExample.jsx e adicione o seguinte conteúdo:
    
    Obs.: repare que, como o valor é persistido entre as renderizações, a referência ao elemento do DOM se mantém, o que é útil para quando queremos manipulá-lo diretamente, não precisando selecioná-lo novamente a cada nova renderização.
    
    ```jsx
    import { useRef } from 'react';
    
    const RefExample = () => {
      const inputRef = useRef(null);
    
      const handleClick = () => {
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = "#f64348"
      };
    
      return (
        <div>
          <input ref={inputRef} type="text" />
          <button onClick={handleClick}>Focar</button>
        </div>
      );
    };
    
    export default RefExample;
    ```
    
5.