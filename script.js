document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById("hero");

    function revealHero() {
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            heroSection.classList.add("show");
            window.removeEventListener("scroll", revealHero); // Run only once
        }
    }

    window.addEventListener("scroll", revealHero);
    revealHero();

    // Theme switching functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check if user has a stored preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        applyLightTheme();
    } else {
        // Default is dark theme (no class needed)
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        applyDarkTheme();
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
            applyDarkTheme();
        } else {
            document.body.classList.add('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
            applyLightTheme();
        }
    });
    
    function applyDarkTheme() {
        document.documentElement.style.setProperty('--primary', 'var(--primary-dark)');
        document.documentElement.style.setProperty('--secondary', 'var(--secondary-dark)');
        document.documentElement.style.setProperty('--accent', 'var(--accent-dark)');
        document.documentElement.style.setProperty('--dark', 'var(--dark-dark)');
        document.documentElement.style.setProperty('--light', 'var(--light-dark)');
        document.documentElement.style.setProperty('--text', 'var(--text-dark)');
        document.documentElement.style.setProperty('--background', 'var(--background-dark)');
        document.documentElement.style.setProperty('--card', 'var(--card-dark)');
        document.documentElement.style.setProperty('--border', 'var(--border-dark)');
        document.documentElement.style.setProperty('--shadow', 'var(--shadow-dark)');
    }
    
    function applyLightTheme() {
        document.documentElement.style.setProperty('--primary', 'var(--primary-light)');
        document.documentElement.style.setProperty('--secondary', 'var(--secondary-light)');
        document.documentElement.style.setProperty('--accent', 'var(--accent-light)');
        document.documentElement.style.setProperty('--dark', 'var(--dark-light)');
        document.documentElement.style.setProperty('--light', 'var(--light-light)');
        document.documentElement.style.setProperty('--text', 'var(--text-light)');
        document.documentElement.style.setProperty('--background', 'var(--background-light)');
        document.documentElement.style.setProperty('--card', 'var(--card-light)');
        document.documentElement.style.setProperty('--border', 'var(--border-light)');
        document.documentElement.style.setProperty('--shadow', 'var(--shadow-light)');
    }

    // Loading Screen
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.loader').classList.add('hidden');
        }, 1000);
    });

    // Section Observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Progress Bars Animation
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                const percent = progressFill.getAttribute('data-percent');
                progressFill.style.width = percent;
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-card').forEach(card => {
        progressObserver.observe(card);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});

// Carousel functionality
const obj = {
    CAROUSEL: document.querySelector('.carousel'),
    info: [
        {
            img: "Images/1.png"
        },
        {
            img: "Images/2.png"
        },
        {
            img: "Images/3.png"
        },
        {
            img: 'Images/4.png'
        },
        {
            img: "Images/5.png"
        },
        {
            img: "Images/6.png"
        },
        {
            img: "Images/7.png"
        },
        {
            img: "Images/8.png"
        },
        {
            img: "Images/9.png"
        },
        {
            img: "Images/10.png"
        },
        {
            img: "Images/11.png"
        },
        {
            img: "Images/12.png"
        }
    ],

    addAll() {
        this.info.forEach((e) => {
            let div = document.createElement('div');
            div.style.backgroundImage = `url(${e.img})`;
            div.style.backgroundSize = "contain";
            div.style.backgroundPosition = "center";
            div.style.backgroundRepeat = "no-repeat";
            this.CAROUSEL.append(div);
        });
    },

    swipeRight() {
        this.CAROUSEL.append(this.CAROUSEL.firstElementChild);
    },

    swipeLeft() {
        this.CAROUSEL.prepend(this.CAROUSEL.lastChild);
    },

    init() {
        this.addAll();
    }
}

obj.init();

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        obj.swipeRight();
    } else if (e.key === "ArrowRight") {
        obj.swipeLeft();
    }
});

let carouselInterval = setInterval(() => {
    obj.swipeLeft();
}, 4000);

// Stop the carousel when the window loses focus
window.addEventListener('blur', () => {
    clearInterval(carouselInterval);
});

// Resume the carousel when the window regains focus
window.addEventListener('focus', () => {
    carouselInterval = setInterval(() => {
        obj.swipeLeft();
    }, 4000);
});

// Calculator Carousel functionality
const calculatorObj = {
    CAROUSEL: document.querySelector('.carousel_cal'),
    info: [
        {
            img: "Images/basic.png"
        },
        {
            img: "Images/trig.png"
        },
        {
            img: "Images/basic1.png"
        },
        {
            img: "Images/trig2.png"
        }
    ],

    addAll() {
        this.info.forEach((e) => {
            let div = document.createElement('div');
            div.style.backgroundImage = `url(${e.img})`;
            div.style.backgroundSize = "contain";
            div.style.backgroundPosition = "center";
            div.style.backgroundRepeat = "no-repeat";
            this.CAROUSEL.append(div);
        });
    },

    swipeRight() {
        this.CAROUSEL.append(this.CAROUSEL.firstElementChild);
    },

    swipeLeft() {
        this.CAROUSEL.prepend(this.CAROUSEL.lastChild);
    },

    init() {
        this.addAll();
    }
}

// FullStack Carousel functionality
const fullObj = {
    CAROUSEL: document.querySelector('.carousel_full'),
    info: [
        {
            img: "Images/QuestionManager.png"
        }
    ],

    addAll() {
        this.info.forEach((e) => {
            let div = document.createElement('div');
            div.style.backgroundImage = `url(${e.img})`;
            div.style.backgroundSize = "contain";
            div.style.backgroundPosition = "center";
            div.style.backgroundRepeat = "no-repeat";
            this.CAROUSEL.append(div);
        });
    },

    swipeRight() {
        this.CAROUSEL.append(this.CAROUSEL.firstElementChild);
    },

    swipeLeft() {
        this.CAROUSEL.prepend(this.CAROUSEL.lastChild);
    },

    init() {
        this.addAll();
    }
}


calculatorObj.init();
fullObj.init();

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        calculatorObj.swipeRight();
    } else if (e.key === "ArrowRight") {
        calculatorObj.swipeLeft();
    }
});

let calculatorInterval = setInterval(() => {
    calculatorObj.swipeLeft();
}, 4000);

// Stop the calculator carousel when the window loses focus
window.addEventListener('blur', () => {
    clearInterval(calculatorInterval);
});

// Resume the calculator carousel when the window regains focus
window.addEventListener('focus', () => {
    calculatorInterval = setInterval(() => {
        calculatorObj.swipeLeft();
    }, 4000);
}); 