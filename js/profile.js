// AUTH GUARD: Cegah akses masuk tanpa login
if (!localStorage.getItem("acadexaProfile")) {
    alert("🔒 Akses ditolak. Silakan login terlebih dahulu!");
    window.location.href = "login.html";
}

const profile = JSON.parse(localStorage.getItem("acadexaProfile")) || {
    name: "Ahmad Rizky",
    studentId: "220401001",
    major: "Sistem Informasi",
    campusEmail: "ahmad.rizky@mahasiswa.ac.id",
    semester: "6",
    currentGPA: "3.62",
    targetGPA: "3.80"
};

function renderProfile() {
    document.getElementById("displayName").innerText = profile.name;
    document.getElementById("displayMajor").innerText = profile.major;
    document.getElementById("displayEmail").innerText = profile.campusEmail || "Belum diatur";
    
    document.getElementById("semesterDisplay").innerText = profile.semester;
    document.getElementById("currentGPADisplay").innerText = profile.currentGPA;
    document.getElementById("targetGPADisplay").innerText = profile.targetGPA;

    document.getElementById("name").value = profile.name;
    document.getElementById("studentId").value = profile.studentId;
    document.getElementById("major").value = profile.major;
    document.getElementById("campusEmail").value = profile.campusEmail || "";
    document.getElementById("semester").value = profile.semester;
    document.getElementById("currentGPA").value = profile.currentGPA;
    document.getElementById("targetGPA").value = profile.targetGPA;
}

function saveProfile() {
    profile.name = document.getElementById("name").value;
    profile.studentId = document.getElementById("studentId").value;
    profile.major = document.getElementById("major").value;
    profile.campusEmail = document.getElementById("campusEmail").value;
    profile.semester = document.getElementById("semester").value;
    profile.currentGPA = document.getElementById("currentGPA").value;
    profile.targetGPA = document.getElementById("targetGPA").value;

    localStorage.setItem("acadexaProfile", JSON.stringify(profile));
    renderProfile();
    alert("✅ Profile & Campus Email Berhasil Diperbarui!");
}

function resetDemoData() {
    const confirmReset = confirm("Reset seluruh data ACADEXA ke kondisi awal demo?");
    if (!confirmReset) return;

    const defaultProfile = {
        name: "Ahmad Rizky",
        studentId: "220401001",
        major: "Sistem Informasi",
        campusEmail: "ahmad.rizky@mahasiswa.ac.id",
        semester: "6",
        currentGPA: "3.62",
        targetGPA: "3.80"
    };

    const defaultTasks = [
        { id: 1, title: "PCD Report", course: "Pengolahan Citra Digital", priority: "High", status: "In Progress", deadline: "2026-06-20" },
        { id: 2, title: "UIUX Prototype", course: "UI/UX Design", priority: "Low", status: "Completed", deadline: "2026-06-10" },
        { id: 3, title: "Data Science Analysis", course: "Data Science", priority: "Medium", status: "Pending", deadline: "2026-06-22" }
    ];

    localStorage.setItem("acadexaProfile", JSON.stringify(defaultProfile));
    localStorage.setItem("acadexaTasks", JSON.stringify(defaultTasks));

    alert("Demo berhasil direset ke pengaturan awal!");
    location.reload();
}

// Inisialisasi
renderProfile();