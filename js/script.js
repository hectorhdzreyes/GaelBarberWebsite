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
    
    // Run on load if mobile
    if (isMobile) {
        document.addEventListener('DOMContentLoaded', setupMobileScrollEffects);
        
        // Also try immediately in case DOM is already loaded
        setupMobileScrollEffects();
    }
    
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

    // Handle mobile navigation (similar to desktop hero-left-panel but for mobile panel)
    const mobilePanelLinks = document.querySelectorAll('.hero-mobile-panel .mobile-link');
    
    mobilePanelLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only run on mobile
            if (window.innerWidth > 768) return;
            
            // Only process link elements with href attribute (not the about me div)
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;
            
            // Prevent default link behavior
            e.preventDefault();
            e.stopPropagation();
            
            // Get target section by ID
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Restore original hero view if we've transitioned to about
                const pageContainer = document.querySelector('.page-container.mobile-container');
                if (pageContainer && pageContainer.classList.contains('show-about')) {
                    pageContainer.classList.remove('show-about');
                    // Allow a moment for transition back
                    setTimeout(() => scrollToSectionMobile(targetId), 50);
                } else {
                    // No transition needed, scroll directly
                    scrollToSectionMobile(targetId);
                }
            }
        });
    });
    
    // Special handler for mobile about link (which isn't an anchor tag)
    const mobileAboutLink = document.getElementById('mobile-about-link');
    if (mobileAboutLink) {
        mobileAboutLink.addEventListener('click', function(e) {
            // Only run on mobile
            if (window.innerWidth > 768) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            // For about link, use the page transition handler if available
            const pageContainer = document.querySelector('.page-container.mobile-container');
            if (pageContainer) {
                // Ensure we're showing the about page
                pageContainer.classList.add('show-about');
                // Update URL to match
                window.history.pushState({page: 'about'}, 'About Me', '#about');
            } else {
                // Fallback to regular scrolling
                scrollToSectionMobile('about');
            }
        });
    }
    
    // Helper function for mobile scrolling with appropriate offset
    function scrollToSectionMobile(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        // Calculate position with appropriate offset for mobile header
        // Special case for Services, Pricing and Gallery sections that have special positioning
        let headerOffset = 100; // Default header offset
        let additionalOffset = 0;
        
        // Define specific offsets for problematic sections 
        if (sectionId === 'services') {
            // Services has margin-top: 100vh which affects its position
            additionalOffset = -50; // Negative offset to counteract margin
        } else if (sectionId === 'pricing' || sectionId === 'gallery') {
            // These sections might need different offsets
            additionalOffset = 20;
        }
        
        // Get absolute position including any scroll position
        const sectionRect = section.getBoundingClientRect();
        const absolutePosition = sectionRect.top + window.pageYOffset;
        
        // Log for debugging
        console.log(`Scrolling to ${sectionId} with offsets: header=${headerOffset}, additional=${additionalOffset}`);
        
        // Scroll with smooth behavior
        window.scrollTo({
            top: absolutePosition - headerOffset + additionalOffset,
            behavior: 'smooth'
        });
        
        // Add temporary highlight to make section more visible
        section.classList.add('highlight-section');
        setTimeout(() => {
            section.classList.remove('highlight-section');
        }, 1000);
    }
});

// Update scrollToSection function to handle mobile navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const isMobile = window.innerWidth <= 768;
        const offset = isMobile ? 100 : 0; // Adjust for mobile header
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
} 