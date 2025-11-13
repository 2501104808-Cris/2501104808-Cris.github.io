document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // --- 2. Project Filtering ---
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const cardTech = card.getAttribute('data-tech');
                
                // Show/hide based on filter
                if (filterValue === 'all' || cardTech === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- 3. Typewriter Effect (Dynamic Hero Text) ---
    const textElement = document.getElementById('typing-text');
    const phrases = ["Full Stack Developer", "UX Enthusiast", "Code Architect"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(type, typeSpeed);
    }

    type(); // Start the animation


    // --- 4. Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').className = 'fas fa-sun'; // Change icon to Sun
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').className = 'fas fa-moon'; // Change icon to Moon
        }
    });

});