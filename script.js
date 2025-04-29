// Main JavaScript for the website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        // ... (existing mobile menu code)
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        // ... (existing header scroll code)
    }
    
    // Modal functionality
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    // ... (existing modal code)
    
    // Hero hover effect is now handled in hero-hover.js
    
    // Smooth scrolling for DESKTOP navigation links (main-nav)
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        // ... (existing desktop smooth scroll code)
    });
    
    // ADDED: Special smooth scrolling handler for DESKTOP hero-left-panel links
    const heroLeftPanelLinks = document.querySelectorAll('.hero-left-panel a');
    heroLeftPanelLinks.forEach(link => {
        // ... (existing desktop hero left panel scroll code)
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    // ... (existing form code)

    // Mobile Hero Scroll Effects & Static Background Logic
    const heroElement = document.querySelector('.hero');
    const isMobile = window.innerWidth <= 768;
    
    function applyMobileHeroStyles() {
        if (!heroElement) return;
        console.log("Applying mobile hero styles...");
        
        // Force static background
        heroElement.style.transition = "none";
        heroElement.style.animation = "none";
        heroElement.style.transform = "none";
        heroElement.style.backgroundAttachment = "scroll";
        
        // Remove any scroll-related classes initially
        heroElement.classList.remove('scroll-active', 'scrolling-active');
        
        // Force MOST children to have no transitions/animations
        const allHeroChildren = heroElement.querySelectorAll('*:not(.hero-slideshow-mobile):not(.hero-slideshow-mobile *)'); // Exclude mobile slideshow
        allHeroChildren.forEach(child => {
            // Skip the specific elements we DO want to animate/transition
            if (child.tagName === 'H1' || 
                child.classList.contains('tagline') || 
                child.classList.contains('cal-trigger-btn') ||
                child.classList.contains('hero-mobile-panel') || // Exclude mobile panel too
                child.closest('.hero-mobile-panel') // Exclude elements inside panel
               ) {
                // Re-enable transitions for these specific elements if needed
                if (child.tagName === 'H1') child.style.transition = "transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease";
                if (child.classList.contains('tagline')) child.style.transition = "transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease, opacity 0.3s ease";
                if (child.classList.contains('cal-trigger-btn')) child.style.transition = "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease";
                // Mobile panel links already have transitions via CSS
                return; 
            }
            
            // Apply static styles to other children
            child.style.transition = "none";
            child.style.animation = "none";
            child.style.transform = "none";
        });
    }
    
    // Apply styles on load if mobile
    if (isMobile) {
        applyMobileHeroStyles();
    }
    
    // Mobile-specific scroll handler for H1/Tagline/Button effects
    let scrollTimeout;
    function handleMobileScrollEffects() {
        if (!heroElement || window.innerWidth > 768) return;
        heroElement.classList.add('scroll-active');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            heroElement.classList.remove('scroll-active');
        }, 300);
    }

    if (isMobile) {
        window.addEventListener('scroll', handleMobileScrollEffects);
    }
    
    // Re-apply styles and add/remove scroll listener on resize
    window.addEventListener('resize', () => {
        const isMobileNow = window.innerWidth <= 768;
        if (isMobileNow) {
            applyMobileHeroStyles();
            // Ensure listener is attached
            window.removeEventListener('scroll', handleMobileScrollEffects); // Remove first to avoid duplicates
            window.addEventListener('scroll', handleMobileScrollEffects);
        } else {
            // Remove listener if resizing to desktop
            window.removeEventListener('scroll', handleMobileScrollEffects);
            if(heroElement) heroElement.classList.remove('scroll-active');
            // Optionally reset inline styles if needed for desktop
        }
    });
    // --- END Mobile Hero Logic ---
});

// Function to handle DESKTOP navigation - NOT USED FOR MOBILE PANEL 