// AUTH GUARD
if (!localStorage.getItem("acadexaProfile")) {
    alert("🔒 Akses ditolak. Silakan login terlebih dahulu!");
    window.location.href = "login.html";
}

const tasks = JSON.parse(localStorage.getItem("acadexaTasks")) || [];
const total = tasks.length;
const completed = tasks.filter(t => t.status === "Completed").length;
const pending = tasks.filter(t => t.status === "Pending").length;
const progress = tasks.filter(t => t.status === "In Progress").length;

const productivity = total ? Math.round((completed/total)*100) : 0;

document.getElementById("totalTasks").innerText = total;
document.getElementById("completedTasks").innerText = completed;
document.getElementById("pendingTasks").innerText = pending;
document.getElementById("productivityScore").innerText = productivity + "%";

document.getElementById("completedBar").style.width = (total ? completed/total*100 : 0) + "%";
document.getElementById("pendingBar").style.width = (total ? pending/total*100 : 0) + "%";
document.getElementById("progressBar").style.width = (total ? progress/total*100 : 0) + "%";

let insight = "Keep Going 🔥";

if(productivity >= 80) insight = "Excellent Progress 🚀";
else if(productivity >= 60) insight = "Good Performance 👍";
else if(productivity >= 40) insight = "Need More Focus 🎯";
else insight = "Let's Improve Together 🤝";

document.getElementById("performanceInsight").innerHTML = insight;

const courses = {};
tasks.forEach(task => {
    courses[task.course] = (courses[task.course] || 0) + 1;
});

let html = "";
Object.keys(courses).forEach(course => {
    html += `
        <div class="course-item">
            <span>${course}</span>
            <strong>${courses[course]}</strong>
        </div>
    `;
});
document.getElementById("courseDistribution").innerHTML = html;

async function downloadReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const profile = JSON.parse(localStorage.getItem("acadexaProfile"));
    const tasks = JSON.parse(localStorage.getItem("acadexaTasks")) || [];
    const completed = tasks.filter(t => t.status === "Completed").length;
    const productivity = tasks.length ? Math.round((completed/tasks.length)*100) : 0;

    doc.setFontSize(20);
    doc.text("ACADEXA Academic Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${profile.name}`, 20, 40);
    doc.text(`Major: ${profile.major}`, 20, 50);
    doc.text(`Semester: ${profile.semester}`, 20, 60);
    doc.text(`GPA: ${profile.currentGPA}`, 20, 70);
    doc.text(`Total Tasks: ${tasks.length}`, 20, 80);
    doc.text(`Completed Tasks: ${completed}`, 20, 90);
    doc.text(`Productivity: ${productivity}%`, 20, 100);
    doc.save("ACADEXA-REPORT.pdf");
}