# Criando Novos Componentes

Nessa aula você vai aprender a criar novos componentes e a incluí-los em outros componentes, um dos conceitos mais importantes do React.

## Passo 1: Criando o primeiro componente

Vamos continuar no projeto da aula anterior, o `react-fundamentos`. No arquivo "App.jsx" nós vamos criar uma outra função chamada **Title**. Um componente React nada mais é do que uma função do JavaScript que retorna JSX, então podemos recriar nosso título como um componente individual:

Obs.: os componentes do React, aparecer de serem funções, são nomeados usando CamelCase, ou seja, letras maiúsculas no começo e em cada palavra. **É muito importante seguir esse padrão de nomenclatura.**

```jsx
function Title() {
  const tech = "React"
  return <h1>{tech} is awesome!</h1>
}

export default function App() {
  const tech = "React"
  const status = true

  return (
    <div>
      <h1>{tech} is awesome!</h1>
      <h2>It's easy, like 1 + 1 is {1 + 1}</h2>
      <h2>Current status: {status ? "ON" : "OFF"}</h2>
    </div>
  )
}
```

## Passo 2: Usando o novo componente

Para usar esse componente que criamos no nosso App.jsx só precisamos incluir uma nova tag com o seu nome, como uma tag html comum, mas com a diferença de que os nossos componentes começarão sempre com letras maiúsculas:

Obs.: repare que precisamos incluir a `/` de fechamento mesmo sendo uma tag única, isso é uma regra do JSX por ele ser baseado em XML (linguagem de marcação parecida com o HTML)

```jsx
function Title() {
  const tech = "React"
  return <h1>{tech} is awesome!</h1>
}

export default function App() {
  const status = true

  return (
    <div>
      <Title />
      <h2>It's easy, like 1 + 1 is {1 + 1}</h2>
      <h2>Current status: {status ? "ON" : "OFF"}</h2>
    </div>
  )
}
```

## Passo 3: Separando componentes em arquivos

Certo, já sabemos como criar um novo componente. Mas uma outra prática comum do React é separar cada componente em seu próprio arquivo com o mesmo nome do componente, deixando nosso código mais organizado. Vamos fazer isso.

## Passo 4: Criando o arquivo Title.jsx

Crie um arquivo chamado "Title.jsx" e mova para ele o código do componente Title:

Obs.: lembre que precisamos exportá-lo para poder usá-lo no componente App.jsx.

```jsx
export default function Title() {
  const tech = "React"
  return <h1>{tech} is awesome!</h1>
}
```

## Passo 5: Importando e usando o novo componente

Agora atualize o componente App.jsx para usar o novo componente:

```jsx
import Title from "./Title"

export default function App() {
  const status = true

  return (
    <div>
      <Title />
      <h2>It's easy, like 1 + 1 is {1 + 1}</h2>
      <h2>Current status: {status ? "ON" : "OFF"}</h2>
    </div>
  )
}
```

## Passo 6: Praticando com mais componentes

Para praticar vamos criar mais dois componentes, "Subtitle.jsx" e "StatusText.jsx". Crie os arquivos e adicione neles suas respectivas funções:

Obs.: repare que qualquer função JavaScript é válida, inclusive arrow functions.

### Subtitle.jsx

```jsx
const Subtitle = () => <h2>It's easy, like 1 + 1 is {1 + 1}</h2>

export default Subtitle
```

### StatusText.jsx

```jsx
export default () => {
  const status = true
  return <h2>Current status: {status ? "ON" : "OFF"}</h2>
}
```

## Passo 7: Atualizando o App.jsx

Agora atualize novamente o componente App.jsx:

```jsx
import StatusText from "./StatusText"
import Subtitle from "./Subtitle"
import Title from "./Title"

export default function App() {
  return (
    <div>
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  )
}
```

## Passo 8: Organizando componentes em pastas

Antes de terminarmos, existe uma última prática comum do React. Ao invés de colocarmos todos os componentes "jogados" dentro da pasta "src" vamos criar uma pasta chamada "components" e movê-los para lá. Depois só precisaremos atualizar os imports no App.jsx:

```jsx
import StatusText from "./components/StatusText"
import Subtitle from "./components/Subtitle"
import Title from "./components/Title"

export default function App() {
  return (
    <div>
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  )
}
```

## Passo 9: Alternativa com pastas por componente

Outra forma comum de organizar os componentes é colocá-los em pastas com o nome do componente e chamar o arquivo em si de "index.jsx". Isso acontece porque é comum termos outros arquivos relacionados a um componente específico e faz sentido eles ficarem todos dentro da mesma pasta. No entanto, como não precisamos disso, podemos continuar sem usar pastas para cada componente.

---

**Próximos passos:** Aprenda sobre Props para passar dados entre componentes!
