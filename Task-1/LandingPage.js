// Simple smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Simple header background change on scroll
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(44, 62, 80, 0.95)';
            } else {
                header.style.background = '#2c3e50';
            }
        });
        // Simple form submission
        document.querySelector('.contact-form form').addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const program = document.getElementById('program').value;

            // Simple validation
            if (name && email && program) {
                alert('Thank you ' + name + '! We will contact you soon about the ' + program + ' program.');
                this.reset(); // Clear the form
            } else {
                alert('Please fill in all required fields.');
            }
        });