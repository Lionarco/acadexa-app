function animateValue(id, end) {
    let element = document.getElementById(id);
    if (!element) return; // Mencegah crash jika elemen tidak ada di halaman aktif

    let current = 0;
    let increment = end / 50;
    let timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.innerHTML = Math.floor(current);
    }, 20);
}

animateValue("gpaCounter", 362);
animateValue("progressCounter", 78);
animateValue("taskCounter", 12);
animateValue("scoreCounter", 86);