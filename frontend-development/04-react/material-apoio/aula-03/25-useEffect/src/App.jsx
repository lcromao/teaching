import { useEffect, useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);
  // Função de efeito, [valor de dependência]
  // Toda vez que atualizar a página, o useEffect é executado, mas se eu passar um array vazio, ele só é executado na primeira renderização.
  useEffect(() => {
    console.log("O efeito colateral foi ativado!");
    // Realizando limpeza do efeito, toda vez que o componente for desmontado ou antes de executar o efeito novamente, a função de limpeza é executada.
    return () => {
      console.log("Componente desmontado! Fazendo a limpeza...");
    };
  });

  return (
    <button onClick={() => setCounter((count) => count + 1)}>
      Contador: {counter}
    </button>
  );
}

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      <h1>Conhecendo o useEffect()</h1>

      <div>
        <input
          type="checkbox"
          id="show"
          value={show}
          onChange={() => setShow((state) => !state)}
        />
        <label htmlFor="show">Exibir Contador</label>
      </div>

      {show ? <Counter /> : null}
    </>
  );
}
