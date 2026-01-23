/* =========================================
   MITSUBISHI MOTORS SHOWROOM - NGÔ ANH KHÔI
   PRO MAX JavaScript - Premium Interactions
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
    // =========================================
    // LENIS SMOOTH SCROLL INITIALIZATION
    // =========================================
    let lenis = null;

    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,           // Smooth scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,      // Disable on touch for native feel
            touchMultiplier: 2,
        });

        // RAF loop for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Expose lenis for scroll-linked animations
        window.lenis = lenis;
    }
    // =========================================
    // ELEMENTS
    // =========================================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // =========================================
    // STICKY HEADER WITH SMOOTH TRANSITION
    // =========================================
    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // =========================================
    // MOBILE MENU TOGGLE
    // =========================================
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            const isActive = nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // =========================================
    // SMOOTH SCROLL NAVIGATION - LENIS ENHANCED
    // UI/UX Pro Max: Ultra-smooth scroll with Lenis
    // =========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                // Use Lenis for ultra-smooth scrolling if available
                if (lenis) {
                    lenis.scrollTo(targetSection, {
                        offset: -headerHeight,
                        duration: 1.2,
                        easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart
                        immediate: false,
                        lock: false,
                        onComplete: () => {
                            // Update URL hash without jumping
                            history.pushState(null, null, targetId);
                        }
                    });
                } else {
                    // Fallback to native smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =========================================
    // ACTIVE NAV LINK ON SCROLL
    // =========================================
    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const headerHeight = header.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 10; // Slight buffer for accuracy
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveLink, 100));

    // =========================================
    // UIUX PRO MAX: INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    // Enhanced with Lenis-compatible smooth reveals
    // =========================================
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add active class with slight delay for smoother feel
                requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el, index) => {
        // Staggered animation delay for elements
        const staggerDelay = (index % 6) * 0.08; // Faster stagger
        el.style.animationDelay = `${staggerDelay}s`;
        revealObserver.observe(el);
    });

    // =========================================
    // VEHICLE CARDS - 3D TILT EFFECT (OPTIMIZED)
    // =========================================
    const vehicleCards = document.querySelectorAll('.vehicle-card');

    vehicleCards.forEach(card => {
        let ticking = false;

        card.addEventListener('mousemove', function (e) {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    // PERFORMANCE: Reduced rotation for smoother animation
                    const rotateX = ((y - centerY) / centerY) * 5;
                    const rotateY = ((centerX - x) / centerX) * 5;

                    card.style.transform = `
                        perspective(1000px) 
                        rotateX(${rotateX}deg) 
                        rotateY(${rotateY}deg) 
                        translateY(-8px) 
                        scale(1.02)
                    `;
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', function () {
            card.style.transition = 'transform 0.15s ease-out';
        });
    });

    // =========================================
    // HERO PARALLAX EFFECT
    // =========================================
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = window.innerHeight;

        if (scrolled < heroHeight && heroContent) {
            const opacity = 1 - (scrolled / heroHeight) * 1.5;
            const translateY = scrolled * 0.4;

            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;

            if (scrollIndicator) {
                scrollIndicator.style.opacity = Math.max(0, 1 - (scrolled / 200));
            }
        }
    }

    window.addEventListener('scroll', throttle(updateParallax, 16));

    // =========================================
    // VIDEO BACKGROUND HANDLING
    // =========================================
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        // Attempt to play video
        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(function () {
                // Autoplay blocked - video will show poster
                console.log('Video autoplay blocked, using poster image');
            });
        }

        // Fallback on error
        heroVideo.addEventListener('error', function () {
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.backgroundImage = 'url(background.png)';
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            }
        });
    }

    // =========================================
    // FLOATING AVATAR ANIMATION
    // =========================================
    const avatar = document.querySelector('.about-avatar');
    if (avatar) {
        let time = 0;

        function animateAvatar() {
            time += 0.03;
            const translateY = Math.sin(time) * 8;
            const rotate = Math.sin(time * 0.5) * 2;

            avatar.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
            requestAnimationFrame(animateAvatar);
        }

        // Start animation when avatar is in view
        const avatarObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateAvatar();
                avatarObserver.disconnect();
            }
        });

        avatarObserver.observe(avatar);
    }

    // =========================================
    // FLOATING BADGES ANIMATION
    // =========================================
    const badges = document.querySelectorAll('.about-avatar-badge');
    badges.forEach((badge, index) => {
        const delay = index * 0.8;
        badge.style.animationDelay = `${delay}s`;
    });

    // =========================================
    // HOTLINE BUTTON INTERACTION
    // =========================================
    const hotlineButtons = document.querySelectorAll('.hotline-btn, .btn-primary');

    hotlineButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.animation = 'none';
            // Force reflow
            void this.offsetWidth;
        });

        btn.addEventListener('mouseleave', function () {
            this.style.animation = '';
        });
    });

    // =========================================
    // PHONE CLICK TRACKING
    // =========================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('📞 Phone call initiated: 0938 79 3333');
            // Analytics tracking can be added here
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Call'
                });
            }
        });
    });

    // =========================================
    // UI/UX PRO MAX: VEHICLE IMAGE LOADING WITH BLUR-UP
    // Smooth loading experience for car images
    // =========================================
    const vehicleImages = document.querySelectorAll('.vehicle-image');

    vehicleImages.forEach(img => {
        // Add decoding async for performance
        img.setAttribute('decoding', 'async');

        // Check if image is already loaded (from cache)
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
            if (img.parentElement) {
                img.parentElement.classList.add('loaded');
            }
        } else {
            // Handle image load
            img.addEventListener('load', function () {
                // Small delay for visual smoothness
                requestAnimationFrame(() => {
                    this.classList.add('loaded');
                    if (this.parentElement) {
                        this.parentElement.classList.add('loaded');
                    }
                });
            });

            // Handle error gracefully
            img.addEventListener('error', function () {
                this.classList.add('loaded'); // Show fallback
                if (this.parentElement) {
                    this.parentElement.classList.add('loaded');
                }
            });
        }
    });

    // =========================================
    // LAZY LOAD IMAGES WITH ENHANCED FADE IN
    // =========================================
    const images = document.querySelectorAll('img[loading="lazy"]:not(.vehicle-image)');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                img.onload = function () {
                    img.style.opacity = '1';
                };

                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    images.forEach(img => imageObserver.observe(img));

    // =========================================
    // UTILITY: THROTTLE FUNCTION
    // =========================================
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // =========================================
    // CONSOLE BRANDING
    // =========================================
    console.log('%c🚗 MITSUBISHI MOTORS SHOWROOM',
        'font-size: 28px; font-weight: bold; color: #E60012; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c📞 Ngô Anh Khôi - 0938 79 3333',
        'font-size: 18px; color: #fff; background: linear-gradient(135deg, #E60012, #FF2D3B); padding: 8px 16px; border-radius: 20px;');
    console.log('%c📍 831 Trường Chinh, P.Tây Thạnh, Q.Tân Phú, Tp.HCM',
        'font-size: 14px; color: #888;');
    console.log('%c✨ PRO MAX Design by Antigravity',
        'font-size: 12px; color: #666; font-style: italic;');
});

// =========================================
// PRELOADER (Optional - for future use)
// =========================================
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});
