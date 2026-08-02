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

    // 3. Scroll Header Shadow Effect
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    // 4. Scroll Intersection Observer (Animations)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right, .visi, .misi").forEach(el => observer.observe(el));
});

// ACCORDION HANDLER (PERBAIKAN AGAR TIDAK TERPOTONG DI HP)
function toggleAccordion(id) {
    const content = document.getElementById(id);
    if (!content) return;

    const isOpen = content.classList.contains("show");

    // Tutup semua accordion lain
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('show');
        item.style.maxHeight = null;
    });

    // Buka accordion yang diklik jika sebelumnya tertutup
    if (!isOpen) {
        content.classList.add("show");
        // Atur maxHeight sesuai total tinggi konten yang ada di dalamnya
        content.style.maxHeight = content.scrollHeight + 500 + "px";
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