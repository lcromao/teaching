# Roteiro de Exercícios: Cliente-Servidor e Protocolo HTTP

## 1. Endereçamento na Web: Endereços IP

- **Objetivo:** Entender como os computadores se encontram na internet.
- **Atividade:** O que acontece ao colar o IP `172.217.29.142` (um endereço do Google) diretamente no navegador?
  - *Observação:* O navegador deve exibir a página inicial do Google, demonstrando que o IP é o endereço real do servidor.

## 2. Portas de Comunicação

- **Objetivo:** Compreender o papel das portas na comunicação de rede.
- **Atividade Prática:** Testar a conexão com diferentes portas do Google.
  - `google.com:3000` (Provavelmente falhará, pois não é uma porta web padrão).
  - `google.com:80` (HTTP - Porta padrão para tráfego web não criptografado).
  - `google.com:443` (HTTPS - Porta padrão para tráfego web criptografado).
- **Discussão:** Por que algumas portas funcionam e outras não? A importância das portas padrão.

## 3. Protocolo HTTP na Prática com Telnet

- **Objetivo:** Visualizar uma requisição HTTP em sua forma bruta para entender o protocolo.
- **Passo a Passo:**
  1. Inicie um servidor local (ex: `uvicorn server:app --reload`).
  2. Em outro terminal, conecte-se ao servidor via Telnet:
     ```bash
     # Conecta ao servidor local na porta 8000
     telnet localhost 8000
     ```
  3. Após conectar, envie uma requisição HTTP GET manual. Pressione `Enter` após cada linha e `Enter` duas vezes no final para enviar a requisição.
     ```http
     GET / HTTP/1.1
     Host: localhost:8000

     ```
- **Resultado Esperado:** O servidor responderá com o cabeçalho e o corpo da resposta HTTP (o código HTML da página).

## 4. Analisando Requisições com as Ferramentas de Desenvolvedor (DevTools)

- **Objetivo:** Inspecionar o tráfego de rede gerado pelo navegador.
- **Atividade:**
  1. Abra o DevTools no navegador (F12 ou `Cmd+Option+I`).
  2. Navegue até a aba "Network" (Rede).
  3. Acesse `http://localhost:8000` e observe a lista de requisições.
- **Ponto de Reflexão:**
  > “O que o navegador exibe é fruto de requisições. Cada imagem, CSS e script é um diálogo separado entre cliente e servidor.”

## 5. Frontend, Backend e Ambiente de Desenvolvimento na Nuvem

- **Objetivo:** Conectar os conceitos em um ambiente como o GitHub Codespaces.
- **Tópicos:**
  - **Portas Privadas vs. Públicas:** Demonstrar como o Codespaces expõe uma porta local para a internet de forma segura.
  - **Interação com o Usuário:** Mostrar como o frontend (HTML/CSS/JS) renderizado no navegador consome dados do backend (API FastAPI) para criar uma experiência rica e interativa.