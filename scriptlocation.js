document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".navbar .items a");
    const divider = document.querySelector(".navbar .nav-divider");
    const items = document.querySelector(".navbar .items");
    let activeLink =
        document.querySelector(".navbar .items a.active") || links[3];

    function moveDivider(link) {
        const linkRect = link.getBoundingClientRect();
        const itemsRect = items.getBoundingClientRect();
        divider.style.width = `${linkRect.width}px`;
        divider.style.left = `${linkRect.left - itemsRect.left}px`;
    }

    // Posizione iniziale
    moveDivider(activeLink);

    links.forEach((link) => {
        // Hover -> divider segue il mouse
        link.addEventListener("mouseenter", () => moveDivider(link));

        // Mouse leave -> torna al link attivo
        link.addEventListener("mouseleave", () => moveDivider(activeLink));

        // Click -> aggiorna link attivo e gestisce scroll
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            // Aggiorna active link e divider
            links.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
            activeLink = link;
            moveDivider(link);

            // Se è un link interno (#), scorri senza ricaricare
            if (href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: "smooth" });
            }
            // Altrimenti lascia fare il normale comportamento del link (nuova pagina)
        });
    });

    // Adatta il divider se la finestra cambia dimensione
    window.addEventListener("resize", () => moveDivider(activeLink));
});

const hamburger = document.querySelector(".hamburger");
const items = document.querySelector(".items");

// toggle menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    items.classList.toggle("active");
});

// Gestione click sui link del menu
document.querySelectorAll(".items a").forEach((link) => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        const target = document.querySelector(href);

        // Chiudi sempre il menu mobile
        hamburger.classList.remove("active");
        items.classList.remove("active");

        // Se link è hash e la sezione esiste nella pagina → scroll smooth
        if (href.startsWith("#") && target) {
            e.preventDefault(); // previeni navigazione predefinita
            target.scrollIntoView({ behavior: "smooth" });
        }

        // Se la sezione non esiste o link è esterno → lascia fare al browser
        // In questo modo i link verso altre pagine funzionano
    });
});
