// Smooth-scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Highlight active section in nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const linkById = new Map(
    [...navLinks].map(a => [a.getAttribute('href').slice(1), a])
);

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const link = linkById.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('is-active'));
            link.classList.add('is-active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => navObserver.observe(s));

// Reveal-on-scroll (skipped for users who prefer reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const targets = document.querySelectorAll(
        '.hero-title, .hero-sub, .hero-meta, .section-title, .prose, .stack-grid, .project-head, .project-body, .innovation, .project-cta, .big-link'
    );
    targets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(el => revealObserver.observe(el));
}
