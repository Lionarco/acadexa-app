const defaultProfileDemo = {
    name: "Ahmad Rizky",
    major: "Sistem Informasi",
    semester: "6",
    currentGPA: "3.62",
    targetGPA: "3.80",
    studentId: "220401001"
};

const defaultTasksDemo = [
    { id: 1, title: "PCD Report", course: "Pengolahan Citra Digital", priority: "High", status: "In Progress", deadline: "2026-06-20" },
    { id: 2, title: "UIUX Prototype", course: "UI/UX Design", priority: "Low", status: "Completed", deadline: "2026-06-10" },
    { id: 3, title: "Data Science Analysis", course: "Data Science", priority: "Medium", status: "Pending", deadline: "2026-06-22" }
];

function startDemo() {
    localStorage.setItem("acadexaProfile", JSON.stringify(defaultProfileDemo));
    localStorage.setItem("acadexaTasks", JSON.stringify(defaultTasksDemo));
    window.location.href = "./pages/dashboard.html";
}

document.querySelectorAll("#demoBtn,#heroDemoBtn,#ctaDemoBtn").forEach(btn => {
    btn.addEventListener("click", startDemo);
});