// AUTH GUARD
if (!localStorage.getItem("acadexaProfile")) {
    alert("🔒 Akses ditolak. Silakan login terlebih dahulu!");
    window.location.href = "login.html";
}

const tasks = JSON.parse(localStorage.getItem("acadexaTasks")) || [];

const total = tasks.length;
const completed = tasks.filter(t => t.status === "Completed").length;
const pending = tasks.filter(t => t.status === "Pending").length;
const inProgress = tasks.filter(t => t.status === "In Progress").length;

const highPriorityTasks = tasks.filter(t => t.priority === "High" && t.status !== "Completed");
const productivity = total ? Math.round((completed / total) * 100) : 0;

document.getElementById("productivityScore").innerText = productivity + "%";

let health = "🟢 Excellent";
if (productivity < 80) health = "🟡 Good";
if (productivity < 50) health = "🟠 Fair";
if (productivity < 30) health = "🔴 Critical";

document.getElementById("healthStatus").innerText = health;

let recommendations = [];

if (total === 0) {
    recommendations.push("✨ Basis data tugas Anda kosong. Silakan masuk ke menu Planner untuk menjadwalkan agenda kuliah pertama Anda!");
} else {
    if (productivity === 100) {
        recommendations.push("🚀 Luar biasa! Produktivitas Anda mencapai angka sempurna 100%. Semua tugas terjadwal berhasil diselesaikan dengan baik.");
    } else if (productivity >= 75) {
        recommendations.push("📈 Performa Anda sangat stabil. Pertahankan ritme kerja konstan ini untuk mengamankan nilai akhir semester.");
    } else if (productivity < 50) {
        recommendations.push("⚠️ Skor produktivitas Anda berada di bawah ambang batas aman (50%). AI menyarankan untuk mencicil tugas ringan terlebih dahulu guna membangun momentum.");
    }

    if (highPriorityTasks.length > 0) {
        recommendations.push(`🔥 Krisis Deteksi AI: Anda memiliki ${highPriorityTasks.length} tugas berprioritas tinggi ("High") yang menanti. Fokuskan energi Anda pada proyek '${highPriorityTasks[0].title}' terlebih dahulu!`);
    }

    if (pending > 0) {
        recommendations.push(`📋 Ada ${pending} tugas dalam antrean "Pending". Segera review modul tugas tersebut dan alihkan status menjadi "In Progress" jika Anda mulai membacanya.`);
    }
    
    if (inProgress > 0) {
        recommendations.push(`⏳ Terdeteksi ${inProgress} tugas sedang aktif dikerjakan. Selesaikan satu per satu untuk menghindari beban kerja kognitif berlebih (*cognitive overload*).`);
    }

    recommendations.push("🎯 Gunakan teknik Pomodoro (25 menit kerja, 5 menit istirahat) saat menyelesaikan proyek besar yang membutuhkan konsentrasi tinggi.");
    recommendations.push("⏰ Periksa deadline di menu Planner setiap pagi agar tidak ada tenggat waktu pengerjaan yang terlewat secara tidak sengaja.");
}

let html = "";
recommendations.forEach(item => {
    let emoji = "💡";
    if (item.includes("🚀") || item.includes("📈")) emoji = "✨";
    if (item.includes("🔥") || item.includes("⚠️")) emoji = "🚨";
    if (item.includes("📋") || item.includes("⏳")) emoji = "📝";

    html += `
        <div class="recommendation-item" style="display: flex; align-items: center; gap: 12px; padding: 16px; background: #F8FAFC; margin-bottom: 12px; border-radius: 14px; border-left: 5px solid #2563EB;">
            <span style="font-size: 20px;">${emoji}</span>
            <span style="color: #334155; font-weight: 500; text-align: left; line-height: 1.5;">${item}</span>
        </div>
    `;
});

document.getElementById("recommendations").innerHTML = html;