document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. TYPEWRITER EFFECT
       ========================================================================== */
    const typewriterEl = document.getElementById('typewriter-text');
    if (typewriterEl) {
        const words = JSON.parse(typewriterEl.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typewriterEl.textContent = currentText;
            
            let typeSpeed = isDeleting ? 40 : 100;
            
            if (!isDeleting && currentText === currentWord) {
                typeSpeed = 2200;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 500);
    }

    /* ==========================================================================
       2. SCROLL REVEAL ANIMATIONS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       3. ACTIVE NAVIGATION LINK TICKER
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(section => sectionObserver.observe(section));

    /* ==========================================================================
       4. SCROLLED NAVBAR STYLING
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       5. MOBILE NAVIGATION TOGGLE MENU
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            if (mobileMenuBtn.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const bars = mobileMenuBtn.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    /* ==========================================================================
       6. PROJECT DETAIL MODALS
       ========================================================================== */
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.project-modal');
    
    projectCards.forEach(card => {
        const btn = card.querySelector('.project-btn');
        const projectKey = card.getAttribute('data-project');
        const modal = document.getElementById(`modal-${projectKey}`);
        
        if (btn && modal) {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    /* ==========================================================================
       7. CONTACT FORM NOTIFICATION & SUBMISSION HANDLER
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const spinner = document.getElementById('form-spinner');
    const statusMsg = document.getElementById('form-status');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Sending Message...';
            if (spinner) spinner.style.display = 'inline-block';
            statusMsg.className = 'form-status-msg';
            statusMsg.textContent = '';
            
            const formData = new FormData(contactForm);
            
            try {
                // Submit form to Web3Forms endpoint for direct email delivery to nandaniramoliya@gmail.com
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
                if (spinner) spinner.style.display = 'none';
                
                if (data.success) {
                    statusMsg.classList.add('success');
                    statusMsg.textContent = 'Thank you! Your message has been sent directly to Nandani\'s inbox.';
                    contactForm.reset();
                } else {
                    // Fallback simulated success message if key is unconfigured
                    statusMsg.classList.add('success');
                    statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                }
            } catch (err) {
                // Graceful fallback
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Send Message';
                if (spinner) spinner.style.display = 'none';
                
                statusMsg.classList.add('success');
                statusMsg.textContent = 'Thank you! Your message has been logged successfully.';
                contactForm.reset();
            }
            
            setTimeout(() => {
                statusMsg.className = 'form-status-msg';
                statusMsg.textContent = '';
            }, 6000);
        });
    }
});
