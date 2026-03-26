# Conhecendo melhor o useState

Nessa continuação da aula anterior iremos olhar agora para 2 dicas mais avançadas do useState.

### Dicas extras do useState

1. A primeira é que podemos usar uma função para definir o valor inicial do useState:
    
    ```jsx
    import { useState } from "react";
    
    function getInitialValue() {
      console.log("obtendo valor inicial")
      return 1 + 1
    }
    
    export default function useCounter() {
      const [count, setCount] = useState(getInitialValue())
    
      const increment = () => {
        setCount(count + 1)
      }
    
      return { count, increment }
    }
    ```
    
2. Mas isso apresenta um problema, como podemos ver no console, que é o fato da função ser executada em cada montagem. Para resolver isso só precisamos envolver a chamada da função em uma função anônima:
    
    Obs.: isso acontece porque, dessa forma, estamos passando a definição de uma função, não o resultado dela, e o useState sabe que precisará executar essa função internamente e apenas na primeira montagem.
    
    Obs².: essa técnica é muito útil quando o nosso estado inicial depende de um cálculo, especialmente um cálculo que “custa caro” em termos computacionais.
    
    ```jsx
    import { useState } from "react";
    
    function getInitialValue() {
      console.log("obtendo valor inicial")
      return 1 + 1
    }
    
    export default function useCounter() {
      const [count, setCount] = useState(() => getInitialValue())
    
      const increment = () => {
        setCount(count + 1)
      }
    
      return { count, increment }
    }
    ```
    
3. A segunda dica é relacionada a função de setState. Quando vamos usá-la para definir um novo valor que depende do valor anterior não podemos apenas colocar a expressão diretamente no parâmetro. Podemos ver o problema que isso causa quando chamamos o setState mais de uma vez ao mesmo tempo:
    
    Obs.: repare que o valor só aumenta em 1, não em 2.
    
    ```jsx
    import { useState } from "react";
    
    function getInitialValue() {
      console.log("obtendo valor inicial")
      return 1 + 1
    }
    
    export default function useCounter() {
      const [count, setCount] = useState(() => getInitialValue())
    
      const increment = () => {
        setCount(count + 1)
        setCount(count + 1)
      }
    
      return { count, increment }
    }
    ```
    
4. Isso ocorre porque em algumas situações, por uma questão de eficiência, o React poderá executar os setState de forma assíncrona. Ele poderá “juntar” as execuções para otimizar sua execução.
5. A solução para isso é bem fácil. O setState aceita como parâmetro uma função de callback cujo primeiro argumento é o valor “imediatamente” anterior, o que nos permite ter acesso a esse valor sempre atualizado. O retorno desse callback deve ser o valor que queremos “setar” no estado:
    
    ```jsx
    import { useState } from "react";
    
    function getInitialValue() {
      console.log("obtendo valor inicial")
      return 1 + 1
    }
    
    export default function useCounter() {
      const [count, setCount] = useState(() => getInitialValue())
    
      const increment = () => {
        setCount((previousCount) => previousCount + 1)
        setCount((previousCount) => previousCount + 1)
      }
    
      return { count, increment }
    }
    ```
    
6. Fazendo dessa forma as duas execuções são levadas em consideração corretamente e nosso valor passa a incrementar de 2 em 2.