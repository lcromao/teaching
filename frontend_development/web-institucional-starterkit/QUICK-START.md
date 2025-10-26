# 🚀 Guia Rápido de Início

## ⚡ Em 3 Minutos

### 1️⃣ Abrir o Projeto
```bash
# Navegue até a pasta do projeto
cd web-institucional-starterkit

# Abra no navegador
open index.html
```

### 2️⃣ Personalizar Cores
Abra `assets/css/variables.css` e altere:
```css
:root {
  --primary-color: #SUA_COR;
  --secondary-color: #SUA_COR;
  --accent-color: #SUA_COR;
}
```

### 3️⃣ Alterar Logo
Substitua os arquivos em `assets/img/`:
- `logo.svg` - Seu logo
- `banner.svg` - Sua imagem hero

### 4️⃣ Editar Conteúdo
- **index.html** - Página inicial
- **about.html** - Sobre a empresa
- **services.html** - Serviços
- **contact.html** - Contato

---

## 🎨 Personalização Rápida

### Mudar Nome da Empresa
Busque e substitua "Empresa" por "Seu Nome" em todos os arquivos HTML.

### Adicionar Novas Seções
Copie uma seção existente e cole no mesmo arquivo:
```html
<section class="section">
  <div class="container">
    <!-- Seu conteúdo aqui -->
  </div>
</section>
```

### Trocar Cores dos Botões
```css
.btn-primary-custom {
  background-color: #SUA_COR;
  border-color: #SUA_COR;
}
```

---

## 🌗 Modo Escuro

### Ativar/Desativar
Clique no botão 🌙/☀️ no canto superior direito do navbar.

### Personalizar Cores do Modo Escuro
Edite em `assets/css/variables.css`:
```css
:root[data-theme="dark"] {
  --background-color: #1a1d20;
  --text-color: #e9ecef;
}
```

---

## 📱 Testar Responsividade

### No Navegador:
1. Pressione `F12` (DevTools)
2. Clique no ícone de dispositivo móvel
3. Teste em diferentes tamanhos

### Atalhos Úteis:
- **Chrome/Edge:** `Ctrl+Shift+M` (Windows) ou `Cmd+Shift+M` (Mac)
- **Firefox:** `Ctrl+Shift+M` (Windows) ou `Cmd+Shift+M` (Mac)

---

## 🔧 Problemas Comuns

### O modo escuro não funciona?
✅ Verifique se o script está carregando:
```html
<script src="assets/js/theme-toggle.js"></script>
```

### Estilos não aparecem?
✅ Verifique os caminhos dos arquivos CSS:
```html
<link rel="stylesheet" href="assets/css/variables.css">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/dark-mode.css">
```

### Imagens não carregam?
✅ Verifique se os arquivos existem em `assets/img/`

---

## 🚀 Próximos Passos

1. ✅ Altere cores e logo
2. ✅ Edite textos e imagens
3. ✅ Adicione suas informações de contato
4. ✅ Teste em diferentes dispositivos
5. ✅ Publique no seu servidor

---

## 📚 Documentação Completa

Leia o **README.md** para documentação detalhada.

---

## 💡 Dicas

- Use `section-alt` para seções com fundo alternado
- Use `card-custom` para cards personalizados
- Use `btn-primary-custom` para botões primários
- Use classes do Bootstrap quando possível

---

**Dúvidas?** Consulte o README.md ou a documentação do Bootstrap.
