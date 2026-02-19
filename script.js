document.addEventListener('DOMContentLoaded', () => {

    const typeSpan = document.querySelector('.typing-text');
    const toType = ["Future Leaders.", "Creative Minds.", "Inclusive Classrooms.", "Curriculums."];
    let typeIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 200;

    function typeEffect() {
        const currentWord = toType[typeIndex];

        if (isDeleting) {
            typeSpan.textContent = currentWord.substring(0, charIndex--);
            typeSpeed = 100;
        } else {
            typeSpan.textContent = currentWord.substring(0, charIndex++);
            typeSpeed = 200;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeIndex = (typeIndex + 1) % toType.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typeSpan) typeEffect();

    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-reveal');
    hiddenElements.forEach(el => observer.observe(el));

    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.style.boxShadow = "0 10px 30px -10px rgba(2, 12, 27, 0.7)";
            navbar.style.height = "70px";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.height = "90px";
        }

        if (scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const chatWidget = document.getElementById('chatbot-widget');
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.querySelector('.chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (chatWidget) {
        function toggleChat() {
            chatWindow.classList.toggle('hidden-chat');
            if (!chatWindow.classList.contains('hidden-chat')) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }

        if (chatToggleBtn) chatToggleBtn.addEventListener('click', toggleChat);
        if (chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChat);

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';

                const loadingId = addLoadingIndicator();

                setTimeout(() => {
                    removeLoadingIndicator(loadingId);
                    const response = getBotResponse(message.toLowerCase());
                    addMessage(response, 'bot');
                }, 1000);
            }
        }

        if (chatSendBtn) chatSendBtn.addEventListener('click', sendMessage);

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }

        function addMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', `${sender}-message`);
            msgDiv.innerHTML = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function addLoadingIndicator() {
            const id = 'loading-' + Date.now();
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', 'bot-message');
            msgDiv.id = id;
            msgDiv.innerHTML = '<i class="fas fa-ellipsis-h fa-beat"></i>';
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return id;
        }

        function removeLoadingIndicator(id) {
            const el = document.getElementById(id);
            if (el) el.remove();
        }

        function getBotResponse(input) {
            input = input.toLowerCase();

            if (input.match(/(hello|hi|hey|namaste|kaise ho|kya haal|sat sri akal|kidda|ki haal|assalam|salam)/)) {
                if (input.includes('namaste') || input.includes('kaise') || input.includes('kya haal')) {
                    return "Namaste! Main Promila ki AI assistant hoon. Main apki kya madad kar sakti hoon?";
                } else if (input.includes('sat sri akal') || input.includes('kidda') || input.includes('ki haal')) {
                    return "Sat Sri Akal! Main Promila di AI assistant haan. Dasso main tuhadi ki madad kar sakdi haan?";
                } else if (input.includes('assalam') || input.includes('salam')) {
                    return "Assalam Walekum! Main Promila ki AI assistant hoon. Kahiye kaise madad karoon?";
                } else {
                    return "Hello! I am Promila's AI assistant. You can speak to me in English, Hindi/Hinglish, Punjabi, or Urdu!";
                }
            }

            if (input.match(/(experience|work|job|kaam|naukri|tajurba|kamm)/)) {
                if (input.match(/(kaam|naukri|tajurba)/)) {
                    return "Promila ji ko Senior Educator ke roop mein kaafi tajurba hai. Unhone Delhi Public School aur St. Mary's Academy mein kaam kiya hai. Details ke liye <a href='#experience' style='color:inherit; text-decoration:underline;'>Experience</a> section dekhein.";
                } else if (input.match(/(kamm)/)) {
                    return "Promila ji nu Senior Educator vajon kaafi tajurba hai. Ohna ne Delhi Public School te St. Mary's Academy vich kamm kita hai. Vadhere jaankari layi <a href='#experience' style='color:inherit; text-decoration:underline;'>Experience</a> section vekh sakde ho.";
                }
                return "Promila has extensive experience as a Senior Educator at Delhi Public School. Check the <a href='#experience' style='color:inherit; text-decoration:underline;'>Experience</a> section!";
            }

            if (input.match(/(book|author|publication|kitab|pustak)/)) {
                if (input.match(/(kitab|pustak)/)) {
                    return "Promila ji ne do kitabein likhi hain: 'Mera Dard Sathi' aur 'Sai Sun Lo Meri Pukar'. Aap unhe <a href='#books' style='color:inherit; text-decoration:underline;'>Books</a> section mein dekh sakte hain.";
                }
                return "Promila has published two books: 'Mera Dard Sathi' and 'Sai Sun Lo Meri Pukar'. Check the <a href='#books' style='color:inherit; text-decoration:underline;'>Books</a> section.";
            }

            if (input.match(/(contact|email|reach|address|sampark|gal baat|milna|baat)/)) {
                if (input.match(/(sampark|milna|baat)/)) {
                    return "Aap Promila ji se <b>kushgaming84@gmail.com</b> par sampark kar sakte hain ya niche diye gaye form ko bhar sakte hain.";
                } else if (input.match(/(gal baat)/)) {
                    return "Tusi Promila ji naal <b>kushgaming84@gmail.com</b> te sampark kar sakde ho ya thalle ditta form bhar sakde ho.";
                }
                return "You can reach Promila at <b>kushgaming84@gmail.com</b> or use the contact form below.";
            }

            if (input.match(/(skill|expertise|tech|hunar|kaabil|mahirt)/)) {
                return "Her expertise includes Curriculum Design, Classroom Management, and EdTech integration.";
            }

            if (input.match(/(hire|resume|cv)/)) {
                return "Promila is open to new opportunities! Please reach out via the Contact section.";
            }

            return "I'm still learning! Please send a message via the <a href='#contact' style='color:inherit; text-decoration:underline;'>Contact form</a>. (Maaf kijiye, main abhi seekh rahi hoon!)";
        }
    }

});
