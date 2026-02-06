document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typewriter Effect
    const typeSpan = document.querySelector('.typing-text');
    const toType = ["Future Leaders", "Creative Minds", "Inclusive Classrooms", "Curriculums"];
    let typeIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = toType[typeIndex];
        
        if (isDeleting) {
            typeSpan.textContent = currentWord.substring(0, charIndex--);
        } else {
            typeSpan.textContent = currentWord.substring(0, charIndex++);
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeIndex = (typeIndex + 1) % toType.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    typeEffect();


    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // 3. Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));


    // 4. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px -10px rgba(2, 12, 27, 0.7)";
            navbar.style.height = "70px";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.height = "80px";
        }
    });


    // 5. Smooth Scroll for Back To Top
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // 6. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        // Simple validation logic
        if(name.value.trim() === '') {
            shake(name);
            isValid = false;
        }
        
        if(email.value.trim() === '' || !email.value.includes('@')) {
            shake(email);
            isValid = false;
        }

        if(message.value.trim() === '') {
            shake(message);
            isValid = false;
        }

        if (isValid) {
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Simulate sending state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.borderColor = '#64ffda';
                btn.style.color = '#64ffda';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        }
    });

    function shake(element) {
        element.style.borderColor = 'red';
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
            element.style.borderColor = '';
        }, 500);
    }
});

// Add shake keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(5px); }
    50% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
    100% { transform: translateX(0); }
}`;
document.head.appendChild(styleSheet);