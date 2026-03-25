# 🎓 Apresentação React

Aplicação de apresentação de slides interativa construída com React e Vite, cobrindo os fundamentos do React desde os conceitos básicos até boas práticas de componentização.

## 📋 Conteúdo da Apresentação

A apresentação inclui 11 slides abordando:

1. **O que é React** - Introdução à biblioteca e suas vantagens
2. **Quem Usa React?** - Empresas que utilizam React em produção
3. **Virtual DOM** - Como o React otimiza atualizações de interface
4. **JSX** - Sintaxe de extensão do JavaScript
5. **Componentes** - Blocos de construção reutilizáveis
6. **VITE** - Ferramenta moderna de build
7. **Dados Dinâmicos** - Renderização de variáveis
8. **Expressões em JSX** - Operações e chamadas de funções
9. **Operador Ternário** - Renderização condicional
10. **Separando em Componentes** - Modularização do código
11. **Boa Prática** - Organização de arquivos e pastas

## 🏗️ Estrutura do Projeto

```
apresentacao-react/
├── src/
│   ├── components/
│   │   ├── Slide.jsx              # Componente wrapper do slide
│   │   ├── Navigation.jsx         # Botões de navegação
│   │   ├── SlideCounter.jsx       # Contador de slides
│   │   └── slides/
│   │       ├── Slide01.jsx        # O que é React
│   │       ├── Slide02.jsx        # Quem usa React
│   │       ├── Slide03.jsx        # Virtual DOM
│   │       ├── Slide04.jsx        # JSX
│   │       ├── Slide05.jsx        # Componentes
│   │       ├── Slide06.jsx        # VITE
│   │       ├── Slide07.jsx        # Dados Dinâmicos
│   │       ├── Slide08.jsx        # Expressões em JSX
│   │       ├── Slide09.jsx        # Operador Ternário
│   │       ├── Slide10.jsx        # Separando Componentes
│   │       └── Slide11.jsx        # Boas Práticas
│   ├── App.jsx                    # Componente principal
│   ├── main.jsx                   # Ponto de entrada
│   └── index.css                  # Estilos globais
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Paleta de Cores

A apresentação utiliza uma paleta de cores cuidadosamente escolhida:

- **Well Read** (#a3322c) - Títulos e destaques principais
- **Ebb** (#f0eae9) - Fundos e elementos claros
- **Zeus** (#201c19) - Textos e blocos de código
- **Quicksand** (#b99592) - Subtítulos e gradientes

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Navegue até o diretório do projeto
cd apresentacao-react

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Build para Produção

```bash
# Gera build otimizado
npm run build

# Preview do build de produção
npm run preview
```

## ⌨️ Atalhos de Teclado

- **Seta Esquerda (←)** - Slide anterior
- **Seta Direita (→)** - Próximo slide

## 🎯 Funcionalidades

- ✅ Navegação entre slides com botões e teclado
- ✅ Contador de slides atual/total
- ✅ Animações suaves de transição
- ✅ Design responsivo (16:9)
- ✅ Componentes modulares e reutilizáveis
- ✅ Sintaxe JSX moderna
- ✅ Hot Module Replacement (HMR)

## 🧩 Componentes Principais

### `App.jsx`
Gerencia o estado da apresentação, controla a navegação e renderiza todos os slides.

### `Slide.jsx`
Componente wrapper que recebe uma prop `isActive` para controlar a visibilidade do slide.

### `Navigation.jsx`
Botões de navegação com estados habilitado/desabilitado baseado na posição atual.

### `SlideCounter.jsx`
Exibe o número do slide atual e o total de slides.

### `slides/Slide0X.jsx`
Cada slide é um componente independente com seu próprio conteúdo.

## 🛠️ Tecnologias

- **React 18** - Biblioteca para interfaces
- **Vite 5** - Build tool e dev server
- **CSS3** - Estilização e animações

## 📚 Boas Práticas Implementadas

1. **Componentização** - Cada slide é um componente isolado
2. **Single Responsibility** - Componentes focados em uma única responsabilidade
3. **Props** - Comunicação clara entre componentes
4. **Hooks** - `useState` e `useEffect` para gerenciamento de estado e efeitos
5. **Organização de Pastas** - Estrutura clara e escalável
6. **CSS Moderno** - Variáveis CSS, Grid e Flexbox

## 📝 Personalização

### Adicionar Novos Slides

1. Crie um novo arquivo em `src/components/slides/`:
   ```jsx
   // Slide12.jsx
   export default function Slide12() {
     return (
       <>
         <h1>Título do Slide</h1>
         <p>Conteúdo do slide...</p>
       </>
     );
   }
   ```

2. Importe e adicione no array de slides em `App.jsx`:
   ```jsx
   import Slide12 from './components/slides/Slide12';
   
   const slides = [
     // ... slides existentes
     Slide12,
   ];
   ```

### Personalizar Cores

Edite as variáveis CSS em `src/index.css` para alterar a paleta de cores:

```css
/* Exemplo: alterar cor principal */
h1 {
  color: #sua-cor-aqui;
  border-bottom: 4px solid #sua-cor-aqui;
}
```

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 👨‍💻 Autor

Desenvolvido como material didático para ensino de React.

---

**Dica:** Use as setas do teclado para navegar pela apresentação! 🎉
