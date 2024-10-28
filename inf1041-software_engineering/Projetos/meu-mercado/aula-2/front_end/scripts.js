// Cria um novo item na lista
function newElement(){
    var list_item = document.createElement("list_item");
    var inputValue = document.getElementById("newInput").value;
    var t = document.createTextNode(inputValue);
    list_item.appendChild(t);
    if(inputValue === ''){
        alert("Escreva o nome de um item");
    } else {
        document.getElementById("myList").appendChild(list_item);
    }
    document.getElementById("newInput").value = "";
}