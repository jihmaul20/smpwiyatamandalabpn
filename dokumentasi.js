document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // 2. Filter Kategori Galeri (Tab Buttons)
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryCards = document.querySelectorAll(".gallery-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Hapus kelas 'active' dari semua tombol filter
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedCategory = btn.getAttribute("data-category");

            // Filter item galeri
            galleryCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                if (selectedCategory === "all" || cardCategory === selectedCategory) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

// 3. Modal Preview Gambar
function openModal(src, captionText) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const caption = document.getElementById("caption");
    const downloadBtn = document.getElementById("download-btn-modal");

    if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = src;
        caption.innerHTML = captionText || "";
        
        if (downloadBtn) {
            downloadBtn.href = src;
            downloadBtn.download = src.split('/').pop();
        }
    }
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Tutup modal jika mengklik area gelap di luar gambar
window.addEventListener("click", (e) => {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});