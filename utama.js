document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Mobile Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Live Clock Function
    function updateClock() {
        const clockEl = document.getElementById("live-clock");
        if (!clockEl) return;
        const now = new Date();
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const monthName = months[now.getMonth()];
        const year = now.getFullYear();
        const time = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

        clockEl.innerHTML = `
            <div class="date">${dayName}, ${date} ${monthName} ${year}</div>
            <div class="time">${time}</div>
        `;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 4. Scroll Header Shadow Effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    // 5. Scroll Intersection Observer (Animations)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .visi, .misi").forEach(el => observer.observe(el));
});

// Accordion Handler Universal (Single Definition)
function toggleAccordion(id) {
    const content = document.getElementById(id);
    if (!content) return;

    const isOpen = content.classList.contains("show");
    
    // Tutup accordion sejenis (optional)
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('show');
    });

    if (!isOpen) {
        content.classList.add("show");
    }
}

// Fungsi Buka Modal Preview Gambar Galeri
function openModal(src, altText) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");

    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = src;
        captionText.innerHTML = altText || "";
    }
}

// Fungsi Tutup Modal
function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Tutup modal jika area luar gambar diklik
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};