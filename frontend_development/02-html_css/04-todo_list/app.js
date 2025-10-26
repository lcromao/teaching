// Exemplo 4 — To‑Do List (Aula 1): adiciona tarefas e ordena por deadline
(function(){
  const form = document.getElementById('todo-form');
  const tbody = document.getElementById('todo-body');
  const announce = document.getElementById('announce');
  const tasks = [];

  function toISO(dateStr){
    // Espera 'YYYY-MM-DD' do <input type="date">
    // Mantém formato string para ordenação estável (lexicográfica == cronológica)
    return dateStr;
  }

  function render(){
    // Ordena por deadline (mais próximo primeiro)
    tasks.sort((a, b) => a.deadline.localeCompare(b.deadline));
    tbody.innerHTML = '';
    for (const t of tasks){
      const tr = document.createElement('tr');

      const tdTitle = document.createElement('td');
      tdTitle.textContent = t.title;
      tr.appendChild(tdTitle);

      const tdDesc = document.createElement('td');
      tdDesc.textContent = t.description || '—';
      tr.appendChild(tdDesc);

      const tdDeadline = document.createElement('td');
      tdDeadline.className = 'deadline';
      tdDeadline.textContent = t.deadline; // já em YYYY-MM-DD
      tr.appendChild(tdDeadline);

      tbody.appendChild(tr);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = (form.title.value || '').trim();
    const description = (form.description.value || '').trim();
    const deadlineRaw = form.deadline.value;

    if (!title){
      form.title.focus();
      return;
    }
    if (!deadlineRaw){
      form.deadline.focus();
      return;
    }
    const deadline = toISO(deadlineRaw);

    tasks.push({ title, description, deadline });
    render();

    // Anúncio acessível
    announce.textContent = `Tarefa “${title}” adicionada para ${deadline}.`;

    form.reset();
    form.title.focus();
  });
})();