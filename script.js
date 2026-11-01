
/* CINEMATIC ENTRY */

const enterButton = document.querySelector(".discover-btn");
const hero = document.querySelector(".hero");

enterButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (document.body.classList.contains("entered")) {
        return;
    }

    document.body.classList.add("entered");
    hero.classList.add("gate-opening");

    // Keep the website locked during the cinematic transition.
    setTimeout(() => {
        document.body.style.overflowY = "auto";
    }, 1500);
});


/* SNOW ANIMATION */

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    snowflakes = [];

    const count = Math.min(
        120,
        Math.floor(window.innerWidth / 7)
    );

    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2.5 + 0.5,
            speed: Math.random() * 1 + 0.3,
            drift: Math.random() * 0.8 - 0.4,
            opacity: Math.random() * 0.6 + 0.2
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(flake => {
        ctx.beginPath();

        ctx.arc(
            flake.x,
            flake.y,
            flake.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
        ctx.fill();

        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > canvas.height) {
            flake.y = -5;
            flake.x = Math.random() * canvas.width;
        }

        if (flake.x > canvas.width) {
            flake.x = 0;
        }

        if (flake.x < 0) {
            flake.x = canvas.width;
        }
    });

    requestAnimationFrame(drawSnow);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawSnow();


/* FLIPBOOK */

const pages = Array.from(
    document.querySelectorAll(".book-page")
);

const nextButton = document.getElementById("nextPage");
const prevButton = document.getElementById("prevPage");
const pageCounter = document.getElementById("pageCounter");

let currentPage = 0;

const pageNames = [
    "COVER",
    "CHAPTER I",
    "CHAPTER II",
    "CHAPTER III",
    "CHAPTER IV",
    "CHAPTER V",
    "CHAPTER VI",
    "A PERSONAL NOTE",
    "THE END?"
];


/* INITIALISE BOOK */

function initialiseBook() {
    pages.forEach((page, index) => {
        page.style.zIndex = pages.length - index;
        page.classList.remove("turned");
    });

    currentPage = 0;
    updateBook();
}


/* NEXT PAGE */

function nextPage() {
    if (currentPage >= pages.length) {
        return;
    }

    pages[currentPage].classList.add("turned");
    pages[currentPage].style.zIndex = currentPage + 1;

    currentPage++;

    updateBook();
}


/* PREVIOUS PAGE */

function previousPage() {
    if (currentPage <= 0) {
        return;
    }

    currentPage--;

    pages[currentPage].classList.remove("turned");
    pages[currentPage].style.zIndex =
        pages.length - currentPage;

    updateBook();
}


/* UPDATE BOOK CONTROLS */

function updateBook() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length;

    if (currentPage === 0) {
        pageCounter.textContent = "COVER";
    } else if (currentPage === pages.length) {
        pageCounter.textContent = "THE END";
    } else {
        pageCounter.textContent =
            pageNames[currentPage] || "PAGE";
    }
}


/* BUTTON EVENTS */

nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", previousPage);


/* KEYBOARD NAVIGATION */

document.addEventListener("keydown", event => {
    const bookSection = document.getElementById("book");
    const rect = bookSection.getBoundingClientRect();

    const bookIsVisible =
        rect.top < window.innerHeight &&
        rect.bottom > 0;

    if (!bookIsVisible || !document.body.classList.contains("entered")) {
        return;
    }

    if (event.key === "ArrowRight") {
        nextPage();
    }

    if (event.key === "ArrowLeft") {
        previousPage();
    }
});


/* START */

initialiseBook();
