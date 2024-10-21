/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/tarefas';
    fetch(url, {
      method: 'get',
    })
    .then((response) => response.json())
    .then((data) => {
    data.tarefas.forEach(item => insertList(item.titulo, 
                                            item.descricao, 
                                            item.status,
                                            item.prazo))
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
const postItem = async (inputTitulo, inputDescricao, inputStatus, inputPrazo) => {
    // Definindo formData para enviar os dados
    const formData = new FormData();
    formData.append('titulo', inputTitulo);
    formData.append('descricao', inputDescricao);
    formData.append('status', inputStatus);
    formData.append('prazo', inputPrazo);
  
    // Definindo a URL e enviando os dados
    let url = 'http://127.0.0.1:5000/tarefa';
    fetch(url, {
      method: 'post',
      body: formData
    })
    // Once the fetch request completes, converts the body into JSON and 
    // passes the resulting object to the next function.
    .then((response) => response.json())

    // Manipulando os erros
    .catch((error) => {
        console.error('Error:', error);
    });
}

// /*
//   --------------------------------------------------------------------------------------
//   Função para atualizar um item na lista do servidor via requisição PUT
//   --------------------------------------------------------------------------------------
// */
// const updateItem = async (productName, inputProduct, inputQuantity, inputPrice) => {
//     const formData = new FormData();
//     formData.append('nome', inputProduct);
//     formData.append('quantidade', inputQuantity);
//     formData.append('valor', inputPrice);
  
//     let url = `http://127.0.0.1:5000/produto?nome=${productName}`; // Substitua pelo nome do produto a ser atualizado
//     fetch(url, {
//       method: 'put',
//       body: formData
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Lida com a resposta da solicitação PUT
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error('Erro ao atualizar o produto:', error);
//       });
// }

// /*
//   --------------------------------------------------------------------------------------
//   Função para criar um botão close para cada item da lista
//   --------------------------------------------------------------------------------------
// */
// const insertDeleteButton = (parent) => {
//     let span = document.createElement("span");
//     let txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     parent.appendChild(span);
// }

// /*
//   --------------------------------------------------------------------------------------
//   Função para criar um botão de atualização para cada item da lista
//   --------------------------------------------------------------------------------------
// */
// const insertUpdateButton = (parent) => {
//     let updateButton = document.createElement("button");
//     let txt = document.createTextNode("\u27F3"); 
//     updateButton.className = "update"; // Classe do botão de atualização
//     updateButton.appendChild(txt); // Texto do botão de atualização
//     parent.appendChild(updateButton);
// }

// /*
//   --------------------------------------------------------------------------------------
//   Função para remover um item da lista de acordo com o click no botão close
//   --------------------------------------------------------------------------------------
// */
// const removeElement = () => {
//     let close = document.getElementsByClassName("close");
//     // var table = document.getElementById('myTable');
//     let i;
//     for (i = 0; i < close.length; i++) {
//       close[i].onclick = function () {
//         let div = this.parentElement.parentElement;
//         const nomeItem = div.getElementsByTagName('td')[0].innerHTML
//         if (confirm("Você tem certeza?")) {
//           div.remove()
//           deleteItem(nomeItem)
//           alert("Removido!")
//         }
//       }
//     }
// }
  
//   /*
//     --------------------------------------------------------------------------------------
//     Função para deletar um item da lista do servidor via requisição DELETE
//     --------------------------------------------------------------------------------------
//   */
// const deleteItem = (item) => {
//     console.log(item)
//     let url = 'http://127.0.0.1:5000/produto?nome=' + item;
//     fetch(url, {
//       method: 'delete'
//     })
//       .then((response) => response.json())
//       .catch((error) => {
//         console.error('Error:', error);
//       });
// }

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova tarefa com título, descrição, status e prazo 
  --------------------------------------------------------------------------------------
*/
const newItem = async() => { 
    /* Definindo a func através de const para evitar reatribuição acidental */
    /* Além disso, ea poderá ser chamada antes de ser declarada */

    let inputTitulo = document.getElementById("newTitulo").value;
    let inputDescricao = document.getElementById("newDescricao").value;
    let inputStatus = document.getElementById("newStatus").value;
    let inputPrazo = document.getElementById("newPrazo").value;

    // Verifique se o título da tarefa já existe antes de adicionar
    // Ex.: http://127.0.0.1:5000/tarefa?titulo=Preparar%20aula%201
    const checkUrl = `http://127.0.0.1:5000/tarefas?titulo=${inputTitulo}`;
    fetch(checkUrl, {
        method: 'get'
    })
 
    // Manipulando a resposta da requisição
    .then((response) => response.json()) // Transforma a resposta em JSON
    .then((data) => { // Manipula os dados
        if (data.tarefas && data.tarefas.some(item => item.titulo === inputTitulo)) {
            alert("O título da tarefa já está cadastrado.\nCadastre a tarefa com um título diferente ou atualize a existente.");
        } else if (titulo === '') {
            alert("O título da tarefa não pode ser vazio!");
        } else {
            insertList(inputTitulo, inputDescricao, inputStatus, inputPrazo);
            postTarefa(inputTitulo, inputDescricao, inputStatus, inputPrazo);
            alert("Tarefa adicionada!");
        }
    })

    // Manipulando erros
    .catch((error) => {
        console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (tituloTarefa, descricaoTarefa, prazoTarefa, statusTarefa) => {
    var item = [tituloTarefa, descricaoTarefa, prazoTarefa, statusTarefa];
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cell = row.insertCell(i);
      cell.textContent = item[i];
    }
  
    // var deleteCell = row.insertCell(-1);
    // insertDeleteButton(deleteCell);
  
    // var updateCell = row.insertCell(-1);
    // insertUpdateButton(updateCell);
  
    // // Lógica para o botão de atualização
    // updateCell.querySelector(".update").addEventListener("click", function () {
    //   const updatedProduct = prompt("Novo nome do produto:", nameProduct);
    //   if (updatedProduct) {
    //     const updatedQuantity = prompt("Nova quantidade:", quantity);
    //     const updatedPrice = prompt("Novo preço:", price);
  
    //     if (updatedQuantity !== null && updatedPrice !== null) {
    //       row.cells[0].textContent = updatedProduct;
    //       row.cells[1].textContent = updatedQuantity;
    //       row.cells[2].textContent = updatedPrice;
  
    //       updateItem(nameProduct, updatedProduct, updatedQuantity, updatedPrice);
    //     }
    //   }
    // });

    // // Evoluído
    // var li = document.createElement("li");
    // li.textContent = titulo;
    // li.onclick = function() {
    //     showPopup(titulo, descricao, status, prazo);
    // }

    // document.getElementById("myTable").appendChild(li);

    // Clearing the input fields after adding the task
    document.getElementById("newTitulo").value = "";
    document.getElementById("newDescricao").value = "";
    document.getElementById("newStatus").value = "Pendente"; // Resetting back to default
    document.getElementById("newPrazo").value = "";
  
    // removeElement();
}

// function showPopup(titulo, descricao, status, prazo) {
//     var popup = document.getElementById("taskPopup");
//     popup.innerHTML = `<strong>Título:</strong> ${titulo}<br>
//                        <strong>Descrição:</strong> ${descricao}<br>
//                        <strong>Status:</strong> ${status}<br>
//                        <strong>Prazo:</strong> ${prazo}<br>`;
//     popup.style.display = "block";
// }


// function hidePopup() {
//     document.getElementById("taskPopup").style.display = 'none';
// }
