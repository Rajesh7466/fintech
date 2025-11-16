
        // Animated Counter
        document.addEventListener('DOMContentLoaded', function() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const animate = () => {
                    const value = +counter.getAttribute('data-target');
                    const data = +counter.innerText;
                    const time = value / speed;
                    
                    if(data < value) {
                        counter.innerText = Math.ceil(data + time);
                        setTimeout(animate, 1);
                    } else {
                        counter.innerText = value + (value === 99.9 ? '%' : '+');
                    }
                }
                
                // Start animation when element is in viewport
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animate();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(counter);
            });

            // Add hover effect to buttons
            document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .btn-outline-primary-custom').forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });

            // Form handling for demo purposes
            document.querySelectorAll('.btn-primary-custom, .btn-outline-primary-custom').forEach(button => {
                if (button.textContent.includes('Get Started') || button.textContent.includes('Sign Up') || button.textContent.includes('Start Free Trial')) {
                    button.addEventListener('click', () => {
                        alert('Thank you for your interest! This is a demo landing page.');
                    });
                }
            });

            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.style.padding = '0.5rem 0';
                    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.padding = '1rem 0';
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Close mobile menu if open
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse.classList.contains('show')) {
                            navbarToggler.click();
                        }
                        
                        // Calculate offset for fixed navbar
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Add active class to navigation links based on scroll position
            function updateActiveNavLink() {
                const sections = document.querySelectorAll('section[id]');
                const navLinks = document.querySelectorAll('.nav-link');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', updateActiveNavLink);

            // Initialize floating cards animation
            function initFloatingCards() {
                const cards = document.querySelectorAll('.floating-card');
                cards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 1}s`;
                });
            }
            
            initFloatingCards();

            // Add intersection observer for fade-in animations
            const fadeElements = document.querySelectorAll('.feature-card, .product-card, .solution-card, .testimonial-card');
            
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                fadeObserver.observe(element);
            });

            // Feature tabs functionality
            const featureTabBtns = document.querySelectorAll('.feature-tab-btn');
            const featureTabPanes = document.querySelectorAll('.feature-tab-pane');
            
            featureTabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons and panes
                    featureTabBtns.forEach(b => b.classList.remove('active'));
                    featureTabPanes.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    // Show corresponding tab pane
                    const tabId = btn.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });
        });
    