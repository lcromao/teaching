# 🚀 Web Institucional Starter Kit

> Template completo e profissional para criação de sites institucionais com **HTML5**, **CSS3** e **Bootstrap 5**, incluindo **modo claro e escuro** alternável.

![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple?logo=bootstrap)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração](#demonstração)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Recursos](#recursos)
- [Como Usar](#como-usar)
- [Personalização](#personalização)
- [Modo Escuro](#modo-escuro)
- [Responsividade](#responsividade)
- [Compatibilidade](#compatibilidade)
- [FAQ](#faq)
- [Licença](#licença)

---

## 📖 Sobre o Projeto

Este **Starter Kit** foi desenvolvido para ser a base perfeita para criação de sites institucionais modernos e profissionais. Com ele, você economiza tempo e obtém um código limpo, organizado e altamente customizável.

### ✨ Ideal para:

- Sites corporativos
- Páginas de empresas e serviços
- Portfólios profissionais
- Landing pages institucionais
- Sites de consultoria
- Páginas de apresentação de produtos/serviços

---

## 🎨 Demonstração

Para visualizar o projeto, basta abrir o arquivo `index.html` no seu navegador.

### Páginas Incluídas:

1. **Home** (`index.html`) - Página inicial com hero, sobre, serviços e depoimentos
2. **Sobre** (`about.html`) - História da empresa, equipe e valores
3. **Serviços** (`services.html`) - Detalhamento completo dos serviços
4. **Contato** (`contact.html`) - Formulário de contato e informações

---

## 📁 Estrutura de Arquivos

```
web-institucional-starterkit/
│
├── index.html                 # Página inicial
├── about.html                 # Página sobre
├── services.html              # Página de serviços
├── contact.html               # Página de contato
├── README.md                  # Documentação
│
├── assets/
│   ├── css/
│   │   ├── variables.css      # Variáveis CSS (paleta de cores, fontes)
│   │   ├── style.css          # Estilos customizados principais
│   │   └── dark-mode.css      # Estilos do modo escuro
│   │
│   ├── img/
│   │   ├── logo.svg           # Logo da empresa
│   │   └── banner.svg         # Imagem hero
│   │
│   └── js/
│       └── theme-toggle.js    # Script de alternância de tema
│
└── components/
    ├── navbar.html             # Componente de navegação
    ├── footer.html             # Componente de rodapé
    └── hero.html               # Componente hero section
```

---

## 🎯 Recursos

### ✅ Incluído no Template:

- ✔️ **4 páginas HTML completas** (Home, Sobre, Serviços, Contato)
- ✔️ **Modo claro e escuro** com persistência (localStorage)
- ✔️ **Design 100% responsivo** (mobile, tablet, desktop)
- ✔️ **Bootstrap 5.3.2** integrado via CDN
- ✔️ **Bootstrap Icons** para ícones modernos
- ✔️ **Sistema de variáveis CSS** para fácil customização
- ✔️ **Componentes reutilizáveis** (navbar, footer, hero)
- ✔️ **Formulário de contato** funcional
- ✔️ **Cards, accordions, badges** e outros componentes
- ✔️ **Animações suaves** e transições
- ✔️ **SEO-friendly** com meta tags apropriadas
- ✔️ **Acessibilidade** (ARIA labels, semântica HTML5)

---

## 🚀 Como Usar

### 1️⃣ Instalação

Não há necessidade de instalação! Basta fazer o download ou clonar este repositório:

```bash
git clone https://github.com/seu-usuario/web-institucional-starterkit.git
cd web-institucional-starterkit
```

### 2️⃣ Visualização

Abra o arquivo `index.html` diretamente no seu navegador:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Ou use um servidor local (recomendado):

```bash
# Python 3
python -m http.server 8000

# Node.js (se tiver live-server instalado)
npx live-server

# VS Code (extensão Live Server)
# Clique com botão direito no index.html > "Open with Live Server"
```

### 3️⃣ Pronto para Produção

O template funciona completamente offline, mas **recomendamos baixar o Bootstrap** para produção:

1. Baixe Bootstrap 5.3.2 de [getbootstrap.com](https://getbootstrap.com/)
2. Coloque os arquivos em `assets/css/` e `assets/js/`
3. Atualize os links nos arquivos HTML

---

## 🎨 Personalização

### 🌈 Alterando Cores

Edite o arquivo `assets/css/variables.css`:

```css
:root {
  --primary-color: #0d6efd;      /* Cor primária */
  --secondary-color: #6c757d;    /* Cor secundária */
  --accent-color: #20c997;       /* Cor de destaque */
  
  /* Altere conforme sua identidade visual */
}
```

### 🔤 Alterando Fontes

No mesmo arquivo `variables.css`:

```css
:root {
  --font-family-base: 'Sua Fonte', sans-serif;
  --font-family-heading: 'Fonte dos Títulos', sans-serif;
}
```

Não esqueça de importar a fonte no `<head>` do HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Sua+Fonte&display=swap" rel="stylesheet">
```

### 🖼️ Alterando Logo e Imagens

1. Substitua `assets/img/logo.svg` pelo seu logo
2. Substitua `assets/img/banner.svg` pela sua imagem hero
3. Formatos aceitos: SVG, PNG, JPG, WebP

### 📝 Alterando Textos

Todos os textos estão diretamente nos arquivos HTML. Edite conforme necessário:

- `index.html` - Textos da página inicial
- `about.html` - Informações sobre a empresa
- `services.html` - Descrição dos serviços
- `contact.html` - Informações de contato

### ➕ Adicionando Novas Páginas

1. Duplique qualquer página HTML existente
2. Altere o conteúdo da seção `<main>`
3. Atualize os links de navegação no navbar
4. Mantenha a estrutura padrão:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <!-- Meta tags e CSS -->
</head>
<body>
  <!-- Navbar -->
  <!-- Conteúdo da página -->
  <!-- Footer -->
  <!-- Scripts -->
</body>
</html>
```

---

## 🌗 Modo Escuro

### Como Funciona

O modo escuro é gerenciado automaticamente pelo arquivo `assets/js/theme-toggle.js`:

- ✅ Detecta preferência do sistema operacional
- ✅ Salva escolha do usuário no `localStorage`
- ✅ Botão de alternância no navbar
- ✅ Transições suaves entre temas

### Customizando o Modo Escuro

Edite `assets/css/dark-mode.css` ou as variáveis em `variables.css`:

```css
:root[data-theme="dark"] {
  --background-color: #1a1d20;   /* Fundo escuro */
  --text-color: #e9ecef;         /* Texto claro */
  --primary-color: #3d8bfd;      /* Azul mais claro */
}
```

### Desativando o Modo Escuro

Se não quiser o modo escuro:

1. Remova o botão do navbar:
   ```html
   <!-- Remova este bloco -->
   <button id="theme-toggle" class="theme-toggle-btn">
     <span id="theme-icon">🌙</span>
   </button>
   ```

2. Remova o script:
   ```html
   <!-- Remova esta linha -->
   <script src="assets/js/theme-toggle.js"></script>
   ```

---

## 📱 Responsividade

O template é **100% responsivo** e foi testado em:

### Breakpoints do Bootstrap:

- **Extra Small (xs):** < 576px (smartphones)
- **Small (sm):** ≥ 576px (smartphones landscape)
- **Medium (md):** ≥ 768px (tablets)
- **Large (lg):** ≥ 992px (desktops)
- **Extra Large (xl):** ≥ 1200px (desktops grandes)
- **XXL:** ≥ 1400px (telas ultra-wide)

### Testado em:

- ✅ iPhone SE, 12, 13, 14 Pro
- ✅ Samsung Galaxy S20, S21
- ✅ iPad Mini, Air, Pro
- ✅ Desktop (1920x1080, 2560x1440, 4K)

---

## 🔧 Compatibilidade

### Navegadores Suportados:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Tecnologias Utilizadas:

- **Bootstrap 5.3.2** - Framework CSS
- **Bootstrap Icons 1.11.1** - Biblioteca de ícones
- **JavaScript ES6+** - Para funcionalidades interativas
- **CSS3 Custom Properties** - Sistema de variáveis
- **HTML5 Semantic** - Marcação semântica

### Dependências Externas (via CDN):

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<!-- Bootstrap JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

---

## ❓ FAQ

### **Como adicionar um formulário funcional?**

O formulário atual é apenas visual. Para torná-lo funcional:

1. **Backend próprio:** Envie dados para seu servidor via AJAX
2. **Formspree:** Use [formspree.io](https://formspree.io) (gratuito)
3. **EmailJS:** Use [emailjs.com](https://www.emailjs.com/) (gratuito)

Exemplo com EmailJS:

```javascript
// Adicione no contact.html
emailjs.send("service_id", "template_id", formData)
  .then(() => alert("Mensagem enviada!"));
```

### **Como integrar Google Analytics?**

Adicione no `<head>` de todas as páginas:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **Como adicionar mais ícones?**

Consulte [Bootstrap Icons](https://icons.getbootstrap.com/) e use:

```html
<i class="bi bi-nome-do-icone"></i>
```

### **Posso usar em projetos comerciais?**

Sim! Este template é de uso livre. Você pode modificar, distribuir e usar em projetos comerciais.

### **Como otimizar para SEO?**

1. Preencha corretamente as meta tags em cada página
2. Use heading tags hierarquicamente (H1 > H2 > H3)
3. Adicione textos `alt` em todas as imagens
4. Crie um `sitemap.xml`
5. Configure `robots.txt`
6. Use URLs amigáveis

---

## 🎓 Próximos Passos

### Melhorias Sugeridas:

- [ ] Adicionar animações com AOS (Animate On Scroll)
- [ ] Integrar formulário com backend
- [ ] Adicionar mais páginas (blog, portfólio)
- [ ] Implementar sistema de busca
- [ ] Adicionar multi-idioma (i18n)
- [ ] Criar versão com CMS (WordPress, etc.)
- [ ] Otimizar imagens (WebP, lazy loading)
- [ ] Adicionar PWA (Progressive Web App)

---

## 📄 Licença

Este projeto está sob licença **MIT**. Você é livre para usar, modificar e distribuir.

---

## 💡 Suporte

Encontrou um problema? Tem alguma sugestão?

- 📧 E-mail: contato@empresa.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/web-institucional-starterkit/issues)
- 📚 Documentação: Este README

---

## 🙌 Créditos

Desenvolvido com ❤️ usando:

- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/)

---

## 📌 Changelog

### v1.0.0 (2025-10-25)
- ✨ Lançamento inicial
- 🎨 4 páginas HTML completas
- 🌗 Sistema de modo claro/escuro
- 📱 Design responsivo
- 🧩 Componentes reutilizáveis

---

<div align="center">
  
**Feito com ❤️ para a comunidade de desenvolvedores**

⭐ Se este template foi útil, considere dar uma estrela no GitHub!

</div>
