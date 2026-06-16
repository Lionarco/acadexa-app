// Letakkan ini di baris paling atas pada file dashboard.js, planner.js, analytics.js, dll
if (!localStorage.getItem("acadexaProfile")) {
    alert("🔒 Akses ditolak. Silakan login terlebih dahulu!");
    window.location.href = "login.html";
}

const profile = JSON.parse(localStorage.getItem("acadexaProfile")) || {
    name: "Ahmad Rizky",
    major: "Sistem Informasi",
    semester: "6",
    currentGPA: "3.62"
};

const tasks = JSON.parse(localStorage.getItem("acadexaTasks")) || [];

const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.status === "Completed").length;
const pendingTasks = tasks.filter(t => t.status === "Pending").length;
const activeTasks = tasks.filter(t => t.status !== "Completed").length;

const productivity = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

document.getElementById("welcomeName").innerText = `Welcome Back, ${profile.name} 👋`;
document.getElementById("welcomeInfo").innerText = `Semester ${profile.semester} • ${profile.major}`;
document.getElementById("gpaValue").innerText = profile.currentGPA;
document.getElementById("semesterValue").innerText = profile.semester;
document.getElementById("activeTasks").innerText = activeTasks;
document.getElementById("productivityValue").innerText = productivity + "%";
document.getElementById("totalTasks").innerText = totalTasks;
document.getElementById("completedTasks").innerText = completedTasks;
document.getElementById("pendingTasks").innerText = pendingTasks;

const initials = profile.name.split(" ").map(word => word[0]).join("").substring(0, 2);
document.getElementById("avatarInitial").innerText = initials;

const currentSemester = parseInt(profile.semester) || 1;
const semesterProgress = Math.min((currentSemester / 8) * 100, 100);

document.getElementById("semesterProgressFill").style.width = semesterProgress + "%";
document.getElementById("semesterProgressText").innerText = `Semester ${profile.semester} • ${Math.round(semesterProgress)}%`;

const upcoming = tasks.filter(task => task.status !== "Completed").slice(0, 5);
let taskHTML = "";

if (upcoming.length === 0) {
    taskHTML = "<li>No upcoming tasks 🎉</li>";
} else {
    upcoming.forEach(task => {
        taskHTML += `<li>${task.title}</li>`;
    });
}
document.getElementById("upcomingTasks").innerHTML = taskHTML;

let insight = "Keep improving your study consistency.";
if (productivity >= 80) {
    insight = "🚀 Excellent progress. Maintain your productivity.";
} else if (productivity >= 60) {
    insight = "👍 Good performance. Finish remaining tasks.";
} else {
    insight = "📚 Focus on pending assignments to improve productivity.";
}
document.getElementById("quickInsight").innerHTML = insight;

let activityHTML = "";
tasks.slice(-4).reverse().forEach(task => {
    activityHTML += `<div class="activity-item">${task.status} • ${task.title}</div>`;
});
document.getElementById("recentActivity").innerHTML = activityHTML;

let health = "🔴";
if (productivity >= 80) health = "🟢";
else if (productivity >= 60) health = "🟡";
document.getElementById("academicHealth").innerText = health;

/* TODAY FOCUS */
const focusTask = tasks.find(task => task.status !== "Completed");
if (focusTask) {
    document.getElementById("todayFocus").innerHTML = `
        <h2>${focusTask.title}</h2>
        <br>
        <p>📚 ${focusTask.course}</p>
        <p>⚡ ${focusTask.priority}</p>
        <p>📅 ${focusTask.deadline}</p>
    `;
} else {
    document.getElementById("todayFocus").innerHTML = "🎉 All tasks completed";
}

/* ACADEMIC BADGE */
let badge = "";
if (productivity >= 80) badge = "🥇 Gold Student";
else if (productivity >= 60) badge = "🥈 Silver Student";
else if (productivity >= 40) badge = "🥉 Bronze Student";
else badge = "📚 Keep Learning";
document.getElementById("academicBadge").innerHTML = `<div class="badge-box">${badge}</div>`;

/* MOBILE SIDEBAR */
const menuBtn = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}