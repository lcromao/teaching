document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();
});

function fetchTasks() {
    fetch('http://127.0.0.1:5000/tarefas')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('myTable');
            // First, clear out any existing rows in the table
            table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());

            data.tarefas.forEach((tarefa) => {
                const row = table.insertRow();
                ['titulo', 'descricao', 'prazo', 'status'].forEach((key) => {
                    const cell = row.insertCell();
                    cell.textContent = tarefa[key];
                });
                const deleteCell = row.insertCell();
                const updateCell = row.insertCell();
                insertDeleteButton(deleteCell, tarefa.titulo);
                insertUpdateButton(updateCell, tarefa);
            });
        })
        .catch(error => {
            alert('Error fetching tasks: ' + error.message);
        });
}

function newItem() {
    const titulo = document.getElementById('newTitulo').value.trim();
    const descricao = document.getElementById('newDescricao').value.trim();
    const prazo = document.getElementById('newPrazo').value.trim();
    const status = document.getElementById('newStatus').value.trim();

    if (!titulo || !descricao || !prazo || !status) {
        alert('All fields are required.');
        return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('status', status);
    formData.append('prazo', prazo);

    fetch('http://127.0.0.1:5000/tarefa', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Task added successfully.');
    })
    .catch((error) => {
        alert('Error adding task: ' + error.message);
    });

    // Clear input fields
    ['newTitulo', 'newDescricao', 'newPrazo', 'newStatus'].forEach((id) => {
        document.getElementById(id).value = id === 'newStatus' ? 'Pendente' : '';
    });
}

function insertDeleteButton(cell, taskTitle) {
    const btn = document.createElement("button");
    btn.textContent = "\u00D7";
    btn.onclick = function() {
        if (confirm('Are you sure you want to delete the task?')) {
            deleteTask(taskTitle);
        }
    };
    cell.appendChild(btn);
}



function deleteTask(taskTitle) {
    const formData = new FormData();
    formData.append('titulo', taskTitle);
    
    fetch('http://127.0.0.1:5000/tarefa', {
        method: 'DELETE',
        body: formData // Sending the title in the form data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to delete task "${taskTitle}": ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Task deleted successfully.');
    })
    .catch(error => {
        alert(`Error deleting task "${taskTitle}": ${error.message}`);
    });
}

function insertUpdateButton(cell, tarefa) {
    const btn = document.createElement("button");
    btn.textContent = "\u27F3";
    btn.onclick = function() {
        updateTask(tarefa);
    };
    cell.appendChild(btn);
}

function updateTask(tarefa) {
    // The second argument in prompt is the default value that appears in the input box

    var newTitle = prompt("Enter new title:", tarefa.titulo);
    if (newTitle == null) return;
    // if (newTitle === null || newTitle === '') {
    //     newTitle = tarefa.titulo;
    // }

    var newDescription = prompt("Enter new description:", tarefa.descricao);
    if (newDescription === null) return;

    var newPrazo = prompt("Enter new deadline (YYYY-MM-DD):", tarefa.prazo);
    if (newPrazo === null) return;

    var newStatus = prompt("Enter new status:", tarefa.status);
    if (newStatus === null) return;

    const formData = new FormData();
    formData.append('titulo', newTitle);
    formData.append('descricao', newDescription);
    formData.append('prazo', newPrazo);
    formData.append('status', newStatus);

    // Make sure to encode the titulo in case it contains spaces or special characters
    fetch(`http://127.0.0.1:5000/tarefa?titulo=${encodeURIComponent(tarefa.titulo)}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to update task with title ${tarefa.titulo}: ` + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('Task updated successfully.');
    })
    .catch(error => {
        alert('Error updating task: ' + error.message);
    });
}