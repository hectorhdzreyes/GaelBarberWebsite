// Main JavaScript for the website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('open');
            mainNav.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.main-nav')) {
                mobileMenuBtn.classList.remove('open');
                mainNav.classList.remove('show');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Modal functionality
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (bookNowBtns.length > 0 && bookingModal) {
        bookNowBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                bookingModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
    }
    
    if (closeModal && bookingModal) {
        closeModal.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }
    
    // Hero hover effect is now handled in hero-hover.js
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip handling if this is about or home link (handled by page-transition.js)
            if (this.id === 'home-link' || this.id === 'about-link') {
                return;
            }
            
            // Only process links to sections on this page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenuBtn && mainNav) {
                    mobileMenuBtn.classList.remove('open');
                    mainNav.classList.remove('show');
                }
                
                // Get target section
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section with offset for fixed header
                    let headerOffset = 160; // Further Increased offset value
                    let elementPosition = targetSection.getBoundingClientRect().top;
                    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ADDED: Special smooth scrolling handler for hero-left-panel links
    const heroLeftPanelLinks = document.querySelectorAll('.hero-left-panel a');
    
    heroLeftPanelLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process links to sections on this page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Get target section directly by ID
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section with offset for fixed header
                    let headerOffset = 160; // Offset value for header
                    
                    // Directly get the element's position
                    const sectionRect = targetSection.getBoundingClientRect();
                    const absolutePosition = sectionRect.top + window.pageYOffset;
                    
                    // Scroll to the exact section position minus header offset
                    window.scrollTo({
                        top: absolutePosition - headerOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    const bookingForm = document.getElementById('bookingForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your message has been sent! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Your appointment has been booked! We will confirm shortly.');
            bookingForm.reset();
            if (bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }

    // --- START: Mobile Hero Scroll Effects ---
    const heroElement = document.querySelector('.hero');
    const isMobile = window.innerWidth <= 768; // Check initial width
    
    // Fix mobile navigation links functionality
    function setupMobileNavigation() {
        if (!isMobile) return;
        
        console.log('Setting up mobile navigation links');
        
        // Get all mobile navigation links
        const mobileLinks = document.querySelectorAll('.hero-mobile-panel a.mobile-link');
        
        // Add click handlers to each link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent bubbling to hero section
                
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Get target section
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        console.log('Mobile link clicked: ' + href);
                        
                        // Scroll to target section
                        let headerOffset = 100; // Adjust as needed
                        let elementPosition = targetSection.getBoundingClientRect().top;
                        let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Handle the about me link
        const aboutLink = document.querySelector('#mobile-about-link');
        if (aboutLink) {
            aboutLink.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent bubbling to hero section
                
                console.log('Mobile about link clicked');
                
                // Find page container
                const pageContainer = document.querySelector('.page-container.mobile-container');
                if (pageContainer) {
                    // Transition to about page
                    pageContainer.classList.add('show-about');
                    window.history.pushState({page: 'about'}, 'About Me', '#about');
                }
            });
        }
    }
    
    // Mobile-specific scroll effects setup
    function setupMobileScrollEffects() {
        if (!heroElement) return;
        
        console.log("Setting up mobile scroll effects");
        
        // Get the specific elements we want to animate
        const title = heroElement.querySelector('h1');
        const tagline = heroElement.querySelector('.tagline');
        const bookButton = heroElement.querySelector('.cal-trigger-btn');
        
        // Make sure we allow transitions for these elements
        if (title) title.style.transition = "transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease";
        if (tagline) tagline.style.transition = "transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease, opacity 0.3s ease";
        if (bookButton) bookButton.style.transition = "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease";
        
        // Clear any existing scroll handler first
        window.removeEventListener('scroll', handleMobileScroll);
        
        // Add the scroll handler back
        window.addEventListener('scroll', handleMobileScroll);
        
        // Trigger once on load to ensure initial state is correct
        setTimeout(function() {
            // Add and then remove to create a flash effect
            handleMobileScroll();
        }, 500);
    }
    
    // The actual scroll handler function
    let scrollTimeout;
    function handleMobileScroll() {
        if (!heroElement) return;
        
        // Only apply on mobile
        if (window.innerWidth > 768) return;
        
        console.log("Mobile scroll detected");
        
        // Add the class when scrolling starts
        heroElement.classList.add('scroll-active');
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Remove the class after scrolling stops
        scrollTimeout = setTimeout(function() {
            heroElement.classList.remove('scroll-active');
        }, 300);
    }
    
    // Run setup functions on load
    document.addEventListener('DOMContentLoaded', function() {
        setupMobileScrollEffects();
        setupMobileNavigation();
    });
    
    // Also try immediately in case DOM is already loaded
    setupMobileScrollEffects();
    setupMobileNavigation();
    
    // Update on resize
    window.addEventListener('resize', function() {
        const isMobileNow = window.innerWidth <= 768;
        
        if (isMobileNow) {
            setupMobileScrollEffects();
        } else {
            // Remove scroll handler when not mobile
            window.removeEventListener('scroll', handleMobileScroll);
            
            // Remove any applied effects
            if (heroElement) {
                heroElement.classList.remove('scroll-active');
            }
        }
    });
    // --- END: Mobile Hero Scroll Effects ---
}); 