// AUTH GUARD
if (!localStorage.getItem("acadexaProfile")) {
    alert("🔒 Akses ditolak. Silakan login terlebih dahulu!");
    window.location.href = "login.html";
}

let tasks = JSON.parse(localStorage.getItem("acadexaTasks")) || [];

function saveTasks() {
    localStorage.setItem("acadexaTasks", JSON.stringify(tasks));
}

function formatDate(dateString) {
    if(!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day:"numeric", month:"short", year:"numeric" });
}

function getCourseColor(course) {
    const colors = ["course-pcd", "course-ds", "course-uiux", "course-se", "course-mobile"];
    let hash = 0;
    for(let i=0; i<course.length; i++) hash += course.charCodeAt(i);
    return colors[hash % colors.length];
}

function getCourseIcon(course) {
    const icons = ["📚", "📊", "🎨", "💻", "📱", "🧠", "📖", "📝", "🎯", "🔬"];
    let hash = 0;
    for(let i=0; i<course.length; i++) hash += course.charCodeAt(i);
    return icons[hash % icons.length];
}

function updateStats() {
    document.getElementById("totalTasks").innerText = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const pending = tasks.filter(t => t.status === "Pending").length;
    
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;
    
    const productivity = tasks.length ? Math.round((completed/tasks.length)*100) : 0;
    document.getElementById("productivityScore").innerText = productivity + "%";
}

function renderTasks() {
    const container = document.getElementById("taskList");
    const keyword = document.getElementById("searchTask")?.value.toLowerCase() || "";
    
    container.innerHTML = "";
    updateStats();

    const filtered = tasks.filter(task => task.title.toLowerCase().includes(keyword));

    if(filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>📚</h2>
                <h3>No Tasks Found</h3>
                <p>Add your first task to begin.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(task => {
        let width = "20%";
        let color = "#F59E0B";

        if(task.status === "In Progress"){ width="60%"; color="#2563EB"; }
        if(task.status === "Completed"){ width="100%"; color="#22C55E"; }

        container.innerHTML += `
            <div class="task-card ${getCourseColor(task.course)}">
                <div class="task-header">
                    <span class="course-icon">${getCourseIcon(task.course)}</span>
                    <span class="course-name">${task.course}</span>
                </div>
                <h3 class="task-title">${task.title}</h3>
                <div class="mini-progress">
                    <div class="mini-progress-fill" style="width:${width}; background:${color};"></div>
                </div>
                <p class="task-deadline">⏰ ${formatDate(task.deadline)}</p>
                <div class="task-footer">
                    <div class="task-actions">
                        <span class="priority ${task.priority}">${task.priority}</span>
                        <span class="status-badge ${task.status.replace(' ','-')}">${task.status}</span>
                    </div>
                    <div class="task-actions">
                        <select onchange="changeStatus(${task.id}, this.value)">
                            <option ${task.status==="Pending" ? "selected" : ""}>Pending</option>
                            <option ${task.status==="In Progress" ? "selected" : ""}>In Progress</option>
                            <option ${task.status==="Completed" ? "selected" : ""}>Completed</option>
                        </select>
                        <button onclick="deleteTask(${task.id})">🗑</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function addTask() {
    const title = document.getElementById("title").value;
    const course = document.getElementById("course").value;
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    tasks.push({
        id: Date.now(),
        title, course, priority, deadline, status: "Pending"
    });

    saveTasks();
    renderTasks();
    document.getElementById("taskForm").reset();
}

function deleteTask(id) {
    if(!confirm("Delete this task?")) return;
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function changeStatus(id, status) {
    const task = tasks.find(task => task.id === id);
    task.status = status;
    if(status === "Completed") alert("🎉 Task Completed!");
    saveTasks();
    renderTasks();
}

window.onload = () => {
    // HANYA RENDER. Dilarang injeksi data demo di sini agar user baru mulai dari 0.
    renderTasks();
};