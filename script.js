// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make hero visible immediately
const hero = document.querySelector('.hero');
if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
}

// --- GSAP Hero Text Animation ---
document.addEventListener("DOMContentLoaded", () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, skipping text animation');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const splitText = (element) => {
        if (!element) return [];
        const text = element.textContent.trim();
        const words = text.split(' ');
        element.innerHTML = '';
        const chars = [];

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            wordSpan.style.marginRight = '0.25em';

            const wordChars = word.split('');
            wordChars.forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char === ' ' ? '\u00A0' : char;
                charSpan.style.display = 'inline-block';
                charSpan.classList.add('split-char');
                wordSpan.appendChild(charSpan);
                chars.push(charSpan);
            });

            element.appendChild(wordSpan);
        });
        return chars;
    };

    const animateHeroText = () => {
        const h1 = document.querySelector('.hero-title');
        if (!h1) return;

        // Ensure fonts are loaded before splitting/animating
        document.fonts.ready.then(() => {
            const chars = splitText(h1);
            if (chars.length === 0) return;

            // Set initial state
            gsap.set(chars, { opacity: 0, y: 40 });

            // Animate on page load
            gsap.to(chars, {
                opacity: 1,
                y: 0,
                duration: 1.25,
                ease: 'power3.out',
                stagger: 0.05,
                delay: 0.3
            });
        });
    };

    // Wait a bit for GSAP to be fully ready
    setTimeout(animateHeroText, 100);
});

// Hide scroll indicator on scroll
let scrollTimeout;
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.3s ease';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
    });
}

