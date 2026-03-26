# Compartilhando estado entre componentes

Nessa aula você irá aprender como utilizar um estado declarado em um componente em outro. Esse é um tópico bem importante no React e existem muitas formas de fazer isso, mas nós iremos começar pela forma mais simples.

1. Ainda no projeto do Gerador de senhas do exercício 4 podemos exemplificar essa necessidade. Imagine que precisamos criar um componente para o input. Poderíamos criar um arquivo a parte e fazer da seguinte forma:

```jsx
import { useState } from "react"

export default function Input() {
    const [passwordSize, setPasswordSize] = useState(12)

    return (
    <input
        type="number"
        id="passwordSize"
        min={1}
        value={passwordSize}
        onChange={(ev) => setPasswordSize(ev.target.value)}
    />
    )
}
```

2. Mas agora temos um problema, não conseguimos usar o valor do estado “passwordSize” no componente App. A forma mais simples que temos de compartilhar estado entre esses dois componentes é através de **props**.
3. Vamos mover o estado para fora do componente Input e de volta para o App. Lá, vamos passar o valor e a função modificadora como props para o componente Input:

Obs.: nesse caso, o Input é o que chamamos de **componente controlado**, pois seu comportamento e estado é controlado por outro componente.

src/App.jsx

```jsx
import { useState } from "react"
import Input from "./components/Input"

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
        <Input passwordSize={passwordSize} setPasswordSize={setPasswordSize} />
        </div>
        <button onClick={generate}>Gerar senha de {passwordSize} caracteres</button>
        <button onClick={copyToClipboard}>{copyText}</button>
        <div>Sua senha segura: {password}</div>
    </div>
    )
}

export default App
```

src/components/Input.jsx

```jsx
/* eslint-disable react/prop-types */
export default function Input(props) {
    return (
    <input
        type="number"
        id="passwordSize"
        min={1}
        value={props.passwordSize}
        onChange={(ev) => props.setPasswordSize(ev.target.value)}
    />
    )
}
```

4. Se quisermos ainda podemos utilizar o prop-types para validação, como o ESLint recomenda. Para isso, instale a biblioteca:

```jsx
npm install prop-types
```

5. E então adicione os tipos de dados esperados em cada prop no seguinte formato:

```jsx
import PropTypes from "prop-types"

Input.propTypes = {
    passwordSize: PropTypes.number.isRequired,
    setPasswordSize: PropTypes.func.isre
}

export default function Input(props) {
    return (
    <input
        type="number"
        id="passwordSize"
        min={1}
        value={props.passwordSize}
        onChange={(ev) => props.setPasswordSize(ev.target.value)}
    />
    )
}
```


Uma observação final antes de encerrar a aula é que esse método de passar estado através de props funciona em cenários mais simples, onde é apenas de um componente para outro. Se tivéssemos muitas camadas de componentes cada vez mais internos ficaria muito difícil passar as props de um para o outro.

Para resolver o problema nesses casos usamos soluções de **gerenciamento de estado global**. Falaremos mais sobre elas no futuro, mas é importante que você conheça as formas mais simples de compartilhar estados primeiro.