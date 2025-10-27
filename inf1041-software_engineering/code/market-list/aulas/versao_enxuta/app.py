from flask import Flask, redirect, render_template, request, url_for
from model import Comentario, Produto, Session
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SECRET_KEY'] = 'uma-chave-secreta-muito-segura'

@app.route('/')
def home():
    """
    Rota principal que exibe a lista de produtos
    """
    # Criando conexão com a base
    session = Session()
    # Fazendo a busca
    produtos = session.query(Produto).all()
    
    return render_template('index.html', produtos=produtos)


@app.route('/produto', methods=['POST'])
def add_produto():
    """
    Adiciona um novo Produto à base de dados
    """
    try:
        # Obtém os dados do formulário
        nome = request.form['nome']
        quantidade = int(request.form['quantidade'])
        valor = float(request.form['valor'])
        
        # Cria um novo produto
        produto = Produto(
            nome=nome,
            quantidade=quantidade,
            valor=valor
        )
        
        # Criando conexão com a base
        session = Session()
        # Adicionando produto
        session.add(produto)
        # Efetivando o comando de adição
        session.commit()
        
        # Busca todos os produtos para exibir
        produtos = session.query(Produto).all()
        
        return render_template('index.html', 
                              produtos=produtos, 
                              mensagem=f"Produto '{nome}' adicionado com sucesso!")
        
    except IntegrityError:
        # Caso de duplicidade do nome
        session = Session()
        produtos = session.query(Produto).all()
        return render_template('index.html', 
                              produtos=produtos, 
                              mensagem="Produto de mesmo nome já existe na base.", 
                              erro=True)
    
    except Exception:
        # Caso de outro erro
        session = Session()
        produtos = session.query(Produto).all()
        return render_template('index.html', 
                              produtos=produtos, 
                              mensagem="Erro ao adicionar produto.", 
                              erro=True)


@app.route('/delete_produto', methods=['POST'])
def delete_produto():
    """
    Remove um produto da base de dados pelo nome
    """
    nome = request.form['nome']
    
    # Criando conexão com a base
    session = Session()
    # Fazendo a remoção
    count = session.query(Produto).filter(Produto.nome == nome).delete()
    session.commit()
    
    if count:
        mensagem = f"Produto '{nome}' removido com sucesso!"
        erro = False
    else:
        mensagem = f"Produto '{nome}' não encontrado na base."
        erro = True
    
    # Busca todos os produtos para exibir
    produtos = session.query(Produto).all()
    
    return render_template('index.html', 
                          produtos=produtos, 
                          mensagem=mensagem, 
                          erro=erro)


@app.route('/comentario/<int:produto_id>', methods=['GET', 'POST'])
def comentario(produto_id):
    """
    Exibe e adiciona comentários a um produto
    """
    # Criando conexão com a base
    session = Session()
    # Buscando o produto
    produto = session.query(Produto).filter(Produto.id == produto_id).first()
    
    if not produto:
        # Se produto não encontrado
        return redirect(url_for('home'))
    
    # Se for uma requisição POST, adiciona o comentário
    if request.method == 'POST':
        texto = request.form['texto']
        
        # Cria o comentário
        comentario = Comentario(texto)
        
        # Adiciona o comentário ao produto
        produto.adiciona_comentario(comentario)
        session.commit()
    
    return render_template('comentario.html', produto=produto)


if __name__ == "__main__":
    app.run(debug=True)