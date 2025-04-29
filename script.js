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

    // Mobile Hero Scroll Effects
    const heroElement = document.querySelector('.hero');
    // ... (existing mobile scroll effects code)
});

// Function to handle DESKTOP navigation - NOT USED FOR MOBILE PANEL 