
/* =================================
   ABHINAV TS - PORTFOLIO
   Main JavaScript
================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Abhinav Portfolio Loaded Successfully!");

});




/* ================= INDEPENDENT SPIDER WEB INTERACTION ================= */

document.addEventListener("DOMContentLoaded", function () {

    const targets = [
    document.querySelector(".hero-info-card"),
    document.querySelector(".projects-card"),
    document.querySelector(".certifications-card")
].filter(Boolean);

    function drawWeb(target, canvas, x, y) {

        const rect = target.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const radius = Math.max(rect.width, rect.height) * 0.75;
        const spokes = 12;
        const rings = 7;
        const duration = 1100;
        const startTime = performance.now();

        function animate(now) {

            const progress = Math.min(
                (now - startTime) / duration, 1
            );

            const currentRadius = radius * Math.min(progress * 1.5, 1);

            const fade = progress < 0.65
                ? 1
                : 1 - (progress - 0.65) / 0.35;

            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.globalAlpha = Math.max(0, fade);

            // Radial web lines
            for (let i = 0; i < spokes; i++) {

                const angle = (Math.PI * 2 * i) / spokes;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(
                    x + Math.cos(angle) * currentRadius,
                    y + Math.sin(angle) * currentRadius
                );

                ctx.strokeStyle = i % 3 === 0
                    ? "#d5a928"
                    : "rgba(255,255,255,0.95)";

                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // Connecting web rings
            for (let r = 1; r <= rings; r++) {

                const ringRadius = currentRadius * (r / rings);

                ctx.beginPath();

                for (let i = 0; i <= spokes; i++) {

                    const angle = (Math.PI * 2 * i) / spokes;

                    const px = x + Math.cos(angle) * ringRadius;
                    const py = y + Math.sin(angle) * ringRadius;

                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }

                ctx.strokeStyle = "rgba(213,169,40,0.85)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            ctx.globalAlpha = 1;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, rect.width, rect.height);
            }
        }

        requestAnimationFrame(animate);
    }

    targets.forEach(target => {

        // Create an independent canvas for each card
        const canvas = document.createElement("canvas");
        canvas.className = "spider-web-overlay";
        target.appendChild(canvas);

        function triggerWeb(event) {

            const rect = target.getBoundingClientRect();

            const x = Math.max(
                0, Math.min(rect.width, event.clientX - rect.left)
            );

            const y = Math.max(
                0, Math.min(rect.height, event.clientY - rect.top)
            );

            drawWeb(target, canvas, x, y);
        }

        // Mouse hover
        target.addEventListener("pointerenter", event => {
            if (event.pointerType === "mouse") {
                triggerWeb(event);
            }
        });

        // Touch interaction
        target.addEventListener("pointerdown", event => {
            triggerWeb(event);
        });
    });

});



/* ================= GLASS DOOR OPENING SEQUENCE ================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro-screen");

    if (!intro) return;

    const leftDoor = intro.querySelector(".glass-door-left");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Prevent scrolling while the intro is active
    document.body.style.overflow = "hidden";

    // Brief pause before opening
    setTimeout(() => {

        intro.classList.add("opening");

        // Wait until the doors finish opening
        const openingDuration = prefersReducedMotion ? 300 : 1800;

        setTimeout(() => {

            intro.classList.add("finished");

            // Remove the intro overlay
            intro.style.display = "none";

            // Restore page scrolling
            document.body.style.overflow = "";

            // Allow website animations to begin
            document.body.classList.remove("intro-loading");

        }, openingDuration);

    }, prefersReducedMotion ? 0 : 500);

});




/* ================= ABOUT REPEATING SCROLL ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    const aboutSection = document.querySelector(".about-section");

    if (!aboutSection) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        aboutSection.classList.add("is-visible");
        return;
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                aboutSection.classList.add("is-visible");
            } else {
                aboutSection.classList.remove("is-visible");
            }

        });

    }, {
        threshold: 0.05
    });

    observer.observe(aboutSection);

});




/* ================= INDEPENDENT HERO BUBBLE INTERACTION ================= */

document.addEventListener("DOMContentLoaded", function () {

    const targets = [
        document.querySelector(".hero-heading"),
        document.querySelector(".hero-info-card")
    ].filter(Boolean);

    targets.forEach(function (element) {

        function triggerBubble() {

            element.classList.remove("bubble-motion-active");

            // Restart animation for every interaction
            void element.offsetWidth;

            element.classList.add("bubble-motion-active");
        }

        // Mouse hover
        element.addEventListener("pointerenter", function (event) {
            if (event.pointerType === "mouse") {
                triggerBubble();
            }
        });

        // Touch interaction
        element.addEventListener("pointerdown", function (event) {
            if (event.pointerType !== "mouse") {
                triggerBubble();
            }
        });

        // Remove class after animation finishes
        element.addEventListener("animationend", function (event) {
            if (event.animationName === "gentleBubbleMovement") {
                element.classList.remove("bubble-motion-active");
            }
        });

    });

});



/* =====================================================
   ABOUT SECTION - REPEATING FLIP ON SCROLL
   WORKS IN BOTH SCROLL DIRECTIONS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const aboutSection = document.querySelector(".about-section");

    if (!aboutSection) {
        return;
    }

    // Respect reduced-motion accessibility preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        aboutSection.classList.add("is-visible");
        return;
    }

    const aboutObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    // Entering About section
                    aboutSection.classList.add("is-visible");

                } else {

                    // Leaving About section
                    // Reset so the animation can play again
                    aboutSection.classList.remove("is-visible");

                }

            });

        },
        {
            threshold: 0.05
        }
    );

    aboutObserver.observe(aboutSection);

});



/* ================= GLOBAL CONNECTED PARTICLE CURSOR ================= */

document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    const mouse = {
        x: null,
        y: null,
        radius: 100
    };

    const particleCount = 15;
    const connectionDistance = 100;

    /* ================= CANVAS SETUP ================= */

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ================= PARTICLE CLASS ================= */

    class Particle {
        constructor() {
            this.angle = Math.random() * Math.PI * 2;
            this.distance = Math.random() * mouse.radius;

            this.x = Math.cos(this.angle) * this.distance;
            this.y = Math.sin(this.angle) * this.distance;

            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;

            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            const distance = Math.sqrt(
                this.x * this.x + this.y * this.y
            );

            // Keep particles within the circular radius
            if (distance > mouse.radius) {
                const angle = Math.atan2(this.y, this.x);

                this.x = Math.cos(angle) * mouse.radius;
                this.y = Math.sin(angle) * mouse.radius;

                this.vx *= -1;
                this.vy *= -1;
            }
        }

        draw() {
            const screenX = mouse.x + this.x;
            const screenY = mouse.y + this.y;

            ctx.beginPath();
            ctx.arc(screenX, screenY, this.size, 0, Math.PI * 2);

            ctx.fillStyle = "rgba(213, 169, 40, 0.35)";
            ctx.fill();
        }
    }

    /* ================= CREATE PARTICLES ================= */

    function createParticles() {
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    /* ================= PARTICLE CONNECTIONS ================= */

    function drawConnections() {

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {

                    const opacity = 1 - distance / connectionDistance;

                    ctx.beginPath();

                    ctx.moveTo(
                        mouse.x + particles[i].x,
                        mouse.y + particles[i].y
                    );

                    ctx.lineTo(
                        mouse.x + particles[j].x,
                        mouse.y + particles[j].y
                    );

                    ctx.strokeStyle =
                        `rgba(170, 145, 85, ${opacity * 0.2})`;

                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
    }

    /* ================= CURSOR CONNECTIONS ================= */

    function drawMouseConnections() {

        particles.forEach(particle => {

            const distance = Math.sqrt(
                particle.x * particle.x +
                particle.y * particle.y
            );

            if (distance < mouse.radius) {

                const opacity = 1 - distance / mouse.radius;

                ctx.beginPath();

                ctx.moveTo(mouse.x, mouse.y);

                ctx.lineTo(
                    mouse.x + particle.x,
                    mouse.y + particle.y
                );

                ctx.strokeStyle =
                    `rgba(213, 169, 40, ${opacity * 0.25})`;

                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        });

        // Cursor outer ring
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 13, 0, Math.PI * 2);

        ctx.strokeStyle = "rgba(213, 169, 40, 0.7)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Cursor centre dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);

        ctx.fillStyle = "#d5a928";
        ctx.fill();
    }

    /* ================= ANIMATION ================= */

    function animate() {

        ctx.clearRect(0, 0, width, height);

        if (mouse.x !== null && mouse.y !== null) {

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            drawConnections();
            drawMouseConnections();
        }

        requestAnimationFrame(animate);
    }

    /* ================= MOUSE EVENTS ================= */

    window.addEventListener("mousemove", function (event) {

        const firstMovement = mouse.x === null;

        mouse.x = event.clientX;
        mouse.y = event.clientY;

        if (firstMovement) {
            createParticles();
        }
    });

    window.addEventListener("mouseout", function (event) {

        if (!event.relatedTarget) {
            mouse.x = null;
            mouse.y = null;
            particles = [];
        }
    });

    /* ================= RESIZE ================= */

    window.addEventListener("resize", function () {
        resizeCanvas();
    });

    /* ================= START ================= */

    resizeCanvas();
    animate();

});



/* ================= EXPERIENCE 3D CUBE SLIDER ================= */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("experience-track");
    const prevButton = document.getElementById("experience-prev");
    const nextButton = document.getElementById("experience-next");
    const indicators = document.querySelectorAll(".experience-dot");

    if (!track || !prevButton || !nextButton) return;

    const cards = Array.from(track.querySelectorAll(".experience-card"));

    if (cards.length === 0) return;

    let currentIndex = 0;
    let isAnimating = false;
    let wheelLocked = false;

    const animationDuration = 850;
    const wheelCooldown = 950;
    const swipeThreshold = 20;

    // Show the first card initially
    cards.forEach((card, index) => {
        card.classList.toggle("active", index === 0);
    });


    /* ================= UPDATE CONTROLS ================= */

    function updateSliderControls() {

        // Keep both arrows enabled for infinite navigation
        prevButton.disabled = false;
        nextButton.disabled = false;

        indicators.forEach((dot, index) => {

            dot.classList.toggle("active", index === currentIndex);

            dot.setAttribute(
                "aria-current",
                index === currentIndex ? "true" : "false"
            );

        });
    }


    /* ================= MOVE BETWEEN CARDS ================= */

    function moveToCard(nextIndex, direction) {

        if (isAnimating) return;

        // Infinite looping
        nextIndex = (nextIndex + cards.length) % cards.length;

        if (nextIndex === currentIndex) return;

        isAnimating = true;

        const currentCard = cards[currentIndex];
        const nextCard = cards[nextIndex];

        // Determine animation direction
        direction = direction || (nextIndex > currentIndex ? 1 : -1);

        // Make incoming card visible
        nextCard.style.visibility = "visible";
        nextCard.style.opacity = "1";
        nextCard.style.pointerEvents = "auto";
        nextCard.style.zIndex = "2";

        currentCard.style.zIndex = "1";

        // Reset incoming card's vertical scroll position
        nextCard.scrollTop = 0;

        // Rotation angles
        const incomingStart = direction === 1 ? -90 : 90;
        const outgoingEnd = direction === 1 ? 90 : -90;


        /* Animate outgoing card */

        const outgoingAnimation = currentCard.animate(
            [
                {
                    transform: "rotateY(0deg) scale(1)",
                    opacity: 1
                },
                {
                    transform: `rotateY(${outgoingEnd}deg) scale(0.94)`,
                    opacity: 0
                }
            ],
            {
                duration: animationDuration,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards"
            }
        );


        /* Animate incoming card */

        const incomingAnimation = nextCard.animate(
            [
                {
                    transform: `rotateY(${incomingStart}deg) scale(0.94)`,
                    opacity: 0
                },
                {
                    transform: "rotateY(0deg) scale(1)",
                    opacity: 1
                }
            ],
            {
                duration: animationDuration,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards"
            }
        );

        currentIndex = nextIndex;

        updateSliderControls();


        /* Finish transition */

        Promise.all([
            outgoingAnimation.finished,
            incomingAnimation.finished
        ])
        .then(() => {

            currentCard.classList.remove("active");

            currentCard.style.visibility = "hidden";
            currentCard.style.opacity = "";
            currentCard.style.transform = "";
            currentCard.style.pointerEvents = "none";
            currentCard.style.zIndex = "";

            nextCard.classList.add("active");

            nextCard.style.visibility = "";
            nextCard.style.opacity = "";
            nextCard.style.transform = "";
            nextCard.style.pointerEvents = "";
            nextCard.style.zIndex = "";

            isAnimating = false;

        })
        .catch(() => {

            isAnimating = false;

        });

    }


    /* ================= NEXT BUTTON ================= */

    nextButton.addEventListener("click", function () {

        // Card 5 automatically returns to card 1
        moveToCard(currentIndex + 1, 1);

    });


    /* ================= PREVIOUS BUTTON ================= */

    prevButton.addEventListener("click", function () {

        // Card 1 automatically returns to card 5
        moveToCard(currentIndex - 1, -1);

    });


    /* ================= NAVIGATION DOTS ================= */

    indicators.forEach((dot) => {

        dot.addEventListener("click", function () {

            const targetIndex = Number(dot.dataset.index);

            const direction = targetIndex > currentIndex ? 1 : -1;

            moveToCard(targetIndex, direction);

        });

    });


    /* ================= TOUCHPAD HORIZONTAL SCROLL ================= */

    const experienceSlider = document.querySelector(".experience-slider");

    if (experienceSlider) {

        experienceSlider.addEventListener(
            "wheel",
            function (event) {

                // Detect horizontal touchpad movement
                let movement = event.deltaX;

                // Also support Shift + mouse wheel
                if (
                    event.shiftKey &&
                    Math.abs(event.deltaY) > Math.abs(movement)
                ) {
                    movement = event.deltaY;
                }

                // Ignore ordinary vertical scrolling
                if (Math.abs(movement) < swipeThreshold) return;

                // Prevent horizontal page scrolling
                event.preventDefault();

                if (wheelLocked || isAnimating) return;

                wheelLocked = true;

                if (movement > 0) {

                    // Swipe right: next card
                    moveToCard(currentIndex + 1, 1);

                } else {

                    // Swipe left: previous card
                    moveToCard(currentIndex - 1, -1);

                }

                // Prevent multiple transitions from one swipe
                setTimeout(() => {

                    wheelLocked = false;

                }, wheelCooldown);

            },
            { passive: false }
        );

    }


    // Initialize controls
    updateSliderControls();


    /* ================= DIAMOND CERTIFICATE POPUP ================= */

    const certificateView = document.getElementById("certificate-view");
    const certificateModal = document.getElementById("certificate-modal");
    const certificateClose = document.getElementById("certificate-close");
    const certificateBackdrop = document.getElementById("certificate-backdrop");

    if (certificateView && certificateModal) {

        function openCertificate() {

            certificateModal.classList.add("open");

            certificateModal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

            certificateClose?.focus();

        }


        function closeCertificate() {

            certificateModal.classList.remove("open");

            certificateModal.setAttribute("aria-hidden", "true");

            document.body.style.overflow = "";

            certificateView.focus();

        }


        // Open certificate using eye icon
        certificateView.addEventListener("click", openCertificate);


        // Close using X button
        certificateClose?.addEventListener("click", closeCertificate);


        // Close by clicking outside certificate
        certificateBackdrop?.addEventListener("click", closeCertificate);


        // Close using Escape key
        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                certificateModal.classList.contains("open")
            ) {

                closeCertificate();

            }

        });

    }

});


/* ================= PROJECTS 3D MAGNETIC CAROUSEL ================= */

/* ================= PROJECTS 3D MAGNETIC CAROUSEL ================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.getElementById("projects-carousel");
    const track = document.getElementById("projects-track");
    const prevButton = document.getElementById("projects-prev");
    const nextButton = document.getElementById("projects-next");
    const indicators = document.querySelectorAll(".projects-dot");

    if (!carousel || !track || !prevButton || !nextButton) return;

    const cards = Array.from(track.querySelectorAll(".project-card"));
    const totalCards = cards.length;

    if (!totalCards) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let dragDistance = 0;
    let wheelLocked = false;

    /* ================= RESPONSIVE CARD POSITIONING ================= */

    function positionCards() {

        const carouselWidth = carousel.clientWidth;
        const cardWidth = cards[0].offsetWidth;

        // Available space on either side of the centre card.
        // This prevents cards from crossing the split-section boundary.
        const availableSpace = Math.max(
            0,
            (carouselWidth - cardWidth) / 2
        );

        // Responsive spacing based on the available carousel width.
        const sideDistance = availableSpace * 0.62;
        const farDistance = availableSpace;

        cards.forEach((card, index) => {

            let offset = index - currentIndex;

            // Infinite circular navigation
            if (offset > totalCards / 2) {
                offset -= totalCards;
            }

            if (offset < -totalCards / 2) {
                offset += totalCards;
            }

            const distance = Math.abs(offset);

            // Common card positioning
            card.style.position = "absolute";
            card.style.left = "50%";
            card.style.top = "50%";

            card.style.transition =
                "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease";

            if (distance === 0) {

                // CENTRE CARD
                card.style.transform =
                    "translate(-50%, -50%) translateX(0) translateZ(0) scale(1)";

                card.style.opacity = "1";
                card.style.visibility = "visible";
                card.style.pointerEvents = "auto";
                card.style.zIndex = "10";
                card.style.filter = "brightness(1)";

            } else if (distance === 1) {

                // LEFT AND RIGHT NEIGHBOURING CARDS
                card.style.transform = `
                    translate(-50%, -50%)
                    translateX(${offset * sideDistance}px)
                    translateZ(-100px)
                    rotateY(${-offset * 30}deg)
                    scale(0.82)
                `;

                card.style.opacity = "0.75";
                card.style.visibility = "visible";
                card.style.pointerEvents = "none";
                card.style.zIndex = "8";
                card.style.filter = "brightness(0.72)";

            } else if (distance === 2) {

                // FARTHER SIDE CARDS
                card.style.transform = `
                    translate(-50%, -50%)
                    translateX(${offset * farDistance}px)
                    translateZ(-220px)
                    rotateY(${-offset * 40}deg)
                    scale(0.68)
                `;

                card.style.opacity = "0.35";
                card.style.visibility = "visible";
                card.style.pointerEvents = "none";
                card.style.zIndex = "5";
                card.style.filter = "brightness(0.65)";

            } else {

                // HIDE REMAINING CARDS
                card.style.opacity = "0";
                card.style.visibility = "hidden";
                card.style.pointerEvents = "none";
                card.style.zIndex = "0";

            }

            card.classList.toggle("active", distance === 0);

        });

        updateIndicators();

    }


    /* ================= UPDATE INDICATORS ================= */

    function updateIndicators() {

        indicators.forEach((dot, index) => {

            dot.classList.toggle("active", index === currentIndex);

            dot.setAttribute(
                "aria-current",
                index === currentIndex ? "true" : "false"
            );

        });

    }


    /* ================= ROTATE CAROUSEL ================= */

    function rotateCarousel(direction) {

        currentIndex = (
            currentIndex + direction + totalCards
        ) % totalCards;

        positionCards();

    }


    /* ================= ARROW NAVIGATION ================= */

    nextButton.addEventListener("click", function () {
        rotateCarousel(1);
    });

    prevButton.addEventListener("click", function () {
        rotateCarousel(-1);
    });


    /* ================= DOT NAVIGATION ================= */

    indicators.forEach((dot) => {

        dot.addEventListener("click", function () {

            const targetIndex = Number(dot.dataset.index);

            if (
                Number.isInteger(targetIndex) &&
                targetIndex >= 0 &&
                targetIndex < totalCards
            ) {

                currentIndex = targetIndex;
                positionCards();

            }

        });

    });


    /* ================= TOUCHPAD HORIZONTAL SCROLL ================= */

    carousel.addEventListener("wheel", function (event) {

        const movement =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
                ? event.deltaX
                : event.shiftKey ? event.deltaY : 0;

        if (Math.abs(movement) < 20) return;

        event.preventDefault();

        if (wheelLocked) return;

        wheelLocked = true;

        rotateCarousel(movement > 0 ? 1 : -1);

        setTimeout(() => {
            wheelLocked = false;
        }, 650);

    }, { passive: false });


    /* ================= MOUSE DRAG ================= */

    carousel.addEventListener("mousedown", function (event) {

        if (event.target.closest("button")) return;

        isDragging = true;
        startX = event.clientX;
        dragDistance = 0;

        carousel.style.cursor = "grabbing";

    });

    window.addEventListener("mousemove", function (event) {

        if (!isDragging) return;

        dragDistance = event.clientX - startX;

    });

    window.addEventListener("mouseup", function () {

        if (!isDragging) return;

        isDragging = false;
        carousel.style.cursor = "grab";

        if (Math.abs(dragDistance) > 45) {
            rotateCarousel(dragDistance < 0 ? 1 : -1);
        }

        dragDistance = 0;

    });


    /* ================= TOUCH SWIPE ================= */

    carousel.addEventListener("touchstart", function (event) {

        startX = event.touches[0].clientX;

    }, { passive: true });

    carousel.addEventListener("touchend", function (event) {

        const endX = event.changedTouches[0].clientX;
        const difference = endX - startX;

        if (Math.abs(difference) > 45) {
            rotateCarousel(difference < 0 ? 1 : -1);
        }

    }, { passive: true });


    /* ================= MAGNETIC 3D CARD EFFECT ================= */

    cards.forEach((card) => {

        const inner = card.querySelector(".project-card-inner");

        if (!inner) return;

        card.addEventListener("mousemove", function (event) {

            if (
                !card.classList.contains("active") ||
                isDragging
            ) return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            inner.style.transform = `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(12px)
            `;

        });

        card.addEventListener("mouseleave", function () {
            inner.style.transform = "";
        });

    });


    /* ================= INITIALIZE CAROUSEL ================= */

    positionCards();

    carousel.style.cursor = "grab";


    /* ================= RESPONSIVE UPDATE ================= */

    window.addEventListener("resize", function () {
        positionCards();
    });



/* ================= PROJECT DETAILS DATA ================= */

const projectDetails = {

    /* ---------- PROJECT 01: AGRINEX AI ---------- */

    agrinex: {
        title: "AgriNex AI",
        category: "AI / DEEP LEARNING · SMART AGRICULTURE",

        overview: `
            <p>
                AgriNex AI is an integrated smart farming platform
                designed for smallholder farmers in India, with a
                particular focus on Karnataka and South Indian crops.
            </p>
            <p>
                The platform combines deep learning, live weather
                intelligence and LLM-based reasoning to support
                plant disease identification, crop recommendations
                and weather-aware agricultural decisions.
            </p>
        `,

        problem: `
            <p>
                Farmers often depend on guesswork when selecting
                crops and identifying plant diseases. These decisions
                may overlook soil conditions, live weather and
                early disease symptoms.
            </p>
            <p>
                AgriNex AI addresses this challenge by combining
                image-based disease classification with contextual
                agricultural recommendations.
            </p>
        `,

        features: `
            <ul>
                <li><strong>Plant Disease Identification:</strong>
                Upload a leaf image and receive Top-5 predicted
                disease classes with confidence scores.</li>

                <li><strong>Leaf Validation:</strong>
                Reject irrelevant images such as people, buildings
                and tools before disease classification.</li>

                <li><strong>AI Treatment Reports:</strong>
                Generate plain-language treatment recommendations
                using model predictions and contextual information.</li>

                <li><strong>Crop Recommendation:</strong>
                A Crop Planner Agent considers location, weather
                and deduced soil type to recommend suitable crops.</li>

                <li><strong>Weather Analysis:</strong>
                Integrates temperature, humidity, rainfall and
                wind speed through OpenWeatherMap.</li>

                <li><strong>Regional Language Support:</strong>
                Uses Google Translate for multilingual accessibility.</li>

                <li><strong>User Authentication and History:</strong>
                Firebase Authentication and Neon PostgreSQL support
                user access and agricultural data tracking.</li>
            </ul>
        `,

        implementation: `
            <p>
                <strong>Stage 1 – MobileNetV3:</strong>
                A lightweight binary classification model validates
                whether the uploaded image contains a leaf. It was
                trained using a separate 13,000-image dataset,
                with 6,500 images per class.
            </p>

            <p>
                <strong>Stage 2 – EfficientNet-B3:</strong>
                A pretrained CNN performs 136-class crop and
                disease classification. The model uses 300 × 300
                RGB images, preprocessing, data augmentation
                and focal loss.
            </p>

            <p>
                <strong>Dataset:</strong>
                19 public Kaggle datasets were merged into
                165,998 images covering 33 crops and 136 classes.
                The dataset uses an 80/10/10 training,
                validation and testing split.
            </p>

            <p>
                <strong>LLM Reasoning:</strong>
                LangChain assembles predictions, weather information
                and available soil context into a structured prompt.
                Gemma 4 31B is specified in the project methodology
                for generating treatment reports.
            </p>

            <p>
                <strong>Crop Planner Agent:</strong>
                Generates structured JSON crop recommendations
                with explanations based on location and environmental
                context.
            </p>
        `,

        architecture: `
            <ul>
                <li><strong>Frontend:</strong> Next.js application
                hosted on Vercel.</li>

                <li><strong>Authentication:</strong>
                Firebase Authentication.</li>

                <li><strong>Backend:</strong>
                FastAPI hosted on an Oracle Cloud Infrastructure
                instance behind a reverse proxy.</li>

                <li><strong>Image Storage:</strong>
                Oracle Cloud Infrastructure storage.</li>

                <li><strong>Database:</strong>
                Neon PostgreSQL for user-related and agricultural data.</li>

                <li><strong>External Services:</strong>
                OpenWeatherMap, Google Translate and Tavily Search.</li>

                <li><strong>AI Pipeline:</strong>
                MobileNetV3 → EfficientNet-B3 → LangChain
                → LLM-generated report.</li>
            </ul>
        `,

        challenges: `
            <ul>
                <li><strong>Class imbalance:</strong>
                Addressed through image capping, class weights
                and focal loss.</li>

                <li><strong>Irrelevant image uploads:</strong>
                Introduced a separate MobileNetV3 validation stage.</li>

                <li><strong>Response latency:</strong>
                Used a lightweight first-stage model and parallel
                external API fetching.</li>

                <li><strong>Dataset integration:</strong>
                Combined 19 datasets into a unified 136-class
                label structure.</li>
            </ul>
        `,

        technologies: [
            "Python", "TensorFlow", "MobileNetV3",
            "EfficientNet-B3", "CNN", "FastAPI",
            "Next.js", "LangChain", "Gemma 4 31B",
            "Firebase", "Neon PostgreSQL", "OCI",
            "OpenWeatherMap", "Google Translate", "Tavily Search"
        ],

        links: `
            <a href="https://agrinexai.vercel.app/"
               target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i>
                Live Project
            </a>
        `
    },


    /* ---------- PROJECT 02: INFEULA ---------- */

    infeula: {
        title: "INFEULA",
        category: "GENERATIVE AI · FULL-STACK DEVELOPMENT",

        overview: `
            <p>
                INFEULA is an intelligent AI-assisted news platform
                delivered through a browser extension and web interface.
                It aims to reduce information overload by combining
                news aggregation, AI-generated summaries,
                search and personalized discovery.
            </p>
            <p>
                The application brings together frontend development,
                backend APIs, database persistence and LLM integration
                in a unified news experience.
            </p>
        `,

        problem: `
            <p>
                Users encounter large volumes of news from different
                sources, making it difficult to identify relevant
                information and understand important stories quickly.
            </p>
            <p>
                INFEULA addresses this through concise AI summaries,
                personalized news discovery and search assistance.
            </p>
        `,

        features: `
            <ul>
                <li><strong>User Authentication:</strong>
                Registration and login using JWT authentication.</li>

                <li><strong>Personalized News Feed:</strong>
                Paginated news grid with category filters.</li>

                <li><strong>AI Summarization:</strong>
                Uses LLM integration to generate concise
                article summaries.</li>

                <li><strong>Intelligent Search:</strong>
                AI-assisted ranking, query suggestions and
                search history.</li>

                <li><strong>Article Management:</strong>
                Save, bookmark and share news articles.</li>

                <li><strong>Trending Topics:</strong>
                Dedicated trending section with charts.</li>

                <li><strong>Additional Features:</strong>
                Weather page, dark mode, onboarding
                and an experimental Labs section.</li>
            </ul>
        `,

        implementation: `
            <p>
                <strong>Frontend:</strong>
                React 18, TypeScript and Vite provide the
                single-page application structure. React Router
                handles navigation, while Tailwind CSS and
                shadcn/ui provide the interface components.
            </p>

            <p>
                <strong>State Management:</strong>
                React Context manages authentication and theme state.
                A custom Axios hook handles GET and POST requests,
                errors and token management.
            </p>

            <p>
                <strong>Backend Integration:</strong>
                The frontend communicates with REST API endpoints
                for authentication, news and search operations.
            </p>

            <p>
                <strong>AI Integration:</strong>
                LangChain orchestrates LLM-related functionality,
                while the OpenAI API supports summarization
                and recommendation features.
            </p>

            <p>
                <strong>Persistence:</strong>
                MongoDB is used for application data such as
                users, saved articles and interaction history.
            </p>
        `,

        architecture: `
            <ul>
                <li><strong>Frontend:</strong>
                React, TypeScript, Vite and Tailwind CSS.</li>

                <li><strong>API Communication:</strong>
                Axios and REST endpoints.</li>

                <li><strong>Backend:</strong>
                API server supporting authentication,
                news and search operations.</li>

                <li><strong>AI Layer:</strong>
                LangChain and OpenAI API.</li>

                <li><strong>Database:</strong>
                MongoDB.</li>

                <li><strong>Application Flow:</strong>
                User interface → REST API → News services
                and LLM processing → Database and personalized feed.</li>
            </ul>
        `,

        challenges: `
            <ul>
                <li><strong>Information overload:</strong>
                Designed features around concise summaries,
                category filtering and personalized discovery.</li>

                <li><strong>Frontend and API integration:</strong>
                Used reusable Axios request handling
                for API communication and token management.</li>

                <li><strong>Application state:</strong>
                Used React Context to manage authentication
                and theme preferences.</li>

                <li><strong>AI feature integration:</strong>
                Incorporated LLM orchestration into
                the news summarization and search experience.</li>
            </ul>
        `,

        technologies: [
            "React 18", "TypeScript", "Vite",
            "React Router", "Tailwind CSS",
            "shadcn/ui", "Axios", "JWT",
            "LangChain", "OpenAI API", "MongoDB"
        ],

        links: `
        `
    },


    /* ---------- PROJECT 03: CLEAN COOKSTOVE ---------- */

    cookstove: {
        title: "Clean Cookstove Adoption Prediction",
        category: "MACHINE LEARNING · BINARY CLASSIFICATION",

        overview: `
            <p>
                This project applies Machine Learning to predict
                whether a household is likely to adopt a clean
                cookstove based on its socio-economic profile.
            </p>
            <p>
                The objective is to understand adoption patterns
                and identify household characteristics that can
                support targeted clean cooking initiatives.
            </p>
        `,

        problem: `
            <p>
                Many households continue to depend on traditional
                cooking fuels such as firewood, charcoal,
                crop residue and dung.
            </p>
            <p>
                Cost, awareness and household circumstances can
                influence the adoption of cleaner cooking technologies.
                Predictive analysis can help identify households
                that may benefit from targeted programs.
            </p>
        `,

        features: `
            <ul>
                <li><strong>Household Data Analysis:</strong>
                Examines income, fuel expenditure, household size,
                electricity access, education and cooking fuel type.</li>

                <li><strong>Data Preprocessing:</strong>
                Handles missing values and duplicate records.</li>

                <li><strong>Feature Engineering:</strong>
                Creates a Fuel Cost-to-Income Ratio to represent
                cooking fuel expenditure relative to income.</li>

                <li><strong>Exploratory Data Analysis:</strong>
                Uses histograms, scatter plots and correlation
                heatmaps to investigate patterns.</li>

                <li><strong>Binary Classification:</strong>
                Predicts clean cookstove adoption using
                Logistic Regression.</li>

                <li><strong>Model Evaluation:</strong>
                Uses classification metrics and a confusion matrix
                to assess model performance.</li>
            </ul>
        `,

        implementation: `
            <p>
                <strong>Data Cleaning:</strong>
                Pandas is used to load the CSV dataset,
                remove duplicate records and handle missing
                observations using dropna().
            </p>

            <p>
                <strong>Feature Engineering:</strong>
                Created the Fuel Cost-to-Income Ratio:
                fuel_cost / income. This feature represents
                the proportion of household income spent
                on cooking fuel.
            </p>

            <p>
                <strong>Data Splitting:</strong>
                The dataset is split into training and testing
                subsets using an 80/20 split and random_state=42.
            </p>

            <p>
                <strong>Model Pipeline:</strong>
                A Scikit-learn Pipeline combines StandardScaler
                and LogisticRegression, ensuring that scaling
                is fitted using training data only.
            </p>

            <p>
                <strong>Model Configuration:</strong>
                Logistic Regression uses the lbfgs solver,
                max_iter=1000 and class_weight="balanced".
            </p>
        `,

        architecture: `
            <ul>
                <li>Household dataset loaded using Pandas.</li>
                <li>Missing values and duplicates handled.</li>
                <li>Exploratory Data Analysis and feature engineering.</li>
                <li>80/20 train-test split.</li>
                <li>StandardScaler preprocessing.</li>
                <li>Logistic Regression classification.</li>
                <li>Evaluation using predict_proba and classification metrics.</li>
            </ul>
            <p>
                Model deployment using Flask or FastAPI
                and joblib was planned, but was not implemented
                as part of the documented project.
            </p>
        `,

        challenges: `
            <ul>
                <li><strong>Missing data:</strong>
                Prepared the dataset by removing missing
                observations and duplicates.</li>

                <li><strong>Meaningful feature representation:</strong>
                Engineered the Fuel Cost-to-Income Ratio
                to capture household fuel expenditure
                relative to income.</li>

                <li><strong>Data leakage prevention:</strong>
                Used a Pipeline to ensure scaling is learned
                from training data only.</li>

                <li><strong>Interpretability:</strong>
                Selected Logistic Regression to examine
                how different features influence the
                predicted adoption probability.</li>
            </ul>
        `,

        technologies: [
            "Python", "Pandas", "NumPy",
            "Scikit-learn", "Logistic Regression",
            "StandardScaler", "Matplotlib",
            "Exploratory Data Analysis", "Feature Engineering"
        ],

        links: ``
    },


    /* ---------- PROJECT 04: RURAL ELECTRIFICATION ---------- */

    electrification: {
        title: "Rural Electrification Predictor",
        category: "MACHINE LEARNING · REGRESSION",

        overview: `
            <p>
                Rural Electrification Predictor is a Machine Learning
                project that estimates settlement electrification
                percentages using infrastructure accessibility
                and population density.
            </p>
            <p>
                The project explores how distance from the nearest
                power grid and population density relate to
                electricity access in rural settlements.
            </p>
        `,

        problem: `
            <p>
                Remote settlements may face challenges in obtaining
                electricity because grid extension becomes more
                difficult and expensive as distance increases
                and population density decreases.
            </p>
            <p>
                This project explores these relationships to
                support the identification of underserved
                settlements and infrastructure planning,
                aligned with Sustainable Development Goal 9.
            </p>
        `,

        features: `
            <ul>
                <li><strong>Settlement Analysis:</strong>
                Analyzes a dataset containing 238 rural settlements.</li>

                <li><strong>Population Density Validation:</strong>
                Recalculates density using population divided
                by settlement area and compares it with
                the stored density.</li>

                <li><strong>Regression Prediction:</strong>
                Estimates electrification percentage using
                distance from the grid and population density.</li>

                <li><strong>Relationship Analysis:</strong>
                Investigates how infrastructure distance
                and population concentration relate to electricity access.</li>

                <li><strong>Visualization:</strong>
                Generates scatter plots, regression visualizations
                and actual-versus-predicted comparisons.</li>

                <li><strong>Interpretability:</strong>
                Examines regression coefficients to understand
                predictor relationships.</li>
            </ul>
        `,

        implementation: `
            <p>
                <strong>Dataset:</strong>
                Contains 238 rural settlements with population,
                area, population density, distance from grid
                and electrification percentage.
            </p>

            <p>
                <strong>Data Cleaning:</strong>
                Pandas loads data/data.csv, removes the
                village_name identifier and validates
                population density using population / area_sqkm.
            </p>

            <p>
                <strong>Regression Model:</strong>
                Scikit-learn LinearRegression uses
                distance_from_grid_km and pop_density
                as independent variables.
            </p>

            <p>
                <strong>Mathematical Model:</strong>
                Electrification % = b0 + b1 × Distance
                + b2 × Population Density.
            </p>

            <p>
                <strong>Data Splitting:</strong>
                Uses an 80/20 train-test split.
                Model evaluation includes R-squared and
                regression coefficients.
            </p>

            <p>
                <strong>Visualization:</strong>
                Matplotlib produces scatter plots,
                an actual-versus-predicted plot and
                a second-order polynomial overlay
                for visualizing curvature in the data.
            </p>
        `,

        architecture: `
            <ul>
                <li>Load settlement data using Pandas.</li>
                <li>Remove identifiers and validate population density.</li>
                <li>Export cleaned data to outputs/cleaned_data.csv.</li>
                <li>Explore predictor relationships through visualizations.</li>
                <li>Split data into training and testing subsets.</li>
                <li>Train a Multiple Linear Regression model.</li>
                <li>Evaluate using R-squared and regression coefficients.</li>
            </ul>
        `,

        challenges: `
            <ul>
                <li><strong>Data validation:</strong>
                Recomputed population density to check
                consistency with the supplied dataset.</li>

                <li><strong>Relationship interpretation:</strong>
                Observed a negative relationship between
                distance from the grid and electrification.</li>

                <li><strong>Model limitations:</strong>
                Linear Regression does not fully capture
                non-linear relationships.</li>

                <li><strong>Prediction constraints:</strong>
                Some predictions exceeded 100%, highlighting
                the limitation of an unconstrained regression
                model for percentage-based outputs.</li>
            </ul>
        `,

        technologies: [
            "Python", "Pandas", "NumPy",
            "Scikit-learn", "Linear Regression",
            "Matplotlib", "Regression Analysis",
            "Data Cleaning", "EDA"
        ],

        links: ``
    },


    /* ---------- PROJECT 05: YOUTUBE SUMMARIZER ---------- */

    youtube: {
        title: "AI YouTube Video Transcription & Summarization",
        category: "GENERATIVE AI · NATURAL LANGUAGE PROCESSING",

        overview: `
            <p>
                This project is an AI-powered Streamlit application
                that extracts available YouTube captions and
                transforms them into structured summaries
                using Google Gemini 2.5 Flash.
            </p>
            <p>
                Users provide a YouTube video URL and receive
                a readable summary without needing to watch
                the entire video.
            </p>
        `,

        problem: `
            <p>
                Long-form video content often contains useful
                information, but watching complete videos
                and manually taking notes can be time-consuming.
            </p>
            <p>
                The application makes video information easier
                to review by converting existing captions
                into concise, structured summaries.
            </p>
        `,

        features: `
            <ul>
                <li><strong>YouTube URL Processing:</strong>
                Extracts the 11-character video ID using Regex.</li>

                <li><strong>Transcript Extraction:</strong>
                Retrieves available caption segments
                using YouTube Transcript API.</li>

                <li><strong>Transcript Cleaning:</strong>
                Removes bracketed markers such as [Music]
                and normalizes whitespace.</li>

                <li><strong>AI Summarization:</strong>
                Uses Google Gemini 2.5 Flash to generate
                structured summaries.</li>

                <li><strong>Interactive Interface:</strong>
                Uses Streamlit to display video thumbnails,
                summaries, loading indicators and errors.</li>

                <li><strong>Error Handling:</strong>
                Displays feedback when transcript retrieval
                or processing fails.</li>
            </ul>
        `,

        implementation: `
            <p>
                <strong>Video Identification:</strong>
                A regular expression extracts the 11-character
                video ID from the submitted YouTube URL.
            </p>

            <p>
                <strong>Transcript Fetching:</strong>
                YouTubeTranscriptApi().fetch(video_id)
                retrieves available caption segments.
                The segments are joined into a single text string.
            </p>

            <p>
                <strong>Text Preprocessing:</strong>
                Python Regex removes bracketed background
                markers, and whitespace is normalized
                before summarization.
            </p>

            <p>
                <strong>LLM Integration:</strong>
                The Google Gen AI SDK sends the cleaned
                transcript and summarization instructions
                to the gemini-2.5-flash model.
            </p>

            <p>
                <strong>Prompt Instructions:</strong>
                The model is instructed to ignore background
                markers, fix grammar, merge broken captions,
                produce a structured summary and avoid
                introducing new information.
            </p>

            <p>
                <strong>API Security:</strong>
                The API key is loaded from a .env file
                using python-dotenv.
            </p>
        `,

        architecture: `
            <ul>
                <li><strong>app.py:</strong>
                Streamlit application entry point.</li>

                <li><strong>utils/transcript_fetcher.py:</strong>
                Extracts and prepares YouTube captions.</li>

                <li><strong>utils/gemini_processor.py:</strong>
                Processes transcript text using Gemini.</li>

                <li><strong>Transcript Pipeline:</strong>
                YouTube URL → Video ID → Caption Retrieval
                → Text Cleaning → Gemini Summarization.</li>

                <li><strong>Output:</strong>
                Streamlit displays the generated summary
                and relevant video information.</li>
            </ul>

            <p>
                The application retrieves existing captions;
                it does not perform speech recognition
                or generate transcripts from audio.
            </p>
        `,

        challenges: `
            <ul>
                <li><strong>Broken caption formatting:</strong>
                Added text cleaning and prompt instructions
                to improve readability.</li>

                <li><strong>Unwanted caption markers:</strong>
                Used Regex to remove bracketed markers
                such as [Music].</li>

                <li><strong>Transcript availability:</strong>
                The application depends on existing YouTube
                captions and reports errors when they
                cannot be retrieved.</li>

                <li><strong>Long transcripts:</strong>
                Processing currently uses one request
                for the complete transcript. Chunking
                and map-reduce summarization are potential
                future improvements.</li>
            </ul>
        `,

        technologies: [
            "Python", "Streamlit", "Google Gemini 2.5 Flash",
            "Google Gen AI SDK", "YouTube Transcript API",
            "Regex", "python-dotenv", "Natural Language Processing"
        ],

        links: ``
    }

};


/* ================= PROJECT MODAL ELEMENTS ================= */

const projectModal = document.getElementById("project-modal");
const projectModalBackdrop =
    document.getElementById("project-modal-backdrop");
const projectModalClose =
    document.getElementById("project-modal-close");

const projectModalTitle =
    document.getElementById("project-modal-title");

const projectModalCategory =
    document.getElementById("project-modal-category");

const projectModalBody =
    document.getElementById("project-modal-body");

let previousProjectTrigger = null;


/* ================= PROJECT DETAIL SECTION BUILDER ================= */

function createProjectSection(title, icon, content) {

    return `
        <section class="project-detail-section">

            <h3>
                <i class="fas ${icon}"></i>
                ${title}
            </h3>

            ${content}

        </section>

        <div class="project-detail-divider"></div>
    `;
}


/* ================= OPEN PROJECT DETAILS ================= */

function openProjectDetails(projectId, trigger) {

    const project = projectDetails[projectId];

    if (!project || !projectModal) return;

    previousProjectTrigger = trigger;

    projectModalTitle.textContent = project.title;

    projectModalCategory.textContent = project.category;

    projectModalBody.innerHTML = `

        ${createProjectSection(
            "Project Overview",
            "fa-lightbulb",
            project.overview
        )}

        ${createProjectSection(
            "Problem Statement",
            "fa-bullseye",
            project.problem
        )}

        ${createProjectSection(
            "Key Features",
            "fa-star",
            project.features
        )}

        ${createProjectSection(
            "Technical Implementation",
            "fa-code",
            project.implementation
        )}

        ${createProjectSection(
            "System Architecture & Workflow",
            "fa-project-diagram",
            project.architecture
        )}

        ${createProjectSection(
            "Technical Challenges & Solutions",
            "fa-tools",
            project.challenges
        )}

        ${createProjectSection(
            "Technology Stack",
            "fa-layer-group",
            `<div class="project-detail-technologies">
                ${project.technologies.map(tech =>
                    `<span>${tech}</span>`
                ).join("")}
            </div>`
        )}

        ${project.links ? `
            <div class="project-detail-links">
                ${project.links}
            </div>
        ` : ""}

    `;

    projectModalBody.scrollTop = 0;

    projectModal.classList.add("open");

    projectModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    projectModalClose?.focus();

}


/* ================= CLOSE PROJECT DETAILS ================= */

function closeProjectDetails() {

    if (!projectModal) return;

    projectModal.classList.remove("open");

    projectModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    previousProjectTrigger?.focus();

}


/* ================= CONNECT PROJECT CARDS ================= */

cards.forEach((card) => {

    const exploreButton =
        card.querySelector(".project-view-button");

    if (!exploreButton) return;

    exploreButton.addEventListener("click", function (event) {

        event.stopPropagation();

        if (!card.classList.contains("active")) return;

        const projectId = card.dataset.project;

        openProjectDetails(projectId, exploreButton);

    });

});


/* ================= MODAL CLOSE EVENTS ================= */

// Close using X button
projectModalClose?.addEventListener(
    "click",
    closeProjectDetails
);


// Close by clicking outside the popup
projectModalBackdrop?.addEventListener(
    "click",
    closeProjectDetails
);


// Close using Escape key
document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        projectModal?.classList.contains("open")
    ) {

        closeProjectDetails();

    }

});



    /* ================= INITIALIZE CAROUSEL ================= */

    positionCards();

    carousel.style.cursor = "grab";


    /* ================= RESPONSIVE UPDATE ================= */

    window.addEventListener("resize", function () {

        positionCards();

    });

});


// ==========================================
// CONTACT FORM - FASTAPI INTEGRATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");
    const submitButton = contactForm?.querySelector(".contact-submit-btn");
    const statusMessage = document.getElementById("contact-form-status");

    if (!contactForm || !submitButton || !statusMessage) {
        return;
    }

    const API_URL = "https://abhinav-portfolio-api.onrender.com/api/contact";

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById("contact-name").value.trim(),
            email: document.getElementById("contact-email").value.trim(),
            subject: document.getElementById("contact-subject").value.trim(),
            message: document.getElementById("contact-message").value.trim()
        };

        // Show loading state
        submitButton.disabled = true;
        submitButton.querySelector("span").textContent = "Sending...";

        statusMessage.className = "contact-form-status";
        statusMessage.style.display = "none";
        statusMessage.textContent = "";

        try {

            // Send data to FastAPI backend
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof result.detail === "string"
                        ? result.detail
                        : "Unable to send your message. Please check your details."
                );
            }

            // Success response
            statusMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            statusMessage.className = "contact-form-status success";
            statusMessage.style.display = "block";

            // Clear form fields
            contactForm.reset();

        } catch (error) {

            console.error("Contact form error:", error);

            statusMessage.textContent =
                error.message || "Something went wrong. Please try again.";

            statusMessage.className = "contact-form-status error";
            statusMessage.style.display = "block";

        } finally {

            // Restore button
            submitButton.disabled = false;
            submitButton.querySelector("span").textContent = "Send Message";

        }

    });

});



// ==========================================
// POSITIVE QUOTE CARD - 100 QUOTES + 3D
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const quoteCard = document.getElementById("quote-card");
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    if (!quoteCard || !quoteText || !quoteAuthor) return;

    // ======================================
    // 100 QUOTE COLLECTION
    // ======================================

    const quotes = [

        // 1–10: Self-confidence
        { text: "Believe in the person you are becoming.", author: "Trust yourself" },
        { text: "Your potential is greater than your doubts.", author: "Believe in yourself" },
        { text: "You are capable of more than you imagine.", author: "Keep believing" },
        { text: "Never underestimate the power of believing in yourself.", author: "Your inner strength" },
        { text: "You don't need permission to become extraordinary.", author: "Own your journey" },
        { text: "Be confident enough to begin, even when uncertain.", author: "Take the first step" },
        { text: "Your uniqueness is your greatest strength.", author: "Be authentically you" },
        { text: "Stop comparing your chapter one to someone else's chapter twenty.", author: "Your own timeline" },
        { text: "You are worthy of every opportunity you work towards.", author: "Know your worth" },
        { text: "Let your actions speak louder than your fears.", author: "Choose courage" },

        // 11–20: Personal growth
        { text: "Every small step forward is still progress.", author: "Celebrate progress" },
        { text: "Grow through what you go through.", author: "Keep evolving" },
        { text: "Every experience has something valuable to teach you.", author: "Stay curious" },
        { text: "Become a little better than you were yesterday.", author: "Daily growth" },
        { text: "Your journey is teaching you things success never could.", author: "Trust the process" },
        { text: "Growth begins where comfort ends.", author: "Embrace change" },
        { text: "Allow yourself to be a beginner. Every expert once was.", author: "Keep learning" },
        { text: "The best version of you is still being created.", author: "Never stop growing" },
        { text: "Small improvements today create remarkable changes tomorrow.", author: "Consistency matters" },
        { text: "Make room for the person you are becoming.", author: "Welcome growth" },

        // 21–30: Motivation and ambition
        { text: "Dream big, start small, and keep showing up.", author: "Make it happen" },
        { text: "Your future is built by what you do today.", author: "Act with purpose" },
        { text: "Great things begin with the courage to start.", author: "Start somewhere" },
        { text: "Let your ambition be stronger than your excuses.", author: "Stay determined" },
        { text: "One focused hour can change the direction of your day.", author: "Use your time wisely" },
        { text: "Your goals deserve more than just your wishes.", author: "Take action" },
        { text: "Keep working quietly. Let your results introduce you.", author: "Stay focused" },
        { text: "You don't need to see the whole staircase to take the first step.", author: "Move forward" },
        { text: "Turn your ideas into actions and your actions into progress.", author: "Build something meaningful" },
        { text: "The future belongs to those who keep preparing for it.", author: "Stay ready" },

        // 31–40: Resilience
        { text: "A difficult day does not mean a difficult life.", author: "Tomorrow is another chance" },
        { text: "You are stronger than the moments that challenge you.", author: "Stay resilient" },
        { text: "A setback is not the end of your story.", author: "Keep going" },
        { text: "Even the strongest trees grow through changing seasons.", author: "Be patient with yourself" },
        { text: "Fall seven times, rise with a little more wisdom.", author: "Resilience is strength" },
        { text: "Hard moments can reveal strengths you never knew you had.", author: "Discover your strength" },
        { text: "You have survived days you once thought you couldn't.", author: "Look how far you've come" },
        { text: "Progress sometimes looks like simply refusing to give up.", author: "Keep your spirit alive" },
        { text: "Storms pass, and brighter skies return.", author: "Hold on to hope" },
        { text: "Be proud of every time you chose to try again.", author: "That takes courage" },

        // 41–50: Happiness and gratitude
        { text: "Happiness often lives in the little things we overlook.", author: "Notice the good" },
        { text: "Make today meaningful, not merely busy.", author: "Live intentionally" },
        { text: "There is beauty in ordinary moments.", author: "Appreciate today" },
        { text: "Gratitude turns what you have into something wonderful.", author: "Choose gratitude" },
        { text: "A kind heart makes the world a little brighter.", author: "Spread kindness" },
        { text: "Find reasons to smile, even on ordinary days.", author: "Celebrate life" },
        { text: "Sometimes the best moments are the simplest ones.", author: "Enjoy the present" },
        { text: "You can find joy without having everything figured out.", author: "Give yourself permission" },
        { text: "Let your presence bring a little peace wherever you go.", author: "Be a positive influence" },
        { text: "A grateful heart sees possibilities everywhere.", author: "Count your blessings" },

        // 51–60: Hope and positivity
        { text: "Every sunrise brings another opportunity to begin.", author: "A fresh start" },
        { text: "Better days can begin with one hopeful thought.", author: "Keep hope alive" },
        { text: "Your story is still being written. Make it meaningful.", author: "The journey continues" },
        { text: "Even the smallest light can brighten a dark room.", author: "Be that light" },
        { text: "Leave space in your heart for unexpected happiness.", author: "Stay hopeful" },
        { text: "A new chapter can begin at any moment.", author: "Begin again" },
        { text: "There is always something worth looking forward to.", author: "Keep your optimism" },
        { text: "Let hope be louder than uncertainty.", author: "Believe in tomorrow" },
        { text: "A positive mind can discover possibilities in difficult places.", author: "Look for possibilities" },
        { text: "Sometimes the best things arrive when you keep moving forward.", author: "Trust the journey" },

        // 61–70: Dreams and success
        { text: "Your dreams deserve your patience and your effort.", author: "Work towards them" },
        { text: "Success is built in moments nobody else notices.", author: "Respect the process" },
        { text: "Be brave enough to pursue a life that excites you.", author: "Follow your vision" },
        { text: "Every achievement begins as an idea someone believed in.", author: "Believe and build" },
        { text: "Don't just chase success. Build a life you enjoy.", author: "Define your own success" },
        { text: "Your destination matters, but so does who you become along the way.", author: "Enjoy the journey" },
        { text: "Let your dreams inspire your discipline.", author: "Stay committed" },
        { text: "The smallest actions can create the biggest opportunities.", author: "Start building" },
        { text: "Keep your vision clear and your efforts consistent.", author: "Stay on course" },
        { text: "One day, your persistence will become part of your success story.", author: "Don't stop now" },

        // 71–80: Self-love and inner peace
        { text: "Give yourself the same kindness you give others.", author: "You deserve it too" },
        { text: "You don't have to earn the right to rest.", author: "Take care of yourself" },
        { text: "Your worth is not measured by your productivity.", author: "You are enough" },
        { text: "Protect your peace as carefully as you protect your dreams.", author: "Choose peace" },
        { text: "It is okay to slow down and breathe.", author: "Be gentle with yourself" },
        { text: "You deserve a life that feels as good as it looks.", author: "Choose what matters" },
        { text: "Give yourself permission to outgrow what no longer fits.", author: "Make space for peace" },
        { text: "Rest is part of the journey, not a reward for finishing it.", author: "Pause without guilt" },
        { text: "Speak to yourself with patience and compassion.", author: "Be your own friend" },
        { text: "You are a work in progress, not a problem to solve.", author: "Accept yourself" },

        // 81–90: Courage and new beginnings
        { text: "Courage is taking the next step while fear is still present.", author: "Be courageous" },
        { text: "A new beginning can feel uncertain and still be beautiful.", author: "Embrace the unknown" },
        { text: "Don't let the fear of failing stop you from discovering.", author: "Dare to try" },
        { text: "Sometimes the bravest decision is to begin again.", author: "Choose a new beginning" },
        { text: "You can rewrite your direction without erasing your past.", author: "Your future is yours" },
        { text: "Take the chance. Your future self may thank you.", author: "Be bold" },
        { text: "Every unfamiliar path offers a chance to discover yourself.", author: "Explore with courage" },
        { text: "The first step doesn't have to be perfect.", author: "Just begin" },
        { text: "Let curiosity be bigger than your fear of the unknown.", author: "Explore more" },
        { text: "You are never too late to create a meaningful beginning.", author: "Start today" },

        // 91–100: Wisdom and meaningful living
        { text: "Be someone who makes others feel seen and valued.", author: "Lead with kindness" },
        { text: "Listen more, learn more, and judge a little less.", author: "Stay humble" },
        { text: "A meaningful life is built one thoughtful choice at a time.", author: "Live with intention" },
        { text: "Your attitude can change the way you experience a day.", author: "Choose your perspective" },
        { text: "Knowledge grows when curiosity never stops.", author: "Remain a learner" },
        { text: "Make memories, build connections, and enjoy the little moments.", author: "Life is happening now" },
        { text: "Your kindness may become someone's reason to smile today.", author: "Make a difference" },
        { text: "Not every question needs an immediate answer.", author: "Give life time" },
        { text: "The way forward becomes clearer when you keep moving.", author: "Trust your steps" },
        { text: "Make your presence a reminder that good things still exist.", author: "Leave a little light" }

    ];

    // ======================================
    // QUOTE SELECTION
    // ======================================

    let previousQuoteIndex = -1;
    let lastTapTime = 0;
    let isFlipping = false;

    function showNewQuote() {

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (randomIndex === previousQuoteIndex);

        previousQuoteIndex = randomIndex;

        quoteText.textContent = quotes[randomIndex].text;
        quoteAuthor.textContent = "— " + quotes[randomIndex].author;
    }

    // ======================================
    // 3D FLIP ANIMATION
    // ======================================

    function flipQuoteCard() {

        if (isFlipping) return;

        isFlipping = true;

        const isCurrentlyFlipped =
            quoteCard.classList.contains("is-flipped");

        if (!isCurrentlyFlipped) {
            showNewQuote();
            quoteCard.classList.add("is-flipped");
        } else {
            quoteCard.classList.remove("is-flipped");
        }

        setTimeout(() => {
            isFlipping = false;
        }, 850);
    }

    // ======================================
    // DESKTOP DOUBLE CLICK
    // ======================================

    quoteCard.addEventListener("dblclick", function (event) {
        event.preventDefault();
        flipQuoteCard();
    });

    // ======================================
    // MOBILE DOUBLE TAP
    // ======================================

    quoteCard.addEventListener("touchend", function (event) {

        const currentTime = Date.now();
        const tapGap = currentTime - lastTapTime;

        if (tapGap > 0 && tapGap < 350) {
            event.preventDefault();
            flipQuoteCard();
            lastTapTime = 0;
        } else {
            lastTapTime = currentTime;
        }

    }, { passive: false });

    // ======================================
    // MAGNETIC CURSOR MOVEMENT
    // ======================================

    quoteCard.addEventListener("mousemove", function (event) {

        if (window.innerWidth <= 950) return;

        const rect = quoteCard.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        if (!quoteCard.classList.contains("is-flipped")) {
            quoteCard.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

    });

    // ======================================
    // RESET MAGNETIC MOVEMENT
    // ======================================

    quoteCard.addEventListener("mouseleave", function () {
        quoteCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    });

});


/* ==========================================
   CERTIFICATIONS 3D CAROUSEL
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.getElementById("cert-carousel");
    const track = document.getElementById("cert-track");
    const prevButton = document.getElementById("cert-prev");
    const nextButton = document.getElementById("cert-next");
    const indicators = document.getElementById("cert-indicators");

    if (!carousel || !track || !prevButton || !nextButton) return;

    const cards = Array.from(track.querySelectorAll(".cert-card"));
    const dots = indicators
        ? Array.from(indicators.querySelectorAll(".cert-dot"))
        : [];

    const totalCards = cards.length;
    let currentIndex = 0;

    if (!totalCards) return;

    // Position and display the certification cards
    function updateCarousel() {

        cards.forEach((card, index) => {

            let offset = index - currentIndex;

            // Infinite circular navigation
            if (offset > totalCards / 2) {
                offset -= totalCards;
            }

            if (offset < -totalCards / 2) {
                offset += totalCards;
            }

            const distance = Math.abs(offset);

            card.style.position = "absolute";
            card.style.left = "50%";
            card.style.top = "50%";
            card.style.transition =
                "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease";

            if (distance === 0) {

                // Centre card
                card.style.transform =
                    "translate(-50%, -50%) translateX(0) translateZ(0) scale(1)";

                card.style.opacity = "1";
                card.style.visibility = "visible";
                card.style.pointerEvents = "auto";
                card.style.zIndex = "10";

            } else if (distance === 1) {

                // Neighbouring cards
                card.style.transform =
                    `translate(-50%, -50%) translateX(${offset * 190}px) translateZ(-100px) rotateY(${-offset * 30}deg) scale(0.82)`;

                card.style.opacity = "0.75";
                card.style.visibility = "visible";
                card.style.pointerEvents = "auto";
                card.style.zIndex = "8";

            } else if (distance === 2) {

                // Farther cards
                card.style.transform =
                    `translate(-50%, -50%) translateX(${offset * 150}px) translateZ(-220px) rotateY(${-offset * 40}deg) scale(0.68)`;

                card.style.opacity = "0.35";
                card.style.visibility = "visible";
                card.style.pointerEvents = "none";
                card.style.zIndex = "5";

            } else {

                // Hide remaining cards
                card.style.opacity = "0";
                card.style.visibility = "hidden";
                card.style.pointerEvents = "none";
                card.style.zIndex = "0";

            }

            // Highlight the active card
            card.classList.toggle("active", offset === 0);
        });

        // Update navigation indicators
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    // Next certification
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    // Previous certification
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // Arrow navigation
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    // Indicator navigation
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Mouse drag and touch swipe
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener("pointerdown", function (event) {
        if (event.target.closest("button")) return;

        startX = event.clientX;
        isDragging = true;
    });

    carousel.addEventListener("pointerup", function (event) {
        if (!isDragging) return;

        const difference = event.clientX - startX;

        if (Math.abs(difference) > 45) {
            difference < 0 ? nextSlide() : prevSlide();
        }

        isDragging = false;
    });

    carousel.addEventListener("pointercancel", function () {
        isDragging = false;
    });

    // Touchpad / horizontal wheel navigation
    let wheelLocked = false;

    carousel.addEventListener("wheel", function (event) {

        const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY;

        if (Math.abs(movement) < 25 || wheelLocked) return;

        wheelLocked = true;

        movement > 0 ? nextSlide() : prevSlide();

        setTimeout(() => {
            wheelLocked = false;
        }, 650);

    }, { passive: true });

    // Initial display
    updateCarousel();

});


/* ==========================================
   CERTIFICATE PREVIEW POPUP
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("cert-modal");
    const backdrop = document.getElementById("cert-modal-backdrop");
    const closeButton = document.getElementById("cert-modal-close");
    const certificateImage = document.getElementById("cert-modal-image");
    const caption = document.getElementById("cert-modal-caption");

    if (!modal || !backdrop || !closeButton || !certificateImage) return;

    const certificateButtons = document.querySelectorAll(".cert-view-button");

    // Open certificate popup
    function openCertificate(filename, title) {

        certificateImage.src = `assets/images/${filename}`;
        certificateImage.alt = title;

        caption.textContent = title.toUpperCase();

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    // Close certificate popup
    function closeCertificate() {

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        // Clear image after closing animation
        setTimeout(() => {
            if (!modal.classList.contains("active")) {
                certificateImage.src = "";
            }
        }, 350);
    }

    // Connect all View Certificate buttons
    certificateButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const filename = this.dataset.cert;

            const card = this.closest(".cert-card");
            const title = card?.querySelector("h3")?.textContent.trim()
                || "Certificate Preview";

            if (!filename) return;

            openCertificate(filename, title);

        });

    });

    // Close button
    closeButton.addEventListener("click", closeCertificate);

    // Close when clicking outside the popup
    backdrop.addEventListener("click", closeCertificate);

    // Close using Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && modal.classList.contains("active")) {
            closeCertificate();
        }

    });

});


/* ==========================================
   CERTIFICATION CARDS - MAGNETIC 3D HOVER
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const certCards = document.querySelectorAll(
        ".showcase-certifications .cert-card"
    );

    certCards.forEach((card) => {

        // Keep carousel positioning on the outer card.
        // Apply the 3D movement to its inner content.
        const inner =
            card.querySelector(".cert-card-inner") ||
            card.querySelector(".cert-card-content") ||
            card.firstElementChild;

        if (!inner) return;

        card.addEventListener("mousemove", function (e) {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;

            inner.style.transition = "transform 0.12s ease-out";

            inner.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
        });

        card.addEventListener("mouseleave", function () {

            inner.style.transition =
                "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";

            inner.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });

    });

});


/* ==========================================
   PROJECT ICON - GOLDEN ENERGY BEAM
   CLICK / TAP INTERACTION
========================================== */

(function initializeProjectBeam() {

    document.addEventListener("click", function (event) {

        const beam = event.target.closest(
            ".showcase-projects .project-icon-beam"
        );

        if (!beam) return;

        event.stopPropagation();

        // Restart the animation
        beam.classList.remove("beam-active");

        void beam.offsetWidth;

        // Activate the energy beam
        beam.classList.add("beam-active");

        // Remove animation class after completion
        window.setTimeout(function () {
            beam.classList.remove("beam-active");
        }, 1000);

    });

})();


/* ==========================================
   LIGHT / DARK THEME SWITCH
========================================== */

(function initializeThemeToggle() {

    const themeButton = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    if (!themeButton || !themeIcon) return;

    // Restore the previously selected theme
    const savedTheme = localStorage.getItem("portfolio-theme") || "light";

    function applyTheme(theme) {

        document.documentElement.setAttribute("data-theme", theme);

        const isDark = theme === "dark";

        themeIcon.className = isDark
            ? "fas fa-lightbulb"
            : "fas fa-lightbulb";

        themeButton.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        themeButton.setAttribute(
            "title",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );

        localStorage.setItem("portfolio-theme", theme);
    }

    // Apply saved theme on page load
    applyTheme(savedTheme);

    // Switch theme when lamp is clicked
    themeButton.addEventListener("click", function () {

        const currentTheme =
            document.documentElement.getAttribute("data-theme") || "light";

        const newTheme = currentTheme === "light" ? "dark" : "light";

        applyTheme(newTheme);

    });

})();


/* ==========================================
   3D GLASS PLANETS - COLLISION ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const layer = document.getElementById("glass-planets-layer");

    if (!layer) return;

    // Respect reduced-motion accessibility settings
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Configuration
    const planetCount = 12;
    const planets = [];

    const MIN_SPEED = 1.2;
    const MAX_SPEED = 2.4;
    const RESTITUTION = 0.92;

    let animationFrame = null;
    let lastTime = 0;

    // Generate random movement speed
    function randomVelocity() {
        const direction = Math.random() < 0.5 ? -1 : 1;
        return direction * (MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED));
    }

    // Create glass planets
    for (let i = 0; i < planetCount; i++) {

        const element = document.createElement("div");
        element.className = "glass-planet";

        const size = 35 + Math.random() * 65;

        layer.appendChild(element);

        planets.push({
            element,
            size,
            x: 0,
            y: 0,
            vx: randomVelocity(),
            vy: randomVelocity(),
            mass: size * size,
            depth: 0.65 + Math.random() * 0.35
        });
    }

    // Distribute planets throughout the entire section
    function resizePlanets() {

        const width = layer.clientWidth;
        const height = layer.clientHeight;

        if (!width || !height) return;

        const columns = 4;
        const rows = Math.ceil(planetCount / columns);

        planets.forEach((planet, index) => {

            const column = index % columns;
            const row = Math.floor(index / columns);

            const cellWidth = width / columns;
            const cellHeight = height / rows;

            const radius = planet.size / 2;

            planet.x =
                (column + 0.5) * cellWidth +
                (Math.random() - 0.5) * cellWidth * 0.45;

            planet.y =
                (row + 0.5) * cellHeight +
                (Math.random() - 0.5) * cellHeight * 0.45;

            // Keep planets inside section boundaries
            planet.x = Math.max(radius, Math.min(width - radius, planet.x));
            planet.y = Math.max(radius, Math.min(height - radius, planet.y));

            planet.element.style.width = `${planet.size}px`;
            planet.element.style.height = `${planet.size}px`;
        });
    }

    resizePlanets();

    // Detect and resolve planet collisions
    function handleCollisions() {

        for (let i = 0; i < planets.length; i++) {

            for (let j = i + 1; j < planets.length; j++) {

                const a = planets[i];
                const b = planets[j];

                const dx = b.x - a.x;
                const dy = b.y - a.y;

                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = (a.size + b.size) / 2;

                if (distance < minDistance && distance > 0) {

                    const nx = dx / distance;
                    const ny = dy / distance;

                    // Separate overlapping planets
                    const overlap = minDistance - distance;

                    a.x -= nx * overlap / 2;
                    a.y -= ny * overlap / 2;

                    b.x += nx * overlap / 2;
                    b.y += ny * overlap / 2;

                    // Calculate relative velocity
                    const relativeVelocity =
                        (b.vx - a.vx) * nx +
                        (b.vy - a.vy) * ny;

                    // Apply collision impulse
                    if (relativeVelocity < 0) {

                        const impulse =
                            -(1 + RESTITUTION) * relativeVelocity /
                            (1 / a.mass + 1 / b.mass);

                        a.vx -= impulse * nx / a.mass;
                        a.vy -= impulse * ny / a.mass;

                        b.vx += impulse * nx / b.mass;
                        b.vy += impulse * ny / b.mass;

                        // Scattering effect
                        a.vx += (Math.random() - 0.5) * 0.45;
                        a.vy += (Math.random() - 0.5) * 0.45;

                        b.vx += (Math.random() - 0.5) * 0.45;
                        b.vy += (Math.random() - 0.5) * 0.45;
                    }
                }
            }
        }
    }

    // Animation loop
    function animate(time) {

        if (!lastTime) lastTime = time;

        const delta = Math.min((time - lastTime) / 16.67, 2);

        lastTime = time;

        const width = layer.clientWidth;
        const height = layer.clientHeight;

        if (!width || !height) {
            animationFrame = requestAnimationFrame(animate);
            return;
        }

        // Move planets and bounce off boundaries
        planets.forEach(planet => {

            planet.x += planet.vx * delta;
            planet.y += planet.vy * delta;

            const radius = planet.size / 2;

            if (planet.x <= radius || planet.x >= width - radius) {

                planet.vx *= -1;

                planet.x = Math.max(
                    radius,
                    Math.min(width - radius, planet.x)
                );
            }

            if (planet.y <= radius || planet.y >= height - radius) {

                planet.vy *= -1;

                planet.y = Math.max(
                    radius,
                    Math.min(height - radius, planet.y)
                );
            }
        });

        // Handle planet-to-planet collisions
        handleCollisions();

        // Detect current theme and render planets
        const isDarkMode =
            document.documentElement.getAttribute("data-theme") === "dark";

        planets.forEach(planet => {

            planet.element.style.transform =
                `translate3d(
                    ${planet.x - planet.size / 2}px,
                    ${planet.y - planet.size / 2}px,
                    0
                ) scale(${planet.depth})`;

            // Stronger visibility in light mode
            planet.element.style.opacity = isDarkMode ? 0.22 : 0.48;
        });

        animationFrame = requestAnimationFrame(animate);
    }

    // Pause animation when section is outside the viewport
    const observer = new IntersectionObserver(entries => {

        const isVisible = entries[0].isIntersecting;

        if (isVisible && !animationFrame) {

            lastTime = 0;
            animationFrame = requestAnimationFrame(animate);

        } else if (!isVisible && animationFrame) {

            cancelAnimationFrame(animationFrame);
            animationFrame = null;
            lastTime = 0;
        }

    });

    observer.observe(layer);

    // Reposition planets when screen size changes
    window.addEventListener("resize", resizePlanets);

});


/* ==========================================
   PROJECTS - FLOATING RADIAL NETWORK NODES
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const canvas = document.getElementById("project-network-bg");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Configuration
    const COMPONENT_COUNT = 10;
    const MIN_NODES = 6;
    const MAX_NODES = 9;

    let width = 0;
    let height = 0;
    let animationFrame = null;
    let clusters = [];

    // Theme-aware colours
    function getColors() {

        const isDark =
            document.documentElement.getAttribute("data-theme") === "dark";

        return {
            line: isDark
                ? "rgba(185, 195, 210, 0.23)"
                : "rgba(75, 85, 100, 0.24)",

            node: isDark
                ? "rgba(205, 215, 230, 0.78)"
                : "rgba(75, 85, 100, 0.72)",

            center: isDark
                ? "rgba(220, 225, 235, 0.88)"
                : "rgba(65, 75, 90, 0.85)"
        };
    }

    function random(min, max) {
        return min + Math.random() * (max - min);
    }

    // Create one radial component:
    // Every outer node connects ONLY to the central node.
    function createRadialComponent() {

        const nodes = [];
        const nodeCount = Math.floor(
            random(MIN_NODES, MAX_NODES + 1)
        );

        for (let i = 0; i < nodeCount; i++) {

            const angle =
                (Math.PI * 2 * i / nodeCount) +
                random(-0.35, 0.35);

            const distance = random(23, 48);

            nodes.push({
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                radius: random(1.1, 1.9)
            });
        }

        return {
            nodes,
            x: 0,
            y: 0,
            vx: random(0.10, 0.25),
            vy: random(0.08, 0.22),
            directionX: Math.random() < 0.5 ? -1 : 1,
            directionY: Math.random() < 0.5 ? -1 : 1,
            angle: random(0, Math.PI * 2),
            rotationSpeed: random(-0.0005, 0.0005),
            scale: random(0.75, 1.05),
            phase: random(0, Math.PI * 2),
            opacity: random(0.65, 0.9),
            side: "left"
        };
    }

    // Place components on both sides of the project cards
    function positionClusters() {

        clusters = [];

        const isSmallScreen = width < 900;

        for (let i = 0; i < COMPONENT_COUNT; i++) {

            const cluster = createRadialComponent();

            // Alternate between left and right sides
            cluster.side = i % 2 === 0 ? "left" : "right";

            if (cluster.side === "left") {

                cluster.x = random(
                    width * 0.035,
                    width * (isSmallScreen ? 0.19 : 0.20)
                );

            } else {

                cluster.x = random(
                    width * (isSmallScreen ? 0.81 : 0.80),
                    width * 0.965
                );
            }

            cluster.y = random(height * 0.12, height * 0.88);

            // Smaller components on narrow screens
            if (isSmallScreen) {
                cluster.scale *= 0.75;
            }

            clusters.push(cluster);
        }
    }

    // Resize canvas
    function resizeCanvas() {

        const rect = canvas.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        if (!width || !height) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        positionClusters();
        drawNetwork();
    }

    // Draw one radial network
    function drawComponent(cluster, colors) {

        const centerX = cluster.x;
        const centerY = cluster.y;

        const cos = Math.cos(cluster.angle);
        const sin = Math.sin(cluster.angle);

        const points = cluster.nodes.map(node => {

            const localX = node.x * cluster.scale;
            const localY = node.y * cluster.scale;

            return {
                x: centerX + (localX * cos - localY * sin),
                y: centerY + (localX * sin + localY * cos),
                radius: node.radius
            };
        });

        ctx.globalAlpha = cluster.opacity;

        // Draw lines from the centre to outer nodes only
        ctx.beginPath();

        points.forEach(point => {
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(point.x, point.y);
        });

        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Draw outer nodes
        points.forEach(point => {

            ctx.beginPath();

            ctx.arc(
                point.x,
                point.y,
                point.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = colors.node;
            ctx.fill();
        });

        // Draw the central node
        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            2.4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = colors.center;
        ctx.fill();

        ctx.globalAlpha = 1;
    }

    // Draw every independent component
    function drawNetwork() {

        ctx.clearRect(0, 0, width, height);

        const colors = getColors();

        clusters.forEach(cluster => {
            drawComponent(cluster, colors);
        });
    }

    // Move components slowly within their side zones
    function updateClusters() {

        const isSmallScreen = width < 900;

        clusters.forEach(cluster => {

            const leftMin = width * 0.025;
            const leftMax = width * (isSmallScreen ? 0.20 : 0.22);

            const rightMin = width * (isSmallScreen ? 0.80 : 0.78);
            const rightMax = width * 0.975;

            const minX = cluster.side === "left" ? leftMin : rightMin;
            const maxX = cluster.side === "left" ? leftMax : rightMax;

            const margin = 55;
            const minY = margin;
            const maxY = Math.max(margin, height - margin);

            // Gentle diagonal floating movement
            cluster.x += cluster.vx * cluster.directionX;
            cluster.y += cluster.vy * cluster.directionY;

            // Very subtle rotation
            cluster.angle += cluster.rotationSpeed;

            // Gentle natural drift
            cluster.phase += 0.008;

            cluster.x += Math.sin(cluster.phase) * 0.025;
            cluster.y += Math.cos(cluster.phase) * 0.025;

            // Bounce horizontally within its own side
            if (cluster.x <= minX || cluster.x >= maxX) {
                cluster.directionX *= -1;
                cluster.x = Math.max(minX, Math.min(maxX, cluster.x));
            }

            // Bounce vertically
            if (cluster.y <= minY || cluster.y >= maxY) {
                cluster.directionY *= -1;
                cluster.y = Math.max(minY, Math.min(maxY, cluster.y));
            }
        });
    }

    // Animation loop
    function animate() {

        updateClusters();
        drawNetwork();

        animationFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {

        if (!animationFrame && !reducedMotion) {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    function stopAnimation() {

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    // Pause animation outside the Projects section
    const observer = new IntersectionObserver(entries => {

        if (entries[0].isIntersecting) {
            startAnimation();
        } else {
            stopAnimation();
        }

    });

    observer.observe(canvas);

    // Initial setup
    resizeCanvas();

    if (reducedMotion) return;

    // Handle window resizing
    window.addEventListener("resize", resizeCanvas);

    // Update colours when the theme changes
    const themeObserver = new MutationObserver(() => {
        drawNetwork();
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
    });

});


/* ==========================================
   NAVBAR - ACTIVE SECTION SCROLL TRACKING
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = Array.from(navLinks)
        .map(link => {
            const id = link.getAttribute("href");

            if (!id || !id.startsWith("#")) return null;

            return document.querySelector(id);
        })
        .filter(Boolean);

    if (!navLinks.length || !sections.length) return;

    function updateActiveNavigation() {

        const header = document.querySelector(".site-header");
        const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

        // Tracking point below the fixed header
        const trackingPoint = headerHeight + window.innerHeight * 0.30;

        let currentSection = sections[0];

        sections.forEach(section => {

            const rect = section.getBoundingClientRect();

            if (rect.top <= trackingPoint) {
                currentSection = section;
            }
        });

        // Ensure Contact is active at the bottom of the page
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
        ) {
            currentSection = sections[sections.length - 1];
        }

        navLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") === `#${currentSection.id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    // Update while scrolling
    let ticking = false;

    window.addEventListener("scroll", function () {

        if (!ticking) {

            window.requestAnimationFrame(function () {
                updateActiveNavigation();
                ticking = false;
            });

            ticking = true;
        }

    }, { passive: true });

    // Update when clicking a navigation link
    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            setTimeout(updateActiveNavigation, 100);
        });

    });

    // Initial state
    updateActiveNavigation();

    window.addEventListener("resize", updateActiveNavigation);

});

/* ==========================================
   DYNAMIC GLASS HEADER EFFECT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");

    if (!header) return;

    let ticking = false;

    function updateGlassHeader() {
        const isScrolled = window.scrollY > 30;

        header.classList.toggle("scrolled", isScrolled);

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateGlassHeader);
            ticking = true;
        }
    }, { passive: true });

    updateGlassHeader();
});

/* ==========================================
   HERO HEADING - MOUSE 3D INTERACTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const heading = document.querySelector(".hero-heading");

    if (!heading) return;

    // Disable pointer movement on touch devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return;
    }

    let animationFrame;

    heading.addEventListener("pointermove", (event) => {

        const rect = heading.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 6;
        const rotateX = (0.5 - y) * 4;

        const moveX = (x - 0.5) * 9;
        const moveY = (y - 0.5) * 7;

        cancelAnimationFrame(animationFrame);

        animationFrame = requestAnimationFrame(() => {

            heading.style.setProperty("--heading-x", `${moveX}px`);
            heading.style.setProperty("--heading-y", `${moveY}px`);

            heading.style.setProperty("--heading-rotate-x", `${rotateX}deg`);
            heading.style.setProperty("--heading-rotate-y", `${rotateY}deg`);

        });

    });

    heading.addEventListener("pointerleave", () => {

        cancelAnimationFrame(animationFrame);

        heading.style.setProperty("--heading-x", "0px");
        heading.style.setProperty("--heading-y", "0px");

        heading.style.setProperty("--heading-rotate-x", "0deg");
        heading.style.setProperty("--heading-rotate-y", "0deg");

    });

});