document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL ELEMENTS ---
    const themeToggle = document.getElementById('themeToggle');
    const navbar = document.querySelector('.navbar');

    // --- THEME SWITCHER ---
    const applyTheme = (theme) => {
        const root = document.documentElement;
        const themeIcon = themeToggle.querySelector('i');
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            root.style.setProperty('--primary', 'var(--primary-light)');
            root.style.setProperty('--secondary', 'var(--secondary-light)');
            root.style.setProperty('--accent', 'var(--accent-light)');
            root.style.setProperty('--text', 'var(--text-light)');
            root.style.setProperty('--bg', 'var(--bg-light)');
            root.style.setProperty('--card-bg', 'var(--card-bg-light)');
            root.style.setProperty('--card-border', 'var(--card-border-light)');
            root.style.setProperty('--shadow', 'var(--shadow-light)');
        } else {
            document.body.classList.remove('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            root.style.setProperty('--primary', 'var(--primary-dark)');
            root.style.setProperty('--secondary', 'var(--secondary-dark)');
            root.style.setProperty('--accent', 'var(--accent-dark)');
            root.style.setProperty('--text', 'var(--text-dark)');
            root.style.setProperty('--bg', 'var(--bg-dark)');
            root.style.setProperty('--card-bg', 'var(--card-bg-dark)');
            root.style.setProperty('--card-border', 'var(--card-border-dark)');
            root.style.setProperty('--shadow', 'var(--shadow-dark)');
        }
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);


    // --- LOADER ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.loader').classList.add('hidden');
        }, 500); // Shorter delay for faster load
    });


    // --- NAVBAR VISIBILITY & ACTIVE LINK ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const handleScroll = () => {
        // Navbar visibility
        if (window.scrollY > 50) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
        
        // Active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    // --- TYPING EFFECT ---
    const typingTextElement = document.querySelector('.typing-text');
    const words = ["Software Developer", "Creative Problem-Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        let displayText;

        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex--);
        } else {
            displayText = currentWord.substring(0, charIndex++);
        }
        typingTextElement.textContent = displayText;

        const typeSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentWord.length + 1) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === -1) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typeSpeed);
        }
    }
    type();


    // --- REUSABLE CAROUSEL CLASS ---
    class Carousel {
        constructor(containerSelector, images) {
            this.container = document.querySelector(containerSelector);
            if (!this.container) return;
            this.images = images;
            this.currentIndex = 0;
            this.intervalId = null;
            this.init();
        }

        init() {
            this.container.innerHTML = `
                <div class="carousel-slides"></div>
                <div class="carousel-nav"></div>
            `;
            this.slidesContainer = this.container.querySelector('.carousel-slides');
            this.navContainer = this.container.querySelector('.carousel-nav');

            this.images.forEach((img, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.style.backgroundImage = `url(${img})`;
                if(index === 0) slide.classList.add('active');
                this.slidesContainer.appendChild(slide);
                
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                dot.dataset.index = index;
                if(index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.navContainer.appendChild(dot);
            });

            this.slides = this.slidesContainer.querySelectorAll('.carousel-slide');
            this.dots = this.navContainer.querySelectorAll('.carousel-dot');
            
            this.start();
        }

        goToSlide(index) {
            this.slides[this.currentIndex].classList.remove('active');
            this.dots[this.currentIndex].classList.remove('active');
            this.currentIndex = index;
            this.slides[this.currentIndex].classList.add('active');
            this.dots[this.currentIndex].classList.add('active');
            this.resetInterval();
        }
        
        nextSlide() {
            const nextIndex = (this.currentIndex + 1) % this.images.length;
            this.goToSlide(nextIndex);
        }

        start() {
            this.intervalId = setInterval(() => this.nextSlide(), 4000);
        }

        resetInterval() {
            clearInterval(this.intervalId);
            this.start();
        }
    }
    
    // --- INITIALIZE ALL CAROUSELS ---
    new Carousel('[data-carousel-name="crypto"]', [
        "Images/1.png", "Images/2.png", "Images/3.png", "Images/4.png", 
        "Images/5.png", "Images/6.png", "Images/7.png", "Images/8.png", 
        "Images/9.png", "Images/10.png", "Images/11.png", "Images/12.png"
    ]);

    new Carousel('[data-carousel-name="fullstack"]', [
        "Images/QuestionManager.png"
    ]);

    new Carousel('[data-carousel-name="calculator"]', [
        "Images/basic.png", "Images/trig.png", "Images/basic1.png", "Images/trig2.png"
    ]);

    // --- INTERSECTION OBSERVERS FOR ANIMATIONS ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate progress bars if they are in a visible skill card
                if (entry.target.classList.contains('skill-card')) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    if (progressFill) {
                        const percent = progressFill.getAttribute('data-percent');
                        progressFill.style.width = percent;
                    }
                }
                // Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section, .skill-card, .project-card, .contact-card, .contact-form-wrapper').forEach(el => {
        animationObserver.observe(el);
    });

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would integrate with a service like EmailJS, Formspree, or your own backend.
        const formData = new FormData(contactForm);
        console.log("Form submitted with the following data:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});
