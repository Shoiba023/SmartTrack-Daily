// === script.js ===

let taskData = [];

function addTask() {
  const date = document.getElementById("date").value;
  const task = document.getElementById("task").value;
  const time = parseFloat(document.getElementById("time").value) || 0;
  const earning = parseFloat(document.getElementById("earning").value) || 0;
  const notes = document.getElementById("notes").value;

  if (!date || !task) {
    alert("Please fill in at least Date and Task.");
    return;
  }

  const newTask = { date, task, time, earning, notes };
  taskData.push(newTask);
  renderTable();
  clearInputs();
}

function clearInputs() {
  document.getElementById("date").value = "";
  document.getElementById("task").value = "";
  document.getElementById("time").value = "";
  document.getElementById("earning").value = "";
  document.getElementById("notes").value = "";
}

function renderTable() {
  const tbody = document.querySelector("#taskTable tbody");
  tbody.innerHTML = "";

  let totalTasks = 0;
  let totalTime = 0;
  let totalEarnings = 0;

  taskData.forEach((entry, index) => {
    totalTasks++;
    totalTime += entry.time;
    totalEarnings += entry.earning;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Date">${entry.date}</td>
      <td data-label="Task">${entry.task}</td>
      <td data-label="Time">${entry.time}</td>
      <td data-label="Earning">$${entry.earning.toFixed(2)}</td>
      <td data-label="Notes">${entry.notes}</td>
      <td data-label="Action">
        <button onclick="deleteTask(${index})" style="background:#e74c3c;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  document.getElementById("taskCount").textContent = totalTasks;
  document.getElementById("timeTotal").textContent = totalTime.toFixed(1);
  document.getElementById("earningsTotal").textContent = totalEarnings.toFixed(2);
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskData.splice(index, 1);
    renderTable();
  }
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    taskData = [];
    renderTable();
  }
}
