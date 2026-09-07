// Smooth scroll behavior for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll('.section, .hero');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--color-accent)';
            }
        });
    });

    // Staggered animation for research cards
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe research cards
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < 800) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / 600);
        }
    });
});

/* ==========================================================================
   Writing feed — renders posts.json into #posts-container.
   posts.json is maintained by .github/workflows/add-post.yml, which appends
   an entry whenever an issue using the "New post" template is opened.
   ========================================================================== */
(function () {
    const container = document.getElementById('posts-container');
    if (!container) return;

    const escapeHtml = (value) =>
        String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    const safeUrl = (value) => {
        const url = String(value == null ? '' : value).trim();
        return /^https?:\/\//i.test(url) ? url : '';
    };

    const formatDate = (value) => {
        if (!value) return '';
        const parsed = new Date(value);
        if (isNaN(parsed.getTime())) return escapeHtml(value);
        return parsed.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC'
        });
    };

    const render = (posts) => {
        if (!Array.isArray(posts) || posts.length === 0) {
            container.innerHTML =
                '<p class="posts-status">No posts listed yet.</p>';
            return;
        }

        const sorted = posts
            .filter((post) => post && safeUrl(post.url))
            .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

        container.innerHTML = sorted
            .map((post) => {
                const tags = Array.isArray(post.tags)
                    ? post.tags
                          .slice(0, 6)
                          .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
                          .join('')
                    : '';
                const date = formatDate(post.date);
                const source = post.source ? escapeHtml(post.source) : '';
                const meta = [
                    source ? `<span class="post-source">${source}</span>` : '',
                    date
                ]
                    .filter(Boolean)
                    .join(' · ');

                return [
                    `<a class="post-item" href="${escapeHtml(safeUrl(post.url))}" target="_blank" rel="noopener">`,
                    '<div class="post-head">',
                    `<h3 class="post-title">${escapeHtml(post.title || 'Untitled')}</h3>`,
                    meta ? `<span class="post-meta">${meta}</span>` : '',
                    '</div>',
                    post.summary
                        ? `<p class="post-summary">${escapeHtml(post.summary)}</p>`
                        : '',
                    tags ? `<div class="project-tags">${tags}</div>` : '',
                    '</a>'
                ].join('');
            })
            .join('');
    };

    fetch('posts.json', { cache: 'no-cache' })
        .then((response) => {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.json();
        })
        .then((data) => render(Array.isArray(data) ? data : data.posts))
        .catch(() => {
            container.innerHTML =
                '<p class="posts-status">Could not load the writing list. ' +
                'It is available in <a href="posts.json">posts.json</a>.</p>';
        });
})();
