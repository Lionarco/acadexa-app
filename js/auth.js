// Mengambil database user terdaftar dari local storage
const usersDatabase = JSON.parse(localStorage.getItem("acadexaUsers")) || [];

// 1. FUNGSI REGISTER USER BARU
function handleRegister() {
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const major = document.getElementById("regMajor").value;
    const semester = document.getElementById("regSemester").value;
    const currentGPA = document.getElementById("regGPA").value;

    // Cek apakah email sudah terdaftar
    const isExist = usersDatabase.find(user => user.email === email);
    if (isExist) {
        alert("❌ Email ini sudah terdaftar! Silakan gunakan email lain.");
        return;
    }

    // Simpan user baru ke database akun fiktif lokal
    const newUser = {
        name, email, password, major, semester, currentGPA,
        studentId: "220401" + Math.floor(100 + Math.random() * 900), // Random ID
        targetGPA: "4.00"
    };

    usersDatabase.push(newUser);
    localStorage.setItem("acadexaUsers", JSON.stringify(usersDatabase));

    alert("🎉 Registrasi berhasil! Silakan login menggunakan akun Anda.");
    window.location.href = "login.html";
}

// 2. FUNGSI LOGIN
function handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Cari user di database lokal
    const user = usersDatabase.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("❌ Email atau Password salah! Coba lagi.");
        return;
    }

    // TAHAP UX CRITICAL: Set profil aktif dengan data user tersebut
    const sessionProfile = {
        name: user.name,
        major: user.major,
        semester: user.semester,
        currentGPA: user.currentGPA,
        targetGPA: user.targetGPA,
        studentId: user.studentId
    };
    localStorage.setItem("acadexaProfile", JSON.stringify(sessionProfile));

    // INI KUNCI UTAMA: Kosongkan list tugas agar penilai/user baru mulai dari NOL (Clean Slate)
    const freshTasks = [];
    localStorage.setItem("acadexaTasks", JSON.stringify(freshTasks));

    alert(`👋 Selamat Datang, ${user.name}! Menginisialisasi data bersih untuk uji coba...`);
    window.location.href = "dashboard.html";
}

function handleLogout(event) {
    // Mencegah kelakuan bawaan href="#" yang merusak redirect JS
    if (event) event.preventDefault(); 

    if (confirm("Apakah Anda yakin ingin keluar dari sistem? Data sesi aktif Anda akan dibersihkan.")) {
        // Hapus session profil aktif dari local storage
        localStorage.removeItem("acadexaProfile");
        
        // Pindah ke halaman login (karena dashboard.html & login.html berada di folder yang sama yaitu /pages)
        window.location.href = "login.html";
    }
}

// GLOBAL MOBILE MENU TOGGLE
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");
    
    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }
});