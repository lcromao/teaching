/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/produtos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.produtos.forEach(item => insertList(item.nome, item.quantidade, item.valor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduct, inputQuantity, inputPrice) => {
  const formData = new FormData();
  formData.append('nome', inputProduct);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);

  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para atualizar um item na lista do servidor via requisição PUT
  --------------------------------------------------------------------------------------
*/
const updateItem = async (productName, inputProduct, inputQuantity, inputPrice) => {
  const formData = new FormData();
  formData.append('nome', inputProduct);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);

  let url = `http://127.0.0.1:5000/produto?nome=${productName}`; // Substitua pelo nome do produto a ser atualizado
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      // Lida com a resposta da solicitação PUT
      console.log(data);
    })
    .catch((error) => {
      console.error('Erro ao atualizar o produto:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de atualização para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertUpdateButton = (parent) => {
  let updateButton = document.createElement("button");
  let txt = document.createTextNode("\u27F3"); 
  updateButton.className = "update"; // Classe do botão de atualização
  updateButton.appendChild(txt); // Texto do botão de atualização
  parent.appendChild(updateButton);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/produto?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = async () => {
  let inputProduct = document.getElementById("newInput").value;
  let inputQuantity = document.getElementById("newQuantity").value;
  let inputPrice = document.getElementById("newPrice").value;

  // Verifique se o nome do produto já existe antes de adicionar
  const checkUrl = `http://127.0.0.1:5000/produtos?nome=${inputProduct}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.produtos && data.produtos.some(item => item.nome === inputProduct)) {
        alert("O nome do produto já está cadastrado.\nCadastre o produto com um nome diferente ou atualize o existente.");
      } else if (inputProduct === '') {
        alert("O nome do item não pode ser vazio!");
      } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
        alert("Quantidade e valor precisam ser números!");
      } else {
        insertList(inputProduct, inputQuantity, inputPrice);
        postItem(inputProduct, inputQuantity, inputPrice);
        alert("Item adicionado!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameProduct, quantity, price) => {
  var item = [nameProduct, quantity, price];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);

  var updateCell = row.insertCell(-1);
  insertUpdateButton(updateCell);

  // Lógica para o botão de atualização
  updateCell.querySelector(".update").addEventListener("click", function () {
    const updatedProduct = prompt("Novo nome do produto:", nameProduct);
    if (updatedProduct) {
      const updatedQuantity = prompt("Nova quantidade:", quantity);
      const updatedPrice = prompt("Novo preço:", price);

      if (updatedQuantity !== null && updatedPrice !== null) {
        row.cells[0].textContent = updatedProduct;
        row.cells[1].textContent = updatedQuantity;
        row.cells[2].textContent = updatedPrice;

        updateItem(nameProduct, updatedProduct, updatedQuantity, updatedPrice);
      }
    }
  });

  document.getElementById("newInput").value = "";
  document.getElementById("newQuantity").value = "";
  document.getElementById("newPrice").value = "";

  removeElement();
}