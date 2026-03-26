# Renderização condicional

Nessa aula você vai aprender como fazer renderização condicional de componentes no React. E, como eu já mencionei antes, o React nada mais é do que código JavaScript, então você verá que esse é um processo bem simples e intuitivo para quem já conhece bem a linguagem.

1. Vamos continuar usando o projeto do Gerador de senhas do exercício 4.
2. Vamos imaginar agora que queremos um tamanho padrão para a senha, e que o input de customizar o tamanho só seja exibido se o usuário o habilitar. Primeiro criaremos um estado booleano que definirá se o input será usado ou não:
    
    ```jsx
    import { useState } from "react"
    import Input from "./components/Input"
    
    function App() {
      const [password, setPassword] = useState("")
      const [passwordSize, setPasswordSize] = useState(12)
      const [showInput, setShowInput] = useState(false)
      const [copyText, setCopyText] = useState("Copiar")
    
      function generate() {
    // ...
    ```
    
3. Precisamos também criar o checkbox que irá habilitar e desabilitar a customização do tamanho:
    
    Obs.: já podemos ver o estado funcionando como queremos se usarmos uma condicional diretamente no texto do botão.
    
    ```jsx
    // ...
    	return (
        <div>
          <h1>Gerador de senhas</h1>
          <div>
            <label htmlFor="showInput">Customizar tamanho:</label>
            <input
              type="checkbox"
              id="showInput"
              value={showInput}
              onChange={() => setShowInput(show => !show)}
            />
          </div>
          <div>
            <label htmlFor="passwordSize">Tamanho: </label>
            <Input passwordSize={passwordSize} setPasswordSize={setPasswordSize} />
          </div>
          <button onClick={generate}>Gerar senha de {showInput ? passwordSize : 8} caracteres</button>
          <button onClick={copyToClipboard}>{copyText}</button>
          <div>Sua senha segura: {password}</div>
        </div>
      )
    }
    
    export default App
    ```
    
4. Agora que temos o estado funcional só precisamos usá-lo para a renderização condicional. Tudo que precisamos fazer é usar um operador ternário:
    
    ```jsx
    // ...
      return (
        <div>
          <h1>Gerador de senhas</h1>
          <div>
            <label htmlFor="showInput">Customizar tamanho:</label>
            <input
              type="checkbox"
              id="showInput"
              value={showInput}
              onChange={() => setShowInput(show => !show)}
            />
          </div>
          {showInput ? (
            <div>
              <label htmlFor="passwordSize">Tamanho: </label>
              <Input passwordSize={passwordSize} setPasswordSize={setPasswordSize} />
            </div>
          ) : null}
          <button onClick={generate}>Gerar senha de {showInput ? passwordSize : 8} caracteres</button>
          <button onClick={copyToClipboard}>{copyText}</button>
          <div>Sua senha segura: {password}</div>
        </div>
      )
    }
    
    export default App
    ```
    
5. Por fim, também podemos usar o operador de curto-circuito && caso só queiramos renderizar algo caso seja verdadeiro:
    
    Obs.: repare que eu também fiz alguns ajustes no código para deixá-lo mais organizado:
    
    ```jsx
    import { useState } from "react"
    import Input from "./components/Input"
    
    function App() {
      const [password, setPassword] = useState("")
      const [customSize, setCustomSize] = useState(12)
      const [showInput, setShowInput] = useState(false)
      const [copyText, setCopyText] = useState("Copiar")
    
      const passwordSize = showInput ? customSize : 8
    
      function generate() {
        const characters = "'1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?"
        let newPassword = ""
        for (let i = 0; i < passwordSize; i++) {
          const position = Math.floor(Math.random() * characters.length)
          newPassword += characters[position]
        }
        setPassword(newPassword)
        setCopyText("Copiar")
      }
    
      function copyToClipboard() {
        window.navigator.clipboard.writeText(password)
        setCopyText("Copiado!")
      }
    
      return (
        <div>
          <h1>Gerador de senhas</h1>
          <div>
            <label htmlFor="showInput">Customizar tamanho:</label>
            <input
              type="checkbox"
              id="showInput"
              value={showInput}
              onChange={() => setShowInput(show => !show)}
            />
          </div>
          {showInput && (
            <div>
              <label htmlFor="customSize">Tamanho: </label>
              <Input passwordSize={customSize} setPasswordSize={setCustomSize} />
            </div>
          )}
          <button onClick={generate}>Gerar senha de {passwordSize} caracteres</button>
          <button onClick={copyToClipboard}>{copyText}</button>
          <div>Sua senha segura: {password}</div>
        </div>
      )
    }
    
    export default App
    ```