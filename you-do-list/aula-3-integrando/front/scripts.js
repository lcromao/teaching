// Cria um novo item na lista
// O objto document é a representação da página HTML que o navegador carregou

function novaTarefa() {
    var titulo = document.getElementById("titulo").value;
    var descricao = document.getElementById("descricao").value;
    var status = document.getElementById("status").value;
    var prazo = document.getElementById("prazo").value;

    if (titulo === '' || descricao === '' || prazo === '') {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    // Num primeiro momento    
    // var li = document.createElement("li"); // List Item 
    // var conteudoTarefa = `Título: ${titulo}, Descrição: ${descricao}, Status: ${status}, Prazo: ${prazo}`;
    // var t = document.createTextNode(conteudoTarefa)
    // li.appendChild(t);

    // Evoluído
    var li = document.createElement("li");
    li.textContent = titulo;
    li.onclick = function() {
        showPopup(titulo, descricao, status, prazo);
    }

    document.getElementById("minhasTarefas").appendChild(li);

    // Clearing the input fields after adding the task
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("status").value = "Pendente"; // Resetting back to default
    document.getElementById("prazo").value = "";
}

function showPopup(titulo, descricao, status, prazo) {
    var popup = document.getElementById("taskPopup");
    popup.innerHTML = `<strong>Título:</strong> ${titulo}<br>
                       <strong>Descrição:</strong> ${descricao}<br>
                       <strong>Status:</strong> ${status}<br>
                       <strong>Prazo:</strong> ${prazo}`;
    popup.style.display = "block";
}

function hidePopup() {
    document.getElementById("taskPopup").style.display = 'none';
}

