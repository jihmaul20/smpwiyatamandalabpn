document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // 2. Filter Galeri
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    function filterGallery() {
        const activeBtn = document.querySelector(".filter-btn.active");
        const activeFilter = activeBtn ? activeBtn.getAttribute("data-filter") : "all";

        galleryItems.forEach(item => {
            const category = item.getAttribute("data-category");
            if (activeFilter === "all" || category === activeFilter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterGallery();
        });
    });

    // 3. Modal Preview Gambar
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("img-modal-src");
    const modalCaption = document.getElementById("modal-caption");
    const modalClose = document.querySelector(".modal-close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            const caption = item.querySelector(".gallery-overlay h4");

            if (modal && modalImg && img) {
                modal.style.display = "flex";
                modalImg.src = img.src;
                modalCaption.innerText = caption ? caption.innerText : "";
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // 4. Animasi Angka Counter Stat
    const counters = document.querySelectorAll(".counter");
    let animated = false;

    window.addEventListener("scroll", () => {
        const statsSection = document.querySelector(".stats-section");
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !animated) {
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                let count = 0;
                const speed = target / 50;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
            animated = true;
        }
    });
});