# Minha API

Este pequeno projeto faz parte do material diático da Disciplina **Desenvolvimento Full Stack** para a disciplina INF1041 - Engenharia de Software

O objetivo aqui é iniciar o desenvolvimento de uma API RESTful utilizando o framework Flask somente trabalhando aspectos básicos de uma API RESTful sem a utilização de páginas HTML elaboradas.

---
## Como executar

Será necessário ter todas as libs python listadas no `requirements.txt` instaladas, é bem simples o processo.

Após clonar o repositório, é necessário ir ao diretório raiz do projeto, pelo terminal, para poder executar os comandos descritos abaixo.

> É fortemente indicado o uso de ambientes virtuais do tipo [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html).

```
(env)$ pip install -r requirements.txt
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `requirements.txt`.

Para executar a API  basta executar:

```
(env)$ flask --app app run
```

Em modo de desenvolvimento é recomendado executar utilizando o parâmetro reload, que reiniciará o servidor
automaticamente após uma mudança no código fonte. 

```
(env)$ flask --app app run --reload
```

Abra o [http://localhost:5000/#/](http://localhost:5000/#/) no navegador para verificar o status da API em execução.
