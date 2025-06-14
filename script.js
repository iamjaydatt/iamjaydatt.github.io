window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? '<span class="material-icons">close</span>' : '<span class="material-icons">menu</span>';
});

window.addEventListener('mousemove', (e) => {
    const particles = document.querySelector('.hero-particles');
    const x = (e.clientX - window.innerWidth / 2) * 0.02;
    const y = (e.clientY - window.innerHeight / 2) * 0.02;
    particles.style.transform = `translate(${x}px, ${y}px)`;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.transition = 'all 0.6s ease-out';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.feature-card, .hero-btn, .profile-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    observer.observe(el);
});

document.querySelectorAll('.nav-links a').forEach(link => {
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

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.classList.add('success');
            formMessage.classList.remove('error');
            contactForm.reset();
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.classList.remove('success');
            }, 3000);
        } else {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }
    } else {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
    }
});
