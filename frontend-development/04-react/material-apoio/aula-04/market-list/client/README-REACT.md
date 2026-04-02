# Market List - React Frontend

Frontend React para a aplicação Market List - Lista de Compras com integração a API.

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Header.js        # Cabeçalho com título e banner
│   ├── AddItemForm.js   # Formulário para adicionar itens
│   ├── ItemList.js      # Tabela de itens
│   └── ItemRow.js       # Linha individual de item
├── services/           # Serviços e chamadas à API
│   └── api.js         # Funções para comunicação com backend
├── App.js             # Componente principal
├── index.js           # Entry point
└── styles.css         # Estilos globais

public/
└── index.html         # HTML template
```

## 🚀 Instalação e Execução

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar Servidor de Desenvolvimento

```bash
npm start
```

A aplicação abrirá no navegador em `http://localhost:3000`

## 📝 Funcionalidades

- ✅ **Listar Produtos**: Carrega produtos do backend ao inicializar
- ✅ **Adicionar Produto**: Formulário para adicionar novos itens
- ✅ **Deletar Produto**: Botão para remover itens da lista
- ✅ **Validação**: Validação de dados antes de enviar para API

## 🔌 Integração com API

A aplicação se comunica com o backend em `http://127.0.0.1:5000` através de:

- `GET /produtos` - Buscar todos os produtos
- `POST /produto` - Adicionar novo produto
- `DELETE /produto` - Deletar produto via JSON no body

As chamadas estão centralizadas no arquivo `/src/services/api.js`.

## ⚛️ Padrões React Utilizados

### useEffect
Utilizado para:
- Carregar produtos ao montar o componente
- Integração com API (fetch assíncrono)

```javascript
useEffect(() => {
  loadProducts();
}, []);
```

### useState
Gerencia estado dos:
- Produtos (lista)
- Campos do formulário (nome, quantidade, valor)
- Loading

### Componentização
Componentes separados e reutilizáveis:
- `Header` - Cabeçalho puro
- `AddItemForm` - Formulário controlado
- `ItemList` - Container de itens
- `ItemRow` - Item individual

## 🎨 Estilos

Os estilos foram mantidos idênticos aos do projeto original em `styles.css`.

## 📦 Dependências

- `react: ^18.2.0`
- `react-dom: ^18.2.0`
- `react-scripts: 5.0.1`

## 🔧 Scripts Disponíveis

```bash
# Iniciar desenvolvimento
npm start

# Build para produção
npm run build

# Rodar testes
npm test

# Ejetar configuração
npm run eject
```

## 📌 Notas Importantes

- A interface visual foi mantida 100% igual ao projeto original
- Toda a lógica foi refatorada para padrões React modernos
- useEffect é utilizado para todas as requisições assíncronas
- Componentes são funcionais (não há componentes de classe)
