import { useState } from "react";
import Input from "./components/input";

function App() {
  const [password, setPassword] = useState("");
  const [copyText, setCopyText] = useState("Copiar");
  const [passwordSize, setPasswordSize] = useState(12);

  function generate() {
    const characters =
      "'1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?";
    const length = passwordSize;
    let newPassword = "";
    for (let i = 0; i < length; i++) {
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
        <label htmlFor="passwordSize">Tamanho: </label>
        {/* Trabalho como props para passar o estado e a função de atualização do estado para o componente filho, para que ele possa atualizar o estado do componente pai. Isso é conhecido como lifting state up (elevação de estado). O componente filho é responsável por atualizar o estado do componente pai, e o componente pai é responsável por passar o estado atualizado para o componente filho.  */}
        <Input passwordSize={passwordSize} setPasswordSize={setPasswordSize} />
      </div>
      <button onClick={generate}>
        Gerar! senha de {passwordSize} caracteres
      </button>
      <button onClick={copyToClipboard}>{copyText}</button>
      <div>{password}</div>
    </div>
  );
}

export default App;
