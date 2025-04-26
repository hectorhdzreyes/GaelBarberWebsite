// Page Transition Script
document.addEventListener('DOMContentLoaded', function() {
    // Add a small timeout to ensure smooth transitions
    setTimeout(function() {
        setupPageTransition();
    }, 100);
    
    function setupPageTransition() {
        // Now include mobile devices, but with different behavior
        const isMobile = window.innerWidth <= 768;
        
        // Get elements
        const hero = document.querySelector('.hero');
        const about = document.querySelector('#about');
        const services = document.querySelector('#services');
        const navAboutLink = document.querySelector('#about-link');
        const navHomeLink = document.querySelector('#home-link');
        
        // Ensure all sections are properly visible
        const allSections = document.querySelectorAll('#services, #pricing, #gallery, #contact');
        allSections.forEach(section => {
            if (section) {
                section.style.display = 'block';
                section.style.visibility = 'visible';
                section.style.zIndex = '10';
                // Prevent white flashing
                section.style.backgroundColor = '#000';
                section.style.opacity = '1';
                section.style.transition = 'opacity 0.4s ease-in-out';
            }
        });
        
        // Only implement page transition if both hero and about sections exist
        if (hero && about) {
            // Create container for transition
            const pageContainer = document.createElement('div');
            pageContainer.className = 'page-container';
            
            if (isMobile) {
                // For mobile, add special mobile class
                pageContainer.classList.add('mobile-container');
            }
            
            // Store the original sections
            const originalHero = hero.cloneNode(true);
            const originalAbout = about.cloneNode(true);
            
            // Insert container in place of hero
            document.body.insertBefore(pageContainer, hero);
            
            // Create page wrappers for each section
            const heroPage = document.createElement('div');
            heroPage.className = 'page home-page';
            heroPage.appendChild(originalHero);
            
            const aboutPage = document.createElement('div');
            aboutPage.className = 'page about-page';
            aboutPage.appendChild(originalAbout);
            
            // Add pages to container
            pageContainer.appendChild(heroPage);
            pageContainer.appendChild(aboutPage);
            
            // Remove original sections
            hero.remove();
            about.remove();
            
            // Get the new sections from inside the container
            const heroSection = pageContainer.querySelector('.hero');
            const aboutSection = pageContainer.querySelector('#about');
            
            // Track if we're currently in transition mode or normal scroll mode
            let isTransitionModeActive = true;
            
            // Helper to check if an element is a clickable element that should not trigger transition
            function isClickableElement(element) {
                let current = element;
                while (current) {
                    if (
                        current.tagName === 'BUTTON' || 
                        current.tagName === 'A' || 
                        current.classList.contains('book-now-btn') ||
                        current.classList.contains('mobile-menu-btn') ||
                        current.id === 'bookingModal' ||
                        current.classList.contains('modal-content') ||
                        // Cal.com elements
                        current.classList.contains('cal-trigger-item')
                    ) {
                        return true;
                    }
                    current = current.parentElement;
                }
                return false;
            }
            
            // Helper to check if we're at the top section of the page
            function isAtTopSection() {
                const scrollPosition = window.scrollY;
                return scrollPosition < 100; // Consider at top if we're within 100px from top
            }
            
            // Toggle between transition mode and normal scroll mode
            function toggleTransitionMode(enable) {
                isTransitionModeActive = enable;
                
                if (enable) {
                    // Add transition-active class to container for CSS transitions
                    pageContainer.classList.add('transition-active');
                    
                    // Make sure services and other sections are visible
                    const allSections = document.querySelectorAll('#services, #pricing, #gallery, #contact');
                    allSections.forEach(section => {
                        if (section) {
                            section.style.display = 'block';
                            section.style.visibility = 'visible';
                            section.style.zIndex = '10';
                            
                            // Set background color to prevent white flash
                            if (section.id === 'services' || section.id === 'gallery') {
                                section.style.backgroundColor = '#000';
                            }
                        }
                    });
                } else {
                    // Remove transition-active class
                    pageContainer.classList.remove('transition-active');
                }
                
                // Ensure the services section is visible
                if (services) {
                    services.style.display = 'block';
                    services.style.visibility = 'visible';
                }
            }
            
            // Function to handle hero section click
            function handleHeroClick(e) {
                // Don't trigger transition if clicking on a button or link
                if (isClickableElement(e.target)) {
                    return;
                }
                
                console.log('Hero clicked, transitioning to about');
                
                // Add class to show about section
                pageContainer.classList.add('show-about');
                
                // Update URL without page reload
                window.history.pushState({page: 'about'}, 'About Me', '#about');
            }
            
            // Function to handle about section click
            function handleAboutClick(e) {
                // Don't trigger transition if clicking on a button or link
                if (isClickableElement(e.target)) {
                    return;
                }
                
                console.log('About clicked, transitioning to hero');
                
                // Remove class to show hero section
                pageContainer.classList.remove('show-about');
                
                // Update URL without page reload
                window.history.pushState({page: 'home'}, 'Home', '#');
            }
            
            // Add event listeners to hero and about sections
            if (heroSection) {
                heroSection.addEventListener('click', handleHeroClick);
                
                // Add event listeners for all book now buttons in the hero section
                const bookNowBtns = heroSection.querySelectorAll('.book-now-btn, .cal-trigger-btn');
                bookNowBtns.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent click from reaching the hero section
                    }, { capture: true }); // Use capture phase to ensure this runs first
                });
                
                // Special handling for left panel links in the cloned hero
                const heroLeftPanelLinks = heroSection.querySelectorAll('.hero-left-panel a');
                
                heroLeftPanelLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent click from triggering hero click
                        
                        // Only process links to sections on this page
                        const targetId = this.getAttribute('href');
                        if (targetId && targetId.startsWith('#')) {
                            e.preventDefault();
                            
                            // Get target section directly by ID
                            const targetSection = document.querySelector(targetId);
                            
                            if (targetSection) {
                                // Disable transition mode on mobile to allow normal scrolling
                                if (isMobile) {
                                    // For mobile, just let the links work normally
                                    // First go back to hero view
                                    pageContainer.classList.remove('show-about');
                                    
                                    // Then scroll after a short delay
                                    setTimeout(() => {
                                        let headerOffset = 160; // Offset value for header
                                        const sectionRect = targetSection.getBoundingClientRect();
                                        const absolutePosition = sectionRect.top + window.pageYOffset;
                                        
                                        window.scrollTo({
                                            top: absolutePosition - headerOffset,
                                            behavior: 'smooth'
                                        });
                                    }, 100);
                                } else {
                                    // Original desktop behavior
                                    toggleTransitionMode(false);
                                    
                                    let headerOffset = 160;
                                    const sectionRect = targetSection.getBoundingClientRect();
                                    const absolutePosition = sectionRect.top + window.pageYOffset;
                                    
                                    window.scrollTo({
                                        top: absolutePosition - headerOffset,
                                        behavior: 'smooth'
                                    });
                                }
                            }
                        }
                    });
                });
            }
            
            if (aboutSection) {
                aboutSection.addEventListener('click', handleAboutClick);
            }
            
            // Handle navigation menu clicks
            if (navAboutLink) {
                navAboutLink.addEventListener('click', function(e) {
                    if (isTransitionModeActive) {
                        e.preventDefault();
                        pageContainer.classList.add('show-about');
                        window.history.pushState({page: 'about'}, 'About Me', '#about');
                    }
                });
            }
            
            if (navHomeLink) {
                navHomeLink.addEventListener('click', function(e) {
                    if (isTransitionModeActive) {
                        e.preventDefault();
                        pageContainer.classList.remove('show-about');
                        window.history.pushState({page: 'home'}, 'Home', '#');
                    }
                });
            }
            
            // Handle browser back/forward buttons
            window.addEventListener('popstate', function(e) {
                if (isTransitionModeActive) {
                    if (e.state && e.state.page === 'about') {
                        pageContainer.classList.add('show-about');
                    } else {
                        pageContainer.classList.remove('show-about');
                    }
                }
            });
            
            // For desktop only - Handle scroll events to toggle between transition and scroll modes
            if (!isMobile) {
                let lastScrollPos = window.scrollY;
                let ticking = false;
                
                window.addEventListener('scroll', function() {
                    lastScrollPos = window.scrollY;
                    
                    if (!ticking) {
                        window.requestAnimationFrame(function() {
                            const currentScrollPos = lastScrollPos;
                            
                            // If scrolled down past a threshold, disable transition mode
                            if (currentScrollPos > window.innerHeight * 0.6) { // Lower threshold for earlier transition
                                if (isTransitionModeActive) {
                                    toggleTransitionMode(false);
                                }
                            } else if (currentScrollPos < 50) {
                                // If scrolling back to top, enable transition mode
                                if (!isTransitionModeActive) {
                                    toggleTransitionMode(true);
                                }
                            }
                            
                            ticking = false;
                        });
                        
                        ticking = true;
                    }
                });
            }
            
            // Check if URL has #about on page load and set initial state
            if (window.location.hash === '#about') {
                pageContainer.classList.add('show-about');
            }
            
            // Initialize in transition mode
            toggleTransitionMode(true);
        }
    }
}); 