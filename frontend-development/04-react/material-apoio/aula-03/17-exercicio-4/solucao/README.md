# Resolução do Exercício 4

1. Crie um novo projeto React com Vite.
2. Remova o arquivo “src/App.css” e o conteúdo do componente “src/App.jsx”.
3. Comece criando a estrutura da tela em App.jsx:
    
    ```jsx
    function App() {
      return (
        <div>
          <h1>Gerador de senhas</h1>
          <button>Gerar!</button>
          <button>Copiar</button>
          <div>senha</div>
        </div>
      )
    }
    
    export default App
    ```
    
4. Adicione um *state* para armazenar a senha:
    
    ```jsx
    import { useState } from "react"
    
    function App() {
      const [password, setPassword] = useState("")
    
      return (
        <div>
          <h1>Gerador de senhas</h1>
          <button>Gerar!</button>
          <button>Copiar</button>
          <div>{password}</div>
        </div>
      )
    }
    
    export default App
    ```
    
5. Adicione a função que gera a senha:
    
    ```jsx
    import { useState } from "react"
    
    function App() {
      const [password, setPassword] = useState("")
    
    	function generate() {
        const characters = "'1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?"
        const length = 12
        let newPassword = ""
        for (let i = 0; i < length; i++) {
          const position = Math.floor(Math.random() * characters.length)
          newPassword += characters[position]
        }
        setPassword(newPassword)
      }
    
      return (
        <div>
          <h1>Gerador de senhas</h1>
    			<button onClick={generate}>Gerar!</button>
          <button>Copiar</button>
          <div>{password}</div>
        </div>
      )
    }
    
    export default App
    ```
    
6. Finalize adicionando um *state* para armazenar o texto do botão de copiar e a função que copia para a área de transferência:
    
    ```jsx
    import { useState } from "react"
    
    function App() {
      const [password, setPassword] = useState("")
    	const [copyText, setCopyText] = useState("Copiar")
    
    	function generate() {
        const characters = "'1234567890-=!@#$%¨&*()_+qwertyuiop[asdfghjklç~]zxcvbnm,.;/QWERTYUIOP{ASDFGHJKLÇ^}ZXCVBNM<>:?"
        const length = 12
        let newPassword = ""
        for (let i = 0; i < length; i++) {
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
    			<button onClick={generate}>Gerar!</button>
    			<button onClick={copyToClipboard}>{copyText}</button>
          <div>{password}</div>
        </div>
      )
    }
    
    export default App
    ```