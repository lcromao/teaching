import { useState } from "react";

function getInitialCount() {
  console.log("Calculando o valor inicial...");
  return 0;
}

export default function useCounter() {
  // Posso colocar uma expressão dentro do useState ou lógicas mais complexas para definir o valor inicial do estado.
  // O problema é que essa função será executada toda vez que o componente for renderizado, mesmo que o valor inicial do estado seja necessário apenas na primeira renderização. Para evitar isso, podemos passar uma função para o useState, e essa função só será executada na primeira renderização para definir o valor inicial do estado. Isso é conhecido como lazy initialization (inicialização preguiçosa): () => getInitialCount()
  const [count, setCount] = useState(() => getInitialCount());

  const increment = () => {
    // Por uma questao de eficiência, ele chama esses dois setStates de forma assíncrona... Para resolver isso, podemos usar a função de atualização do estado, que recebe o valor anterior do estado como argumento e retorna o novo valor do estado. 
    setCount((previousCount) => previousCount + 1);
    setCount((previousCount) => previousCount + 1);

    // setCount(count + 1);
    // setCount(count + 1);
  };

  return { count, increment };
}
