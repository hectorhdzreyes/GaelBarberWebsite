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
        
        // Mobile specific elements
        const mobileAboutLink = document.querySelector('#mobile-about-link');
        
        // For mobile: Track scroll position to enable/disable transitions
        if (isMobile) {
            // Initially, at the top of the page, set the at-hero class
            document.body.classList.add('at-hero');
            
            // Add scroll listener to check if we're at hero section
            window.addEventListener('scroll', function() {
                // If at top of page (hero section)
                if (window.scrollY < 25) {
                    document.body.classList.add('at-hero');
                } else {
                    // Moved away from hero section
                    document.body.classList.remove('at-hero');
                    // Don't automatically transition back when scrolling, only when specifically clicking
                    // Allow scrolling on about page without transitioning back
                }
            });
            
            // Function to handle mobile navigation clicks
            function scrollToSection(sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const offset = 80; // Offset for mobile header
                    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Highlight section briefly
                    setTimeout(() => {
                        section.classList.add('highlight-section');
                        setTimeout(() => {
                            section.classList.remove('highlight-section');
                        }, 1000);
                    }, 500);
                }
            }

            // Setup click handlers for mobile navigation links
            document.querySelectorAll('.mobile-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation(); // Stop propagation to hero/about click handlers
                    e.preventDefault(); // Always prevent default for consistent behavior
                    
                    const href = this.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        // This handles scrolling for section links (services, pricing, etc.)
                        const targetId = href.substring(1);
                        console.log(`Mobile link clicked, scrolling to: ${targetId}`);
                        scrollToSection(targetId);
                    } 
                    // Keep the 'about me' click separate and always functional
                    // else if (this.id === 'mobile-about-link') { ... }
                });
            });
            
            // Separate handler for the mobile "about me" link to ALWAYS trigger transition
            const mobileAboutDiv = document.getElementById('mobile-about-link');
            if (mobileAboutDiv) {
                mobileAboutDiv.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    
                    const pageContainer = document.querySelector('.page-container.mobile-container');
                    if (pageContainer) {
                        console.log('Mobile about link clicked, scrolling top and forcing transition to about');
                        
                        // Scroll to top instantly before doing anything else
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        
                        // Ensure body class doesn't prevent transition
                        document.body.classList.add('at-hero'); 
                        
                        // Add slight delay to allow scroll and class change to register before transition
                        setTimeout(() => {
                            pageContainer.classList.add('show-about');
                            window.history.pushState({page: 'about'}, 'About Me', '#about');
                        }, 50); // Keep a small delay
                    }
                });
            }
        }
        
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
                
                // For mobile, only allow transitions at the hero section
                if (isMobile && !isAtTopSection()) {
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
                
                // For mobile, only allow transitions at the hero section
                if (isMobile && !isAtTopSection()) {
                    return;
                }
                
                console.log('About clicked, transitioning to home');
                
                // Remove class to show hero section
                pageContainer.classList.remove('show-about');
                
                // Update URL without page reload
                window.history.pushState({page: 'home'}, 'Home', '#home');
            }

            // Attach click handlers
            if (heroSection) {
                heroSection.addEventListener('click', handleHeroClick);
            }
            if (aboutSection) {
                aboutSection.addEventListener('click', handleAboutClick);
            }

            // Add event listeners for nav links if needed
            // ... (keep existing nav link handlers)
            
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
                             
                             // If scrolled down past a threshold, disable transition mode & hide page container
                             if (currentScrollPos > window.innerHeight * 0.6) { 
                                 if (isTransitionModeActive) {
                                     toggleTransitionMode(false);
                                 }
                                 // Add class to potentially hide/shrink page-container via CSS
                                 pageContainer.classList.add('scrolled-past'); 
                                 // Set z-index to ensure it's behind other content
                                 pageContainer.style.zIndex = "-1"; 
                             } else if (currentScrollPos < 50) {
                                 // If scrolling back to top, enable transition mode & show page container
                                 if (!isTransitionModeActive) {
                                     toggleTransitionMode(true);
                                 }
                                 // Remove class to restore page-container
                                 pageContainer.classList.remove('scrolled-past'); 
                                 // Restore z-index
                                 pageContainer.style.zIndex = "5";
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