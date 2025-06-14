const initPreloader = () => {
    window.addEventListener('load', () => {
        gsap.to('.preloader', {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                document.querySelector('.preloader').style.display = 'none';
            }
        });
    });
};

const initScrollProgress = () => {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.querySelector('.scroll-progress').style.width = `${scrollPercent}%`;
    });
};

const initNavbar = () => {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const backToTop = document.querySelector('.back-to-top');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? '<span class="material-icons">close</span>' : '<span class="material-icons">menu</span>';
    });

    document.querySelectorAll('.nav-links a, .sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<span class="material-icons">menu</span>';
            }
        });
    });
};

const initThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = `<span class="material-icons">${isDark ? 'light_mode' : 'dark_mode'}</span>`;
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    if (localStorage.getItem('theme') === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<span class="material-icons">light_mode</span>';
    }
};

const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.profile-image', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
    gsap.from('.hero h1', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
    gsap.from('.hero .subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Skills progress bar animations
    gsap.utils.toArray('.skill-item').forEach(item => {
        const progress = item.querySelector('.progress');
        const progressValue = progress.getAttribute('data-progress');
        gsap.from(progress, {
            width: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            onStart: () => {
                progress.style.width = `${progressValue}%`;
            }
        });
    });

    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Feature card animations with viewport check
    gsap.utils.toArray('.feature-card').forEach(card => {
        const isInViewport = () => {
            const rect = card.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight;
        };

        if (isInViewport()) {
            gsap.set(card, { opacity: 1, y: 0 });
        }

        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
                onEnter: () => {
                    gsap.to(card, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
                }
            }
        });
    });
};

const initBackToTop = () => {
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const sendButton = contactForm.querySelector('.send-button');
    const spinner = sendButton.querySelector('.loading-spinner');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        sendButton.disabled = true;
        spinner.classList.remove('hidden');

        setTimeout(() => {
            if (name && email && message) {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    formMessage.textContent = 'Message sent successfully!';
                    formMessage.classList.add('success');
                    formMessage.classList.remove('error');
                    contactForm.reset();
                    gsap.fromTo(formMessage, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                    setTimeout(() => {
                        gsap.to(formMessage, { opacity: 0, y: 10, duration: 0.5, onComplete: () => {
                            formMessage.textContent = '';
                            formMessage.classList.remove('success');
                        }});
                    }, 3000);
                } else {
                    formMessage.textContent = 'Please enter a valid email address.';
                    formMessage.classList.add('error');
                    formMessage.classList.remove('success');
                    gsap.fromTo(formMessage, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                }
            } else {
                formMessage.textContent = 'Please fill out all fields.';
                formMessage.classList.add('error');
                formMessage.classList.remove('success');
                gsap.fromTo(formMessage, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
            }

            sendButton.disabled = false;
            spinner.classList.add('hidden');
        }, 1000);
    });
};

const init = () => {
    initPreloader();
    initScrollProgress();
    initNavbar();
    initThemeToggle();
    initAnimations();
    initBackToTop();
    initContactForm();
};

init();