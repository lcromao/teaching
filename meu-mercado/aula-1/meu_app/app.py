# Código controlador

from flask import Flask, request, send_from_directory, render_template
from sqlalchemy.exc import IntegrityError

from model import Session, Produto
from model.comentario import Comentario


app = Flask(__name__)

# Temos duas camadas:
# Lado Cliente: Browser
# - A Camada 0 é responsável por receber as requisições HTTP e retornar as respostas HTTP. É o Browser
# Lado Servidor: Servidor de Aplicação, Servidor Dados/Negócios e Banco de Dados
# - A Camada 1 é responsável pelo Servidor de Aplicação, que recebe as requisições HTTP e retorna as respostas HTTP. É o Frontend
# - A Camada 2 é responsável pelo Servidor Dados/Negócios, que possui a lógica de negócios e os dados. É o Backend, a nossa API
#       Juntamente com a camada 2, temos o Banco de Dados, que é responsável por armazenar os dados da aplicação. No nosso caso, o sqlite3


@app.route('/')
def home():
    return render_template("home.html"), 200


@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'favicon.ico', mimetype='image/x-icon')

# Definição da rota de adição de um novo produto
@app.route('/add_produto', methods=['POST'])
def add_produto():
    session = Session()
    produto = Produto(
        nome=request.form.get("nome"),
        quantidade=request.form.get("quantidade"),
        valor=request.form.get("valor")
    )
    try:
        # adicionando produto
        session.add(produto)
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        return render_template("produto.html", produto=produto), 200
    except IntegrityError as e:
        error_msg = "Produto de mesmo nome já salvo na base :/"
        return render_template("error.html", error_code=409, error_msg=error_msg), 409
    except Exception as e:
        error_msg = "Não foi possível salvar novo item :/"
        print(str(e))
        return render_template("error.html", error_code=400, error_msg=error_msg), 400


@app.route('/get_produto/<produto_id>', methods=['GET'])
def get_produto(produto_id):
    session = Session()
    produto = session.query(Produto).filter(Produto.id == produto_id).first()
    if not produto:
        error_msg = "Produto não encontrado na base :/"
        return render_template("error.html", error_code= 404, error_msg=error_msg), 404
    else:
        return render_template("produto.html", produto=produto), 200
    
    
@app.route('/update_produto/<int:produto_id>', methods=['PUT'])
def update_produto(produto_id):
    session = Session()
    # Recupere o produto existente pelo ID
    produto = session.query(Produto).get(produto_id)
    if produto is None:
        return render_template("error.html", error_code=404, error_msg="Produto não encontrado :/"), 404
    # Atualize os campos do produto com os dados fornecidos no JSON da solicitação
    produto.nome = request.form.get("nome")
    produto.quantidade = request.form.get("quantidade")
    produto.valor = request.form.get("valor")
    try:
        # Efetue a atualização do produto
        session.commit()
        return render_template("produto.html", produto=produto), 200
    except IntegrityError as e:
        error_msg = "Erro na atualização do produto :/"
        return render_template("error.html", error_code=409, error_msg=error_msg), 409
    except Exception as e:
        error_msg = "Não foi possível atualizar o produto :/"
        print(str(e))
        return render_template("error.html", error_code=400, error_msg=error_msg), 400


@app.route('/del_produto/<produto_id>', methods=['DELETE'])
def del_produto(produto_id):
    session = Session()
    count = session.query(Produto).filter(Produto.id == produto_id).delete()
    session.commit()
    if count ==1:
        return render_template("deletado.html", produto_id=produto_id), 200
    else: 
        error_msg = "Produto não encontrado na base :/"
        return render_template("error.html", error_code=404, error_msg=error_msg), 404


@app.route('/add_comentario/<produto_id>', methods=['POST'])
def add_comentario(produto_id):
    session = Session()
    produto = session.query(Produto).filter(Produto.id == produto_id).first()
    if not produto:
        error_msg = "Produto não encontrado na base :/"
        return render_template("error.html", error_code= 404, error_msg=error_msg), 404

    autor = request.form.get("autor")
    texto = request.form.get("texto")
    n_estrelas = request.form.get("n_estrela")
    if n_estrelas:
        n_estrelas = int(n_estrelas)

    comentario = Comentario(autor, texto, n_estrelas)
    produto.adiciona_comentario(comentario)
    session.commit()
    return render_template("produto.html", produto=produto), 200
