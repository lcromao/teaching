import { SlideColumn, Pill, Note, CodeBlock } from "../components/Slide/Slide";

export const slides = [
  {
    title: "Estados e Hooks no React",
    subtitle:
      "Como interfaces React reagem a eventos, guardam dados e sincronizam efeitos ao longo do tempo.",
    isFull: true,
    content: (
      <SlideColumn>
        <Pill>Aula 3</Pill>
        <ul>
          <li>
            Começamos com eventos: o momento em que a interface passa a reagir
            ao usuário.
          </li>
          <li>
            Entramos em <code>state</code> para fazer essas interações
            refletirem na tela.
          </li>
          <li>
            Avançamos para hooks, inputs controlados, <code>useRef</code> e{" "}
            <code>useEffect</code>.
          </li>
          <li>
            Fechamos preparando o terreno para a próxima aula, onde o{" "}
            <code>useEffect</code> encontra HTTP.
          </li>
        </ul>
        <Note>
          A ideia desta apresentação é mostrar a progressão natural da
          interatividade no React: evento, estado, renderização e efeitos.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "O que vamos ver hoje",
    subtitle: "Mapa da aula para orientar a progressão dos conceitos.",
    isFull: true,
    content: (
      <SlideColumn>
        <Pill>Agenda</Pill>
        <ul>
          <li>Eventos no React e padrões de handlers.</li>
          <li>
            <code>state</code> e <code>useState</code> como base da UI reativa.
          </li>
          <li>Visão geral de hooks, regras e criação de hooks customizados.</li>
          <li>
            Inputs controlados com <code>value</code> + <code>onChange</code>.
          </li>
          <li>
            Aplicações do estado: compartilhar dados, renderizar
            condicionalmente e listar itens.
          </li>
          <li>
            <code>useRef</code>, <code>useEffect</code> e ponte para a próxima
            aula.
          </li>
        </ul>
      </SlideColumn>
    ),
  },
  {
    title: "Eventos no React",
    subtitle:
      "A porta de entrada da interatividade: responder a ações do usuário sem usar addEventListener manualmente.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            No React, eventos são passados como <strong>props</strong> em
            camelCase.
          </li>
          <li>
            Exemplos: <code>onClick</code>, <code>onChange</code>,{" "}
            <code>onSubmit</code>.
          </li>
          <li>
            Essas props recebem <strong>funções</strong>, que serão executadas
            quando o evento acontecer.
          </li>
          <li>
            O React abstrai o listener para nós e integra tudo ao ciclo de
            renderização do componente.
          </li>
        </ul>
        <Note>
          A sintaxe muda um pouco em relação ao JavaScript do navegador, mas a
          ideia continua a mesma: reagir a interações.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "onClick na prática",
    subtitle:
      "O primeiro caso clássico: clicar em um botão para executar uma ação.",
    content: (
      <>
        <SlideColumn>
          <Pill>Fluxo</Pill>
          <ul>
            <li>
              O botão recebe a prop <code>onClick</code>.
            </li>
            <li>Essa prop aponta para uma função do próprio componente.</li>
            <li>
              Ao clicar, o React executa a função e nossa lógica roda
              normalmente.
            </li>
          </ul>
          <Note>
            Neste primeiro momento a ação pode ser simples, como um{" "}
            <code>alert</code>.
          </Note>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Profile.jsx">{`function handleClick() {
  alert("Você agora está seguindo!")
}

export default function Profile({ name }) {
  return (
    <Title>
      {name}
      <button onClick={handleClick}>
        Follow Me!
      </button>
    </Title>
  )
}`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Outros eventos comuns",
    subtitle:
      "Além do clique, trabalhamos com vários eventos para capturar intenções do usuário.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            <code>onChange</code>: disparado quando o valor de um input muda.
          </li>
          <li>
            <code>onSubmit</code>: usado em formulários para tratar o envio.
          </li>
          <li>
            <code>onFocus</code>: quando um campo recebe foco.
          </li>
          <li>
            <code>onBlur</code>: quando o foco sai de um campo.
          </li>
          <li>
            <code>onKeyDown</code>: quando uma tecla é pressionada.
          </li>
        </ul>
        <Note>
          Todos seguem o mesmo padrão: nome em camelCase e uma função como
          valor.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "Handlers e objeto de evento",
    subtitle:
      "Podemos escrever a lógica inline ou extraí-la para uma função nomeada, que também recebe o evento disparado.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="Inline">{`<button
  onClick={() => alert("Seguindo!")}
>
  Follow
</button>`}</CodeBlock>
          <Note>
            Funciona bem para ações muito curtas, mas pode deixar o JSX mais
            verboso.
          </Note>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Função nomeada">{`function handleClick(ev) {
  console.log(ev)
  alert("Você agora está seguindo!")
}

<button onClick={handleClick}>
  Follow
</button>`}</CodeBlock>
          <Note>
            Em geral preferimos extrair a função quando a lógica cresce ou será
            reutilizada.
          </Note>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Quando evento sozinho não resolve",
    subtitle:
      "Disparar uma função é importante, mas isso ainda não garante que a interface será atualizada.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>
              Uma variável comum do JavaScript até pode mudar de valor na
              memória.
            </li>
            <li>
              O problema é que o React não re-renderiza o componente só porque
              alteramos essa variável.
            </li>
            <li>
              Resultado: a lógica muda internamente, mas a tela continua igual.
            </li>
          </ul>
          <Note>
            É aqui que entra o conceito de <code>state</code>.
          </Note>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Tentativa sem state">{`let followButtonText = "Follow"

function handleClick() {
  alert("Você agora está seguindo!")
  followButtonText = "Following"
}

return (
  <button onClick={handleClick}>
    {followButtonText}
  </button>
)`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "O que é state",
    subtitle:
      "State é a memória reativa do componente: valores que o React acompanha e usa para renderizar a interface.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>É um valor guardado pelo React entre renderizações.</li>
          <li>
            Quando o estado muda, o componente pode ser renderizado novamente.
          </li>
          <li>
            Isso permite que mudanças do JavaScript apareçam de forma visível no
            DOM.
          </li>
          <li>É a base de quase toda interação mais rica em React.</li>
        </ul>
        <Note>
          Eventos disparam ações. O <code>state</code> faz a interface “lembrar”
          e refletir essas ações.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "useState: forma básica",
    subtitle: "O hook que conecta o componente ao sistema de estado do React.",
    content: (
      <>
        <SlideColumn>
          <Pill>Primeiro contato</Pill>
          <ul>
            <li>
              <code>useState</code> recebe um valor inicial.
            </li>
            <li>Ele retorna uma tupla com dois elementos.</li>
            <li>Podemos acessar esses elementos pelo índice do array.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Forma crua">{`import { useState } from "react"

export default function Profile() {
  const state = useState("Follow")

  return (
    <button>
      {state[0]}
    </button>
  )
}`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "useState: valor atual e setter",
    subtitle:
      "Na prática, quase sempre desestruturamos a tupla para obter o valor atual e a função modificadora.",
    isFull: true,
    content: (
      <SlideColumn>
        <CodeBlock label="Desestruturação">{`const [followText, setFollowText] =
  useState("Follow")`}</CodeBlock>
        <ul>
          <li>
            <code>followText</code> guarda o valor atual do estado.
          </li>
          <li>
            <code>setFollowText</code> é a função que atualiza esse valor.
          </li>
          <li>
            A convenção da comunidade é usar <code>set</code> + nome do estado.
          </li>
          <li>
            Ao chamar o setter, o React agenda uma nova renderização do
            componente.
          </li>
        </ul>
      </SlideColumn>
    ),
  },
  {
    title: "useState na prática",
    subtitle:
      "Agora o botão realmente muda de texto porque o React acompanha esse valor como estado.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>
              O estado começa como <code>"Follow"</code>.
            </li>
            <li>
              No clique, chamamos <code>setFollowText("Following")</code>.
            </li>
            <li>Na nova renderização, o botão passa a exibir o novo texto.</li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Profile.jsx">{`import { useState } from "react"

export default function Profile({ name }) {
  const [followText, setFollowText] =
    useState("Follow")

  function handleClick() {
    alert("Feito!")
    setFollowText("Following")
  }

  return (
    <Title>
      {name}
      <button onClick={handleClick}>
        {followText}
      </button>
    </Title>
  )
}`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Hooks: visão geral",
    subtitle:
      "Hooks são funções do React criadas para conectar componentes ao seu sistema interno.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            Todo hook segue a convenção de começar com <code>use</code>.
          </li>
          <li>
            Eles permitem acessar estado, efeitos, refs, contexto e outros
            recursos do React.
          </li>
          <li>
            <code>useState</code> foi o nosso primeiro hook, mas existem vários
            outros.
          </li>
          <li>
            Também podemos criar hooks personalizados para abstrair
            comportamentos.
          </li>
        </ul>
        <Note>
          Pense em hooks como a API do React para lidar com comportamento dentro
          de componentes funcionais.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "Hooks mais conhecidos",
    subtitle:
      "Nem todos serão aprofundados hoje, mas vale situar os mais famosos desde já.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            <code>useState</code>: estado local do componente.
          </li>
          <li>
            <code>useEffect</code>: sincronização com efeitos colaterais.
          </li>
          <li>
            <code>useRef</code>: valor persistente mutável e referência a
            elementos do DOM.
          </li>
          <li>
            <code>useContext</code>: acesso a valores compartilhados por
            contexto.
          </li>
        </ul>
        <Note>
          Nesta aula vamos trabalhar mais de perto com <code>useState</code>,{" "}
          <code>useRef</code> e <code>useEffect</code>.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "Regras dos hooks",
    subtitle:
      "Hooks são simples de usar, mas seguem regras rígidas porque o React depende da ordem em que eles aparecem.",
    content: (
      <>
        <SlideColumn>
          <Pill>Regras</Pill>
          <ul>
            <li>
              Só chame hooks em componentes React ou em outros hooks
              personalizados.
            </li>
            <li>Sempre chame hooks no topo da função.</li>
            <li>
              Não chame hooks dentro de <code>if</code>, loops, callbacks ou
              funções internas.
            </li>
          </ul>
          <Note>
            O React rastreia hooks pela ordem de execução, e não pelo nome das
            variáveis.
          </Note>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Exemplo inválido">{`function App() {
  const { count } = useCounter()
  let someState

  if (count > 10) {
    someState = useState("MAIOR QUE 10")
  }

  return <h1>{someState}</h1>
}`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Hooks customizados: por que criar",
    subtitle:
      "Quando uma lógica de estado ou comportamento começa a se repetir, podemos extraí-la para um hook próprio.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            Organizam melhor o componente, removendo lógica excessiva do JSX
            principal.
          </li>
          <li>Permitem reutilizar comportamento entre vários componentes.</li>
          <li>Continuam seguindo as mesmas regras dos hooks do React.</li>
          <li>
            Por convenção, também começam com <code>use</code>.
          </li>
        </ul>
        <Note>
          Um hook customizado não é um recurso especial do React: é uma função
          comum que usa hooks internamente.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "useCounter na prática",
    subtitle:
      "Exemplo simples de hook customizado para encapsular estado e ações relacionadas.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="hooks/useCounter.js">{`import { useState } from "react"

export default function useCounter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  return { count, increment }
}`}</CodeBlock>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="App.jsx">{`import useCounter from "./hooks/useCounter"

function App() {
  const { count, increment } = useCounter()

  return (
    <button onClick={increment}>
      Count is {count}
    </button>
  )
}`}</CodeBlock>
          <Note>
            Repare que o componente fica responsável pela UI, enquanto o hook
            concentra a lógica.
          </Note>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Inputs no React",
    subtitle:
      "Trabalhar com formulários quase sempre envolve ligar o valor do campo a um estado do componente.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            Inputs são fundamentais para capturar dados digitados pelo usuário.
          </li>
          <li>
            No React, podemos controlar esses valores com <code>state</code>.
          </li>
          <li>
            Isso nos permite validar, transformar e reaproveitar os dados com
            facilidade.
          </li>
          <li>O exemplo-base aqui será o gerador de senhas.</li>
        </ul>
      </SlideColumn>
    ),
  },
  {
    title: "value + onChange",
    subtitle:
      "A base dos inputs controlados: o estado fornece o valor, e o evento atualiza o estado.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>
              <code>value</code> diz qual valor o input deve exibir.
            </li>
            <li>
              <code>onChange</code> captura a nova digitação do usuário.
            </li>
            <li>
              Sem <code>onChange</code>, o campo fica “preso” ao valor atual.
            </li>
            <li>
              <code>ev.target.value</code> traz o conteúdo atual do input.
            </li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Input controlado">{`const [passwordSize, setPasswordSize] =
  useState(12)

<input
  type="number"
  id="passwordSize"
  min={1}
  value={passwordSize}
  onChange={(ev) =>
    setPasswordSize(Number(ev.target.value))
  }
/>`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Input controlado no gerador de senhas",
    subtitle:
      "O mesmo estado alimenta o campo, a lógica de geração e o texto mostrado na interface.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>O usuário altera o tamanho da senha no input.</li>
            <li>
              Esse valor é salvo em <code>passwordSize</code>.
            </li>
            <li>
              Depois ele é reutilizado na função <code>generate</code> e no
              botão.
            </li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="App.jsx">{`const [password, setPassword] = useState("")
const [passwordSize, setPasswordSize] =
  useState(12)

function generate() {
  let newPassword = ""

  for (let i = 0; i < passwordSize; i++) {
    // monta a senha
  }

  setPassword(newPassword)
}

<button onClick={generate}>
  Gerar senha de {passwordSize} caracteres
</button>`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "O que o estado permite construir",
    subtitle:
      "Depois que o estado entra no jogo, a interface pode se adaptar dinamicamente a dados e decisões.",
    isFull: true,
    content: (
      <SlideColumn>
        <Pill>Estado em ação</Pill>
        <ul>
          <li>
            Podemos compartilhar o mesmo valor entre componentes diferentes.
          </li>
          <li>Podemos mostrar ou esconder partes da interface.</li>
          <li>Podemos transformar arrays de dados em listas renderizadas.</li>
        </ul>
        <Note>
          Os próximos slides não introduzem novos hooks; eles mostram o que
          conseguimos construir a partir do estado.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "Compartilhando estado entre componentes",
    subtitle:
      "A forma mais simples de compartilhar estado é declarar no componente pai e passar valor + setter por props.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>Quando o estado fica no filho, o pai não consegue usá-lo.</li>
          <li>
            Ao “subir” o estado para o pai, ambos passam a trabalhar com a mesma
            fonte de verdade.
          </li>
          <li>
            Esse padrão é conhecido como <strong>lifting state up</strong>.
          </li>
        </ul>
        <CodeBlock label="Pai + Filho">{`// App.jsx
<Input
  passwordSize={passwordSize}
  setPasswordSize={setPasswordSize}
/>

// Input.jsx
export default function Input({
  passwordSize,
  setPasswordSize
}) {
  return (
    <input
      value={passwordSize}
      onChange={(ev) =>
        setPasswordSize(ev.target.value)
      }
    />
  )
}`}</CodeBlock>
      </SlideColumn>
    ),
  },
  {
    title: "Renderização condicional",
    subtitle:
      "O estado também pode decidir o que aparece e o que desaparece na tela.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            Um booleano como <code>showInput</code> já resolve muitos cenários.
          </li>
          <li>
            As formas mais comuns são operador ternário e curto-circuito com{" "}
            <code>&&</code>.
          </li>
          <li>
            Isso é muito útil para modais, loading, toggles e campos opcionais.
          </li>
        </ul>
        <CodeBlock label="Exemplo">{`const [showInput, setShowInput] =
  useState(false)

{showInput ? (
  <Input
    passwordSize={customSize}
    setPasswordSize={setCustomSize}
  />
) : null}

// ou
{showInput && <Input />}`}</CodeBlock>
      </SlideColumn>
    ),
  },
  {
    title: "Listas de dados",
    subtitle:
      "Interfaces reais renderizam coleções o tempo inteiro, e o React faz isso muito bem com arrays e map.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            Transformamos um array de dados em um array de elementos JSX com{" "}
            <code>.map()</code>.
          </li>
          <li>
            Cada item da lista precisa de uma prop <code>key</code> única.
          </li>
          <li>
            Isso ajuda o React a reconciliar corretamente os itens renderizados.
          </li>
        </ul>
        <CodeBlock label="games.map">{`{games.map((game) => (
  <div key={game.id}>
    <img
      src={game.coverImage}
      alt={game.title}
    />
    <h2>
      {game.title} ({game.releaseYear})
    </h2>
    <p>{game.description}</p>
  </div>
))}`}</CodeBlock>
      </SlideColumn>
    ),
  },
  {
    title: "useRef: persistência sem re-render",
    subtitle:
      "O useRef também guarda valor entre renderizações, mas alterar a ref não dispara uma nova renderização.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>Uma variável comum zera a cada render.</li>
            <li>
              <code>state</code> persiste e re-renderiza.
            </li>
            <li>
              <code>ref</code> persiste, mas não re-renderiza.
            </li>
          </ul>
          <Note>
            Isso torna <code>useRef</code> útil para casos específicos em que
            queremos guardar algo mutável sem atualizar a UI.
          </Note>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Comparação">{`let variable = 0
const ref = useRef(0)
const [state, setState] = useState(0)

<p>Variável: {variable}</p>
<p>Ref: {ref.current}</p>
<p>State: {state}</p>

<button onClick={() => variable++}>
  Aumentar Variável
</button>
<button onClick={() => ref.current++}>
  Aumentar Ref
</button>
<button onClick={() => setState(s => s + 1)}>
  Aumentar State
</button>`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Regra prática: state vs ref",
    subtitle:
      "A pergunta certa normalmente resolve a dúvida sobre qual dos dois usar.",
    isFull: true,
    content: (
      <SlideColumn>
        <Pill>Modelo mental</Pill>
        <ul>
          <li>
            Se a mudança precisa aparecer na tela, use <code>state</code>.
          </li>
          <li>
            Se você só quer guardar um valor entre renders sem atualizar a UI,
            use <code>ref</code>.
          </li>
          <li>
            <code>state</code> participa diretamente da renderização.
          </li>
          <li>
            <code>ref</code> persiste entre renderizações, mas fica fora do
            fluxo visual da interface.
          </li>
        </ul>
        <Note>
          Em resumo: <code>state</code> muda o que o usuário vê;{" "}
          <code>ref</code> ajuda o componente a lembrar de algo sem redesenhar a
          tela.
        </Note>
        <br />
        <br />
        <Pill>Casos reais</Pill>
        <ul>
          <li>
            <code>state</code>: mudar o texto de um botão de <code>Entrar</code>{" "}
            para <code>Entrando...</code>.
          </li>
          <li>
            <code>state</code>: controlar os campos de uma tela de login, abrir
            ou fechar um chatbox, mostrar erro de senha inválida.
          </li>
          <li>
            <code>ref</code>: colocar o cursor automaticamente no campo de
            e-mail quando a tela de login abrir.
          </li>
          <li>
            <code>ref</code>: levar o usuário até a última mensagem do chat ou
            acionar um botão escondido de anexo.
          </li>
        </ul>
      </SlideColumn>
    ),
  },
  {
    title: "useRef e DOM",
    subtitle:
      "Um dos usos mais comuns do useRef é guardar a referência de um elemento do DOM para manipulá-lo diretamente.",
    content: (
      <>
        <SlideColumn>
          <Pill>Caso comum</Pill>
          <ul>
            <li>
              Associamos a ref a um elemento com a prop <code>ref</code>.
            </li>
            <li>
              Depois acessamos esse elemento por <code>inputRef.current</code>.
            </li>
            <li>
              Isso permite focar, medir ou alterar esse elemento sem seletores
              manuais.
            </li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="RefExample.jsx">{`const inputRef = useRef(null)

const handleClick = () => {
  inputRef.current.focus()
  inputRef.current.style.backgroundColor =
    "#f64348"
}

return (
  <div>
    <input ref={inputRef} type="text" />
    <button onClick={handleClick}>Focar</button>
  </div>
)`}</CodeBlock>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Resumo mental do useRef",
    subtitle:
      "Duas frases simples resumem quase todos os casos iniciais de uso.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            <strong>“Quero lembrar algo sem re-renderizar.”</strong>
          </li>
          <li>
            <strong>“Quero apontar para um elemento do DOM.”</strong>
          </li>
        </ul>
        <CodeBlock label="Resumo">{`const ref = useRef(valorInicial)

ref.current = novoValor
// persiste entre renders
// mas não dispara renderização

<input ref={inputRef} />`}</CodeBlock>
        <Note>
          Se a sua intenção principal for atualizar a interface, o hook certo
          provavelmente é <code>useState</code>, e não <code>useRef</code>.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "useEffect: o que é um efeito colateral",
    subtitle:
      "O useEffect serve para sincronizar o componente com algo externo ao fluxo puro de renderização.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            Um efeito colateral é algo que acontece “por fora” do retorno do
            JSX.
          </li>
          <li>
            Exemplos: subscriptions, timers, integração com APIs, console e
            manipulações externas.
          </li>
          <li>
            <code>useEffect</code> recebe um callback e um array de
            dependências.
          </li>
          <li>
            Ele deve ser usado com critério, e não como resposta automática para
            qualquer mudança de estado.
          </li>
        </ul>
        <Note>
          Nesta aula vamos ficar na parte conceitual e local. O uso com HTTP
          entra na sequência do curso.
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "Pensando o useEffect",
    subtitle:
      "O melhor modelo mental é: algo que deve rodar depois da renderização.",
    content: (
      <>
        <SlideColumn>
          <ul>
            <li>O componente renderiza primeiro.</li>
            <li>O React atualiza a interface.</li>
            <li>
              Só depois disso o <code>useEffect</code> executa.
            </li>
            <li>
              Ele é útil quando existe algo para sincronizar fora do JSX puro.
            </li>
          </ul>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Exemplo">{`useEffect(() => {
  alert("O efeito foi ativado!")
}, [counter])`}</CodeBlock>
          <Note>
            Isso quer dizer:{" "}
            <strong>
              “Depois de renderizar, se <code>counter</code> mudou, execute esse
              efeito.”
            </strong>
          </Note>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Dependências, execução e cleanup",
    subtitle:
      "O comportamento do useEffect depende das dependências declaradas e da eventual função de limpeza retornada.",
    content: (
      <>
        <SlideColumn>
          <CodeBlock label="Dependências">{`const [counter, setCounter] = useState(0)

useEffect(() => {
  alert("O efeito colateral foi ativado!")
}, [counter])`}</CodeBlock>
          <Note>
            Com <code>[counter]</code>, o efeito roda quando esse valor muda.
            Sem array, ele roda em toda renderização.
          </Note>
        </SlideColumn>
        <SlideColumn>
          <CodeBlock label="Cleanup">{`useEffect(() => {
  console.log("O efeito foi ativado!")

  return () => {
    console.log(
      "Componente desmontado! Limpando..."
    )
  }
})`}</CodeBlock>
          <Note>
            A limpeza é importante para evitar recursos “pendurados” quando o
            componente sai da tela.
          </Note>
        </SlideColumn>
      </>
    ),
  },
  {
    title: "Quando faz sentido usar useEffect",
    subtitle:
      "Ele existe para sincronizar o componente com algo externo ao JSX.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>API.</li>
          <li>Timer.</li>
          <li>Listener.</li>
          <li>WebSocket.</li>
          <li>Manipulação externa.</li>
          <li>Logs e integrações.</li>
        </ul>
        <Note>
          Pergunta guia:{" "}
          <strong>
            “Quando a renderização terminar, o que eu preciso sincronizar ou
            executar?”
          </strong>
        </Note>
      </SlideColumn>
    ),
  },
  {
    title: "Resumo mental do useEffect",
    subtitle:
      "O hook não serve para qualquer reação a state, e sim para sincronização pós-render.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>
            <strong>
              “Quero fazer algo depois que o React terminar de renderizar.”
            </strong>
          </li>
          <li>
            <strong>
              “Quero sincronizar meu componente com algo de fora dele.”
            </strong>
          </li>
        </ul>
        <CodeBlock label="Cleanup">{`useEffect(() => {
  console.log("ativou")

  return () => {
    console.log("limpando")
  }
})`}</CodeBlock>
        <ul>
          <li>A limpeza roda antes do effect executar de novo.</li>
          <li>A limpeza também roda quando o componente desmonta.</li>
        </ul>
      </SlideColumn>
    ),
  },
  {
    title: "Regra prática muito boa",
    subtitle:
      "Uma síntese para decidir rapidamente qual ferramenta usar em React.",
    isFull: true,
    content: (
      <SlideColumn>
        <Pill>Regra de bolso</Pill>
        <CodeBlock label="Atalho mental">{`state  = memória que muda a tela
ref    = memória que não muda a tela
effect = reação pós-render para sincronização`}</CodeBlock>
        <ul>
          <li>
            Use <code>useState</code> quando a pergunta for:{" "}
            <strong>“Esse valor precisa aparecer na UI?”</strong>
          </li>
          <li>
            Use <code>useRef</code> quando a pergunta for:{" "}
            <strong>“Preciso lembrar disso sem re-renderizar?”</strong>
          </li>
          <li>
            Use <code>useEffect</code> quando a pergunta for:{" "}
            <strong>
              “Quando a renderização terminar, o que eu preciso sincronizar?”
            </strong>
          </li>
        </ul>
      </SlideColumn>
    ),
  },
  {
    title: "Resumo e próximos passos",
    subtitle:
      "Fechando a aula 3 com a visão geral do que mudou na forma como construímos interfaces React.",
    isFull: true,
    content: (
      <SlideColumn>
        <ul>
          <li>Eventos conectam a interface às ações do usuário.</li>
          <li>
            <code>useState</code> faz essas ações se refletirem na tela.
          </li>
          <li>Hooks seguem regras claras e também podem ser personalizados.</li>
          <li>
            Inputs controlados, compartilhamento de estado, condicionais e
            listas são aplicações diretas do estado.
          </li>
          <li>
            <code>useRef</code> persiste valores sem re-render.
          </li>
          <li>
            <code>useEffect</code> prepara o terreno para sincronização com
            sistemas externos.
          </li>
        </ul>
        <Note>
          Próxima etapa: usar <code>useEffect</code> com HTTP, pensar em
          loading, cuidado com re-renderizações e tratar falhas de forma
          explícita.
        </Note>
      </SlideColumn>
    ),
  },
];
