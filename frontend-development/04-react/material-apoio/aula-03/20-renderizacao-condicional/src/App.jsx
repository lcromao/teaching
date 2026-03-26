import { useState } from "react";
import Input from "./components/input";

function App() {
  const [password, setPassword] = useState("");
  const [copyText, setCopyText] = useState("Copiar");
  const [customSize, setCustomSize] = useState(12);
  const [showInput, setShowInput] = useState(false);

  const passwordSize = showInput ? customSize : 8;

  function generate() {
    const characters =
      "'1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?";
    const length = passwordSize;
    let newPassword = "";
    for (let i = 0; i < passwordSize; i++) {
      const position = Math.floor(Math.random() * characters.length);
      newPassword += characters[position];
    }
    setPassword(newPassword);
    setCopyText("Copiar");
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    setCopyText("Copiado!");
  }

  return (
    <div>
      <h1>Gerador de senhas</h1>
      <div>
        <label htmlFor="showInput">Customizar tamanho: </label>
        <input
          type="checkbox"
          id="showInput"
          value={showInput}
          // Setando o oposto do valor atual
          onChange={() => setShowInput((currentState) => !currentState)}
        />
      </div>
      {/* Ou posso fazer sem o : null e em vez de ? -> &&, pois o && só renderiza o que vem depois se a condição for verdadeira */}
      {showInput ? (
        <div>
          <label htmlFor="passwordSize">Tamanho: </label>
          <Input passwordSize={customSize} setPasswordSize={setCustomSize} />
        </div>
      ) : null}
      <button onClick={generate}>
        Gerar! senha de {passwordSize} caracteres
      </button>
      <button onClick={copyToClipboard}>{copyText}</button>
      <div>{password}</div>
    </div>
  );
}

export default App;
