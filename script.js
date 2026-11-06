// Image Data

const photos = [

    {
        title: "Into the Wild",
        category: "nature",
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900"
    },

    {
        title: "Lines & Light",
        category: "architecture",
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900"
    },

    {
        title: "Coastal Escape",
        category: "travel",
        src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900"
    },

    {
        title: "Slow Mornings",
        category: "lifestyle",
        src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900"
    },

    {
        title: "Mountain Silence",
        category: "nature",
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900"
    },

    {
        title: "Urban Geometry",
        category: "architecture",
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900"
    },

    {
        title: "Wander Often",
        category: "travel",
        src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900"
    },

    {
        title: "Everyday Ritual",
        category: "lifestyle",
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900"
    },

    {
        title: "Forest Therapy",
        category: "nature",
        src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900"
    },

    {
        title: "Concrete Poetry",
        category: "architecture",
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&sat=-30"
    },

    {
        title: "Somewhere Blue",
        category: "travel",
        src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900"
    },

    {
        title: "Little Pleasures",
        category: "lifestyle",
        src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900"
    }

];


// HTML Elements

const grid = document.getElementById("galleryGrid");

const searchInput = document.getElementById("searchInput");

const emptyState = document.getElementById("emptyState");

const resultCount = document.getElementById("resultCount");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCounter = document.getElementById("lightboxCounter");


// Variables

let activeFilter = "all";

let visiblePhotos = [...photos];

let currentIndex = 0;


// Render Gallery

function renderGallery() {

    const term = searchInput.value.trim().toLowerCase();

    visiblePhotos = photos.filter(photo => {

        const matchesCategory =
            activeFilter === "all" ||
            photo.category === activeFilter;

        const matchesSearch =
            `${photo.title} ${photo.category}`
                .toLowerCase()
                .includes(term);

        return matchesCategory && matchesSearch;

    });


    grid.innerHTML = visiblePhotos.map((photo, index) => {

        return `

            <button class="gallery-card" data-index="${index}">

                <div class="card-image-wrap">

                    <img
                        src="${photo.src}"
                        alt="${photo.title}"
                        loading="lazy"
                    >

                </div>

                <div class="card-meta">

                    <span class="card-title">
                        ${photo.title}
                    </span>

                    <span class="card-category">
                        ${photo.category}
                    </span>

                </div>

            </button>

        `;

    }).join("");


    // Empty State

    emptyState.hidden = visiblePhotos.length !== 0;


    // Image Count

    resultCount.textContent =
        `${visiblePhotos.length} photographs`;

}


// Category Filters

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            ?.classList.remove("active");

        button.classList.add("active");

        activeFilter = button.dataset.filter;

        renderGallery();

    });

});


// Search Functionality

searchInput.addEventListener("input", renderGallery);


// Open Lightbox

grid.addEventListener("click", event => {

    const card = event.target.closest(".gallery-card");

    if (!card) return;

    currentIndex = Number(card.dataset.index);

    openLightbox();

});


function openLightbox() {

    const photo = visiblePhotos[currentIndex];

    if (!photo) return;

    lightboxImage.src = photo.src;

    lightboxImage.alt = photo.title;

    lightboxTitle.textContent = photo.title;

    lightboxCounter.textContent =
        `${currentIndex + 1} / ${visiblePhotos.length}`;

    lightbox.classList.add("open");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


// Close Lightbox

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


document.getElementById("closeLightbox")
    .addEventListener("click", closeLightbox);


// Next / Previous Images

function moveImage(direction) {

    currentIndex =
        (currentIndex + direction + visiblePhotos.length)
        % visiblePhotos.length;

    openLightbox();

}


document.getElementById("prevImage")
    .addEventListener("click", () => {

        moveImage(-1);

    });


document.getElementById("nextImage")
    .addEventListener("click", () => {

        moveImage(1);

    });


// Close on Background Click

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// Keyboard Navigation

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowRight") {

        moveImage(1);

    }

    if (event.key === "ArrowLeft") {

        moveImage(-1);

    }

});


// Initialize Gallery

renderGallery();