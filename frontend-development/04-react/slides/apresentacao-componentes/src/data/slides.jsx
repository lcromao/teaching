import { SlideColumn, Pill, Note, CodeBlock } from '../components/Slide/Slide'

export const slides = [
  // Slide 1: Título
  {
    title: "Componentes React",
    subtitle: "Estilizando componentes, compondo interfaces e reaproveitando código em aplicações React.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>Como estilizar componentes com CSS tradicional, estilos inline e CSS Modules.</li>
          <li>Como usar Fragment para evitar "divs" desnecessárias.</li>
          <li>Como reutilizar componentes e torná-los dinâmicos com props.</li>
          <li>Como compor componentes com <code>children</code> e rest props.</li>
        </ul>
        <Note>
          A ideia é sair desta aula pronto para escrever componentes mais limpos, reutilizáveis e organizados.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 2: Estilizando Componentes - Introdução
  {
    title: "Estilizando Componentes – Introdução",
    subtitle: "Existem várias formas de estilizar componentes em React. Vamos focar nas mais simples, sem bibliotecas extras.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>CSS tradicional (arquivos <code>.css</code> globais).</li>
          <li>Estilos inline, usando o atributo <code>style</code> no JSX.</li>
          <li>CSS Modules, com escopo local por componente.</li>
        </ul>
        <Note>
          Tudo com CSS + React, sem Tailwind, Styled Components ou outras libs de estilo.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 3: CSS Tradicional - Estilos Globais
  {
    title: "CSS Tradicional – Estilos Globais",
    subtitle: "Primeiro, vamos criar estilos globais que se aplicam a toda a aplicação.",
    content: (
      <>
        <SlideColumn>
          <Pill>Passos</Pill>
          <ul>
            <li>Dentro de <code>src</code>, crie a pasta <code>styles</code>.</li>
            <li>Crie o arquivo <code>globals.css</code>.</li>
            <li>Defina resets e estilos padrão (body, h1, h2...).</li>
          </ul>
          <Note>
            Esses estilos serão aplicados em qualquer componente, pois o CSS é global.
          </Note>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="src/styles/globals.css">{`* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto;
}

h1 {
  font-size: 3rem;
}

h2 {
  color: #f64348;
  font-size: 2rem;
}`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 4: CSS Tradicional - Resultado
  {
    title: "CSS Tradicional – Resultado",
    subtitle: "Para aplicar o arquivo global, basta importá-lo no ponto de entrada da aplicação.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li><code>main.jsx</code> é o arquivo que renderiza o <code>&lt;App /&gt;</code>.</li>
            <li>Ao importar <code>./styles/globals.css</code>, os estilos valem para toda a app.</li>
            <li>Sem precisar importar o CSS em cada componente individualmente.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="src/main.jsx">{`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles/globals.css"

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 5: Estilos Inline - Conceito
  {
    title: "Estilos Inline – Conceito",
    subtitle: "A segunda forma é usar estilos inline, diretamente no JSX via atributo style.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li><code>style</code> recebe um <strong>objeto JavaScript</strong>.</li>
          <li>As propriedades CSS usam <strong>camelCase</strong>: <code>backgroundColor</code>, <code>minHeight</code>.</li>
          <li>Os valores normalmente são <strong>strings</strong>: <code>"#2c2c2d"</code>, <code>"100vh"</code>.</li>
          <li>As propriedades do objeto são separadas por vírgula.</li>
        </ul>
        <Note>
          Como estamos "na terra do JavaScript", seguimos as regras de objeto JS, e não a sintaxe de string do CSS.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 6: Estilos Inline - Exemplos Práticos
  {
    title: "Estilos Inline – Exemplos Práticos",
    subtitle: "Vamos estilizar a div principal do App e os componentes de título usando estilos inline.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>Container principal com grid, altura mínima e alinhamento central.</li>
            <li><code>Title</code> com cor clara.</li>
            <li><code>Subtitle</code> com cor clara e expressão JS no conteúdo.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="App + Title + Subtitle">{`export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#2c2c2d",
        display: "grid",
        minHeight: "100vh",
        placeContent: "center",
        textAlign: "center"
      }}
    >
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  )
}

export default function Title() {
  const tech = "React"
  return <h1 style={{ color: "#e5e5e5" }}>
           {tech} is awesome!
         </h1>
}

const Subtitle = () => (
  <h2 style={{ color: "#e5e5e5" }}>
    It's easy, like 1 + 1 is {1 + 1}
  </h2>
)`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 7: Estilos Inline - Valores Dinâmicos
  {
    title: "Estilos Inline – Valores Dinâmicos",
    subtitle: "Estilos inline são ótimos para lidar com valores dinâmicos baseados em variáveis e estados.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>Podemos usar operadores ternários e qualquer lógica JS para definir estilos.</li>
          <li>Exemplo: cor verde para status ON e vermelha para status OFF.</li>
        </ul>
        <CodeBlock label="StatusText.jsx">{`export default () => {
  const status = true

  return (
    <h2
      style={{
        color: status ? "#00ff9f" : "#f64348"
      }}
    >
      Current status: {status ? "ON" : "OFF"}
    </h2>
  )
}`}</CodeBlock>
        <Note>
          Lembre: estilos inline têm prioridade sobre estilos globais e valem apenas para aquele elemento.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 8: CSS Modules - Introdução
  {
    title: "CSS Modules – Introdução",
    subtitle: "CSS Modules são arquivos .module.css que viram módulos JS com escopo local.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>Nome dos arquivos: <code>NomeDoComponente.module.css</code>.</li>
          <li>Importados como um objeto JS: <code>import styles from "./App.module.css"</code>.</li>
          <li>Cada classe é mapeada para um nome único, evitando conflitos globais.</li>
        </ul>
        <Note>
          Permitem separar estilização do componente, mantendo todos os benefícios do CSS tradicional.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 9: CSS Modules - Na Prática
  {
    title: "CSS Modules – Na Prática",
    subtitle: "Vamos mover o estilo do container para um CSS Module e utilizá-lo no App.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="App.module.css">{`.app {
  background-color: #2c2c2d;
  display: grid;
  min-height: 100vh;
  place-content: center;
  text-align: center;
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="App.jsx">{`import StatusText from "./components/StatusText"
import Subtitle from "./components/Subtitle"
import Title from "./components/Title"
import styles from "./App.module.css"

export default function App() {
  return (
    <div className={styles.app}>
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  )
}`}</CodeBlock>
          <Note>
            O código fica mais organizado, com layout no CSS e lógica/estrutura no JSX.
          </Note>
        </SlideColumn>
      </>
    )
  },

  // Slide 10: Comparação de Métodos de Estilização
  {
    title: "Comparação de Métodos de Estilização",
    subtitle: "Não existe uma abordagem \"melhor\" em termos absolutos. Cada uma é mais adequada a um tipo de problema.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            <strong>CSS Global</strong>
            <ul>
              <li>Bom para resets, tipografia, layout base.</li>
              <li>Risco de conflitos de nomes.</li>
            </ul>
          </li>
          <li>
            <strong>Estilos Inline</strong>
            <ul>
              <li>Ótimos para mudanças rápidas e estilos dinâmicos.</li>
              <li>Ficam verbosos se usados para todo o layout.</li>
            </ul>
          </li>
          <li>
            <strong>CSS Modules</strong>
            <ul>
              <li>Escopo local, evita conflitos.</li>
              <li>Bom para componentes mais complexos e páginas inteiras.</li>
            </ul>
          </li>
        </ul>
        <Note>
          A escolha deve ser guiada pelo contexto: global vs. local, simples vs. complexo, estático vs. dinâmico.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 11: Fragment - O Problema
  {
    title: "Fragment – O Problema",
    subtitle: "No JSX, o componente deve sempre retornar um único elemento pai.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>Não é permitido retornar dois elementos irmãos diretamente.</li>
            <li>Exemplo: um <code>&lt;h1&gt;</code> e um <code>&lt;Card /&gt;</code> soltos.</li>
            <li>Isso gera erro de compilação do JSX.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Exemplo com erro">{`import Card from "./components/Card"

export default function App() {
  return (
    <h1>Exercício 2</h1>
    <Card />
  )
}`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 12: Fragment - A Solução
  {
    title: "Fragment – A Solução",
    subtitle: "Clássica solução: embrulhar tudo em um elemento pai, normalmente uma <div>.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>Funciona, mas pode gerar excesso de <code>&lt;div&gt;</code> no HTML.</li>
            <li>O React oferece o <code>Fragment</code> para ter um "pai invisível".</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="div vs Fragment">{`// Com div
export default function App() {
  return (
    <div>
      <h1>Exercício 2</h1>
      <Card />
    </div>
  )
}

// Com Fragment
import { Fragment } from "react"

export default function App() {
  return (
    <Fragment>
      <h1>Exercício 2</h1>
      <Card />
    </Fragment>
  )
}`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 13: Fragment - Sintaxe Curta
  {
    title: "Fragment – Sintaxe Curta",
    subtitle: "A sintaxe curta <> </> permite usar Fragment sem importar nada.",
    isFull: true,
    content: (
      <SlideColumn>
        <CodeBlock label="Sintaxe curta">{`import Card from "./components/Card"

export default function App() {
  return (
    <>
      <h1>Exercício 2</h1>
      <Card />
    </>
  )
}`}</CodeBlock>
        <Note>
          Mesmo efeito: respeita a regra do JSX (um pai só) sem poluir o HTML com elementos extras.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 14: Reutilizando Componentes
  {
    title: "Reutilizando Componentes",
    subtitle: "Componentes existem para serem reutilizados. Basta renderizá-los mais de uma vez.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>No exercício do Card, podemos mostrar vários cards numa mesma página.</li>
            <li>Todos usam a mesma definição de componente.</li>
            <li>Neste momento, eles ainda são idênticos.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Reutilizando Card">{`import Card from "./components/Card"

export default function App() {
  return (
    <>
      <h1>Exercício 2</h1>
      <Card />
      <Card />
      <Card />
    </>
  )
}`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 15: Criando Button Reutilizável
  {
    title: "Criando Button Reutilizável",
    subtitle: "Vamos criar um componente Button que pode ser reutilizado em qualquer lugar da aplicação.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="components/Button/index.jsx">{`import styles from "./styles.module.css"

export default function Button() {
  return (
    <button className={styles.wrapper}>
      Comprar agora
    </button>
  )
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="components/Button/styles.module.css">{`.wrapper {
  background-color: #121212;
  border: 0;
  border-radius: .5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  color: #fff;
  font-size: 1rem;
  margin-top: 2rem;
  padding: .75em 1.25em;
  transition: .3s;
}

.wrapper:hover {
  cursor: pointer;
  margin-left: .5rem;
}`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 16: Props - Introdução
  {
    title: "Props – Introdução",
    subtitle: "Props são \"argumentos\" que passamos para componentes para torná-los dinâmicos e configuráveis.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>No exercício do Card, temos 3 cards iguais na tela.</li>
          <li>Queremos que cada card tenha título e imagem diferentes.</li>
          <li>Em vez de criar 3 componentes diferentes, usamos props.</li>
        </ul>
        <Note>
          Assim como passamos atributos para tags HTML, passamos props para componentes React.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 17: Props - Passando Atributos
  {
    title: "Props – Passando Atributos",
    subtitle: "Primeiro, fazemos o componente aceitar um parâmetro (normalmente chamado props).",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="Card.jsx">{`export default function Card(props) {
  return (
    // ...
  )
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="App.jsx">{`import Card from "./components/Card"

export default function App() {
  return (
    <>
      <h1>Exercício 2</h1>
      <Card title="Pôster: Star Wars (1977)" />
      <Card title="Pôster: Empire Strikes Back (1980)" />
      <Card title="Pôster: Return of the Jedi (1983)" />
    </>
  )
}`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 18: Props - Usando no Componente
  {
    title: "Props – Usando no Componente",
    subtitle: "Dentro do componente, usamos props.algumaCoisa para acessar o valor enviado.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="Card.jsx">{`import posterImg from "../../assets/sw-poster.jpg"
import styles from "./styles.module.css"

export default function Card(props) {
  return (
    <div className={styles.container}>
      <img
        className={styles.poster}
        src={posterImg}
        alt="Star Wars poster"
      />
      <div>
        <h2 className={styles.title}>
          {props.title}
        </h2>
        <p className={styles.description}>
          Um pôster decorativo épico do filme Star Wars...
        </p>
        <button className={styles.button}>
          Comprar agora
        </button>
      </div>
    </div>
  )
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <Note>
            A estrutura do Card é a mesma, mas o conteúdo (título) muda conforme a prop enviada no JSX.
          </Note>
        </SlideColumn>
      </>
    )
  },

  // Slide 19: Props - Múltiplas Props
  {
    title: "Props – Múltiplas Props",
    subtitle: "Podemos passar várias props, não apenas texto, mas também imagens, números, etc.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="App.jsx">{`import Card from "./components/Card"
import swPosterImg from "./assets/sw-poster.jpg"
import esbPosterImg from "./assets/esb-poster.jpg"
import rotjPosterImg from "./assets/rotj-poster.jpg"

export default function App() {
  return (
    <>
      <h1>Exercício 2</h1>
      <Card
        title="Pôster: Star Wars (1977)"
        poster={swPosterImg}
      />
      <Card
        title="Pôster: Empire Strikes Back (1980)"
        poster={esbPosterImg}
      />
      <Card
        title="Pôster: Return of the Jedi (1983)"
        poster={rotjPosterImg}
      />
    </>
  )
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <Note>
            Agora cada Card recebe título e imagem específicos, mas todos usam a mesma definição de componente.
          </Note>
        </SlideColumn>
      </>
    )
  },

  // Slide 20: Props - Desestruturação
  {
    title: "Props – Desestruturação",
    subtitle: "É comum desestruturar props direto na assinatura da função para evitar repetir props.",
    isFull: true,
    content: (
      <SlideColumn>
        <CodeBlock label="Card.jsx (desestruturado)">{`import styles from "./styles.module.css"

export default function Card({ title, poster }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.poster}
        src={poster}
        alt={title}
      />
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          Um pôster decorativo épico do filme.
        </p>
        <button className={styles.button}>
          Comprar agora
        </button>
      </div>
    </div>
  )
}`}</CodeBlock>
        <Note>
          Fica mais legível quando o componente usa muitas props.
        </Note>
      </SlideColumn>
    )
  },

  // Slide 21: Children - O Problema
  {
    title: "Children – O Problema",
    subtitle: "Às vezes, só props \"planas\" não são suficientes. Precisamos passar estruturas de conteúdo mais ricas.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>Um componente <code>Title</code> que recebe apenas <code>text</code> fica limitado.</li>
            <li>Se quisermos ícones, botões, spans, teríamos que criar muitas props específicas.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Title limitado">{`import styles from "./styles.module.css"

export default function Title(props) {
  return (
    <h2 className={styles.wrapper}>
      {props.text}
    </h2>
  )
}

// Uso em Profile
<Title text={props.name} />`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 22: Children - A Solução
  {
    title: "Children – A Solução",
    subtitle: "A prop especial children representa tudo o que é passado entre as tags do componente.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li><code>children</code> é recebida automaticamente em todos os componentes.</li>
            <li>Podemos usá-la no lugar de uma prop como <code>text</code>.</li>
            <li>Isso abre espaço para qualquer JSX dentro do componente.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Title com children">{`import styles from "./styles.module.css"

export default function Title(props) {
  return (
    <h2 className={styles.wrapper}>
      {props.children}
    </h2>
  )
}

// Uso
<Title>{props.name}</Title>`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 23: Children - Flexibilidade
  {
    title: "Children – Flexibilidade",
    subtitle: "Com children, podemos passar qualquer combinação de elementos para dentro do componente.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>Texto + botão, ícones, spans, links etc.</li>
            <li>O componente <code>Title</code> continua simples e genérico.</li>
            <li>Não precisamos alterar o componente sempre que mudarmos o layout interno.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Title flexível">{`<Title>
  <span>{props.name}</span>
  <button>Follow</button>
</Title>`}</CodeBlock>
          <Note>
            O Title não sabe que existe um botão; ele só renderiza o que veio em children.
          </Note>
        </SlideColumn>
      </>
    )
  },

  // Slide 24: Children - ProfileSection
  {
    title: "Children – ProfileSection",
    subtitle: "Vamos criar o ProfileSection para substituir <div> com estilos de seção.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="ProfileSection.jsx">{`import styles from "./styles.module.css"

export default function ProfileSection(props) {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  )
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Uso em Profile">{`<ProfileSection>{props.bio}</ProfileSection>
<ProfileSection>{props.phone}</ProfileSection>
<ProfileSection>{props.email}</ProfileSection>
<ProfileSection>
  <div className={styles.links}>
    <a href={props.githubUrl} target="_blank">GitHub</a>
    <a href={props.linkedinUrl} target="_blank">LinkedIn</a>
    <a href={props.twitterUrl} target="_blank">Twitter</a>
  </div>
</ProfileSection>`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 25: Children - LinkButton
  {
    title: "Children – LinkButton",
    subtitle: "O LinkButton usa children para o texto interno e href para o destino.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="LinkButton.jsx">{`import styles from "./styles.module.css"

export default function LinkButton(props) {
  return (
    <a
      className={styles.wrapper}
      href={props.href}
      target="_blank"
    >
      {props.children}
    </a>
  )
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Uso em Profile">{`<ProfileSection>
  <div className={styles.links}>
    <LinkButton href={props.githubUrl}>
      GitHub
    </LinkButton>
    <LinkButton href={props.linkedinUrl}>
      LinkedIn
    </LinkButton>
    <LinkButton href={props.twitterUrl}>
      Twitter
    </LinkButton>
  </div>
</ProfileSection>`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 26: Rest Params com Props
  {
    title: "Rest Params com Props",
    subtitle: "Podemos repassar qualquer prop recebida pelo componente para o elemento interno usando {...props}.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>Queremos passar <code>className</code>, <code>id</code>, <code>data-*</code>, <code>aria-*</code> para a <code>&lt;div&gt;</code> de <code>ProfileSection</code>.</li>
            <li>Em vez de listar manualmente, usamos o operador spread <code>...props</code>.</li>
            <li>Tomamos cuidado para manter a classe base <code>styles.wrapper</code>.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="ProfileSection.jsx (rest props)">{`import styles from "./styles.module.css"

export default function ProfileSection(props) {
  return (
    <div
      {...props}
      className={\`\${styles.wrapper} \${props.className}\`}
    >
      {props.children}
    </div>
  )
}`}</CodeBlock>
          <CodeBlock label="Uso com props extras">{`<ProfileSection
  className={styles.links}
  id="links-section"
  data-test="some value"
  aria-label="social links"
>
  <LinkButton href={props.githubUrl}>GitHub</LinkButton>
  <LinkButton href={props.linkedinUrl}>LinkedIn</LinkButton>
  <LinkButton href={props.twitterUrl}>Twitter</LinkButton>
</ProfileSection>`}</CodeBlock>
        </SlideColumn>
      </>
    )
  },

  // Slide 27: Resumo e Próximos Passos
  {
    title: "Resumo e Próximos Passos",
    subtitle: "Fechando a aula com um panorama do que você viu e para onde podemos avançar.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            Três formas de estilização:
            <ul>
              <li>CSS Global.</li>
              <li>Estilos Inline (incluindo valores dinâmicos).</li>
              <li>CSS Modules.</li>
            </ul>
          </li>
          <li>Uso de <code>Fragment</code> e sintaxe curta <code>&lt;&gt; &lt;/&gt;</code>.</li>
          <li>Reutilização de componentes (<code>Card</code>, <code>Button</code>, <code>LinkButton</code>).</li>
          <li>Props para parametrizar componentes: títulos, imagens e outros dados.</li>
          <li><code>children</code> para composição de layouts mais ricos.</li>
          <li>Rest props (<code>{'{'}...props{'}'}</code>) para repassar atributos ao DOM.</li>
        </ul>
        <Note>
          Próximos passos: callbacks via props (eventos), validação de props, padrões de composição mais avançados e bibliotecas de estilo.
        </Note>
      </SlideColumn>
    )
  }
]
