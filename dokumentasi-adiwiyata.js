document.addEventListener("DOMContentLoaded", function () {

    // 1. NAVIGASI MOBILE (UNTUK TAMPILAN HP)
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // 2. FILTER KATEGORI (TOMBOL TAB GALERI)
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryCards = document.querySelectorAll(".gallery-card");

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-category");

            galleryCards.forEach(function (card) {
                const cardCategory = card.getAttribute("data-category");
                if (category === "all" || cardCategory === category) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

});

// 3. FUNGSI UNTUK MEMBUKA POPUP (MODAL) GAMBAR DAN VIDEO
function bukaModalMedia(srcMedia, tipe = 'image') {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalVideo = document.getElementById("modal-video");

    if (modal) {
        if (tipe === 'video') {
            // Tampilkan video, sembunyikan gambar
            modalImg.style.display = "none";
            modalVideo.style.display = "block";
            modalVideo.src = srcMedia;
            modalVideo.play();
        } else {
            // Tampilkan gambar, sembunyikan video
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.style.display = "none";
            }
            modalImg.style.display = "block";
            modalImg.src = srcMedia;
        }
        modal.style.display = "flex";
    }
}

// FUNGSI CADANGAN (Agar onclick="bukaModal(...)" yang lama di HTML tetap jalan)
function bukaModal(srcGambar) {
    bukaModalMedia(srcGambar, 'image');
}

// 4. FUNGSI UNTUK MENUTUP POPUP (MODAL)
function tutupModal() {
    const modal = document.getElementById("modal");
    const modalVideo = document.getElementById("modal-video");

    if (modal) {
        modal.style.display = "none";
        if (modalVideo) {
            modalVideo.pause(); // Hentikan pemutaran video saat modal ditutup
            modalVideo.src = "";
        }
    }
}

// 5. FUNGSI MENGUNDUH FILE & MENAMPILKAN NOTIFIKASI TOAST
function unduhGambar(e, url, namaFile) {
    e.preventDefault(); // Mencegah pindah halaman saat klik link

    const a = document.createElement("a");
    a.href = url;
    a.download = namaFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    tampilkanNotifikasi();
}

function tampilkanNotifikasi() {
    const toast = document.getElementById("toast-notification");
    if (toast) {
        toast.classList.add("show");
        setTimeout(function () {
            toast.classList.remove("show");
        }, 3000);
    }
}