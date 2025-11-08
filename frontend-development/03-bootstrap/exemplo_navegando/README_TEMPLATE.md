# Sistema de Templates - Exemplo Navegando

## Estrutura do Projeto

Este projeto utiliza um arquivo `base.html` que contém todos os elementos repetitivos (navbar, footer, links CSS/JS) e cada página específica deve copiar esse conteúdo base e inserir seu conteúdo nos blocos marcados.

## Blocos Disponíveis

### 1. **BLOCK: meta_tags**
Meta tags específicas de cada página (description, keywords, author).

```html
<!-- BLOCK: meta_tags -->
<meta name="description" content="Descrição específica da página">
<meta name="keywords" content="palavras, chave, específicas">
<meta name="author" content="Empresa">
<!-- END BLOCK: meta_tags -->
```

### 2. **BLOCK: title**
Título da página que aparece na aba do navegador.

```html
<!-- BLOCK: title -->
<title>Nome da Página - Empresa</title>
<!-- END BLOCK: title -->
```

### 3. **BLOCK: nav_items**
Itens do menu de navegação. Use a classe `active` no link da página atual.

```html
<li class="nav-item">
  <a class="nav-link active" href="index.html">Home</a>
</li>
```

### 4. **BLOCK: content**
Conteúdo principal específico de cada página.

```html
<!-- BLOCK: content -->
<section class="py-5">
  <div class="container">
    <!-- Seu conteúdo aqui -->
  </div>
</section>
<!-- END BLOCK: content -->
```

### 5. **BLOCK: extra_css** (opcional)
CSS adicional específico da página.

```html
<!-- BLOCK: extra_css -->
<style>
  /* Estilos específicos */
</style>
<!-- END BLOCK: extra_css -->
```

### 6. **BLOCK: extra_js** (opcional)
JavaScript adicional específico da página.

```html
<!-- BLOCK: extra_js -->
<script>
  // Scripts específicos
</script>
<!-- END BLOCK: extra_js -->
```

## Como Criar uma Nova Página

1. Copie o conteúdo de `base.html`
2. Substitua os blocos marcados pelo conteúdo específico da página
3. Adicione a classe `active` no item de navegação correspondente
4. Salve com o nome apropriado (ex: `about.html`, `services.html`)

## Exemplo: index.html

```html
<!-- BLOCK: title -->
<title>Home - Empresa</title>
<!-- END BLOCK: title -->

<!-- No nav, marcar Home como active -->
<li class="nav-item">
  <a class="nav-link active" href="index.html">Home</a>
</li>

<!-- BLOCK: content -->
<section class="py-5 bg-primary text-white">
  <div class="container">
    <h1>Bem-vindo!</h1>
    <!-- Conteúdo da home -->
  </div>
</section>
<!-- END BLOCK: content -->
```

## Benefícios desta Abordagem

- ✅ **Manutenção Centralizada**: Navbar e Footer em um só lugar
- ✅ **Consistência**: Todas as páginas seguem a mesma estrutura
- ✅ **Fácil Migração**: Estrutura pronta para converter em templates Jinja2/Django
- ✅ **Documentação Clara**: Blocos bem marcados facilitam entendimento
