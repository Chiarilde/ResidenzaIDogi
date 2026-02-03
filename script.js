// Funzione per far comparire la fixed navbar
const navbar = document.querySelector(".navbar-wrapper");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Funzione per animazioni immagini e testo delle descrizioni
const items = document.querySelectorAll(".grid-item");
const images = document.querySelectorAll(".zoom-image");

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.5,
    },
);
const imageObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.5,
    },
);
items.forEach((item) => {
    observer.observe(item);
});
images.forEach((item) => {
    imageObserver.observe(item);
});

document.addEventListener("DOMContentLoaded", () => {
    // SOLO link con hash (esclude logo o link esterni)
    const links = document.querySelectorAll(".navbar .items a");
    const divider = document.querySelector(".navbar .nav-divider");
    const items = document.querySelector(".navbar .items");

    let activeLink = links[0];

    function moveDivider(link) {
        if (!link) return;

        const linkRect = link.getBoundingClientRect();
        const itemsRect = items.getBoundingClientRect();

        divider.style.width = `${linkRect.width}px`;
        divider.style.left = `${linkRect.left - itemsRect.left}px`;
    }

    // Posizione iniziale
    moveDivider(activeLink);

    // ======================
    // HOVER + CLICK
    // ======================
    links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            moveDivider(link);
        });

        link.addEventListener("mouseleave", () => {
            moveDivider(activeLink);
        });

        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            links.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
            activeLink = link;
            moveDivider(link);

            if (href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // ======================
    // SCROLL (IntersectionObserver)
    // ======================
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const id = entry.target.id;
                const newActiveLink = document.querySelector(
                    `.navbar .items a[href="#${id}"]`,
                );

                if (!newActiveLink || newActiveLink === activeLink) return;

                links.forEach((l) => l.classList.remove("active"));
                newActiveLink.classList.add("active");
                activeLink = newActiveLink;
                moveDivider(newActiveLink);
            });
        },
        {
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0,
        },
    );

    sections.forEach((section) => observer.observe(section));

    // ======================
    // RESIZE
    // ======================
    window.addEventListener("resize", () => {
        moveDivider(activeLink);
    });
});
