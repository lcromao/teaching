# Inputs no React

Nessa aula você irá começar a aprender uma habilidade bem importante para desenvolvedores front-end: trabalhar com formulários. Iremos começar aprendendo a controlar o valor e mudança de valor de um input através do state, conseguindo dessa forma criar formas mais ricas de interação com o usuário.

## Contexto

Para isso iremos seguir usando o projeto do exercício anterior, o gerador de senhas.

## Passo 1: Adicionar um Input

Comece adicionando um input na tela para que o usuário seja capaz de dizer o tamanho da senha que ele prefere:

**Obs.:** você também pode aplicar no arquivo `index.css` os mesmos estilos do button ao input.

```jsx
// ...
return (
  <div>
    <h1>Gerador de senhas</h1>
    <div>
      <label htmlFor="passwordSize">Tamanho: </label>
      <input type="number" id="passwordSize" min={1} />
    </div>
    <button onClick={generate}>Gerar!</button>
    <button onClick={copyToClipboard}>{copyText}</button>
    <div>Sua senha segura: {password}</div>
  </div>
)
}
```

## Passo 2: Controlando o Valor com State

Agora, para começar a controlar o valor do input podemos criar um state e atribuir a variável ao atributo `value` do input:

**Obs.:** repare que podemos exibir o `passwordSize` na tela para ver seu valor mudando.

```jsx
import { useState } from "react"

function App() {
  const [password, setPassword] = useState("")
  const [passwordSize, setPasswordSize] = useState(12)
  const [copyText, setCopyText] = useState("Copiar")

  // ...

  return (
    <div>
      <h1>Gerador de senhas</h1>
      <div>
        <label htmlFor="passwordSize">Tamanho: </label>
        <input
          type="number"
          id="passwordSize"
          min={1}
          value={passwordSize}
        />
      </div>
      <button onClick={generate}>Gerar senha de {passwordSize} caracteres</button>
      <button onClick={copyToClipboard}>{copyText}</button>
      <div>Sua senha segura: {password}</div>
    </div>
  )
}

export default App
```

## Passo 3: Evento onChange

Mas agora, graças a indicar que o `value` é igual ao `passwordSize`, não conseguimos mais atualizar seu valor. Para isso precisaremos do evento `onChange` do input:

```jsx
// ...

return (
  <div>
    <h1>Gerador de senhas</h1>
    <div>
      <label htmlFor="passwordSize">Tamanho: </label>
      <input
        type="number"
        id="passwordSize"
        min={1}
        value={passwordSize}
        onChange={(ev) => setPasswordSize(ev.target.value)}
      />
    </div>
    <button onClick={generate}>Gerar senha de {passwordSize} caracteres</button>
    <button onClick={copyToClipboard}>{copyText}</button>
    <div>Sua senha segura: {password}</div>
  </div>
)
}

export default App
```

## Passo 4: Usando o State na Função Generate

Por fim, só precisamos usar o valor do state na função `generate`:

```jsx
// ...
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
// ...
```

## Conceitos Importantes

- **Controlled Components**: Inputs controlados pelo React através do state
- **value**: Atributo que define o valor atual do input
- **onChange**: Evento disparado sempre que o valor do input muda
- **ev.target.value**: Acessa o valor atual do input no evento

---

**Dica:** Sempre use `onChange` quando definir o atributo `value` em um input para permitir que o usuário possa alterá-lo!
