# Dados Dinâmicos no JSX

A partir dessa aula vamos começar a usar o React pra valer. Vamos criar um projeto com o Vite onde aplicaremos vários conceitos diferentes. Para evitar recriar um novo projeto a cada aula, vamos aproveitar esse projeto nas aulas subsequentes.

Você não é obrigado a seguir esse modelo, pode criar projetos separados se preferir, mas eu o farei para ganharmos agilidade nas aulas.

Com isso fora do caminho, vamos ao que interessa.

Nessa aula você vai aprender como usar dados dinâmicos dentro do JSX, inserindo expressões JavaScript diretamente dentro da marcação da página.

## Passo 1: Criando um novo projeto

Como explicado, vamos começar criando um novo projeto e chamá-lo de **react-fundamentos**:

Obs.: como sempre, selecione as opções: React e JavaScript (framework e variante)

```bash
npm create vite@latest
```

## Passo 2: Instalando dependências e iniciando o projeto

Acesse o projeto e instale as dependências. Depois disso, inicie a aplicação:

```bash
cd react-fundamentos
npm install
npm run dev
```

## Passo 3: Limpando o projeto inicial

Como já fizemos antes, vamos nos livrar de todo o conteúdo inicial do Vite. Deixe apenas o componente "App.jsx" com o seguinte conteúdo:

```jsx
export default function App() {
  return (
    <div>
      <h1>React is awesome!</h1>
    </div>
  )
}
```

## Passo 4: Inserindo dados dinâmicos com variáveis

O JSX permite inserir qualquer expressão JavaScript dentro da marcação, em qualquer lugar. Para fazer isso basta usar um par de chaves "{ }". Por exemplo, podemos exibir de forma dinâmica o valor de uma variável:

Obs.: repare que se trocarmos o valor da variável e salvar o componente a página passa a mostrar o novo valor.

```jsx
export default function App() {
  const tech = "React"

  return (
    <div>
      <h1>{tech} is awesome!</h1>
    </div>
  )
}
```

## Passo 5: Inserindo expressões dentro das chaves

Também podemos inserir expressões diretamente dentro das chaves. A expressão será avaliada e o resultado é exibido:

```jsx
export default function App() {
  const tech = "React"

  return (
    <div>
      <h1>{tech} is awesome!</h1>
      <h2>It's easy, like 1 + 1 is {1 + 1}</h2>
    </div>
  )
}
```

## Passo 6: Inserindo chamadas de funções

Ou então inserir chamadas de funções:

```jsx
function sum(a, b) {
  return a + b
}

export default function App() {
  const tech = "JavaScript"

  return (
    <div>
      <h1>{tech} is awesome!</h1>
      <h2>It's easy, like 1 + 1 is {sum(1, 1)}</h2>
    </div>
  )
}
```

## Passo 7: Limitações do JSX com expressões

No entanto, existe uma regra muito importante aqui. Só podemos usar expressões dentro do JSX, ou seja, código que pode ser avaliado para resultar em um valor (como os valores que atribuímos a uma variável por exemplo. Sendo assim, coisas como blocos if else, while, for, etc, não podem ser usados dentro do JSX. Podemos, por exemplo, substituir o if else por um operador ternário:

```jsx
function sum(a, b) {
  return a + b
}

export default function App() {
  const tech = "JavaScript"
  const status = true

  return (
    <div>
      <h1>{tech} is awesome!</h1>
      <h2>It's easy, like 1 + 1 is {sum(1, 1)}</h2>
      <h2>Current status: {status ? "ON" : "OFF"}</h2>
    </div>
  )
}
```
    