// Cria um novo item na lista
function newElement(){
    var li = document.createElement("li"); // List Itens
    var inputValue = document.getElementById("newInput").value;
    var t = document.createTextNode(inputValue); // Text Node é para criar um texto
    li.appendChild(t);
    if(inputValue === ''){
        alert("Escreva o nome de um item");
    } else {
        document.getElementById("myList").appendChild(li);
    }
    document.getElementById("newInput").value = "";
}