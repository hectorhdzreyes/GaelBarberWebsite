/**
 * Hero Section Hover Effect
 * 
 * This script handles the hover effect for the hero section:
 * - Initial background with opacity 0.3
 * - On hover, background darkens to opacity 0.5
 * - Completely disabled on mobile devices
 */

// Hero hover effect - simplified and reliable implementation
(function() {
    // Check if we're on mobile immediately
    if (window.innerWidth <= 768) {
        console.log('Hero hover effect disabled on mobile');
        return; // Exit immediately on mobile
    }
    
    // Run this immediately without waiting for DOMContentLoaded
    console.log('Initializing hero hover effect...');
    
    // Initialize on load and again after a slight delay to catch post-transition elements
    setupHeroHoverEffect();
    setTimeout(setupHeroHoverEffect, 500);
    
    // Also ensure it runs on both DOMContentLoaded and window.onload
    document.addEventListener('DOMContentLoaded', setupHeroHoverEffect);
    window.addEventListener('load', setupHeroHoverEffect);
    
    function setupHeroHoverEffect() {
        // Exit immediately if on mobile
        if (window.innerWidth <= 768) {
            console.log('Hero hover effect disabled on mobile');
            return;
        }
        
        console.log('Setting up hero hover effect');
        
        // Target both the regular hero section and the one in the page container
        const heroSections = document.querySelectorAll('.hero');
        const inactivityDelay = 600; // 0.6 seconds
        const bookingModal = document.getElementById('bookingModal');
        
        console.log('Found hero sections:', heroSections.length);
        
        heroSections.forEach(function(heroSection) {
            if (!heroSection) return;
            
            let mouseTimer;
            
            // Function for when mouse moves in the hero section
            const handleMouseMove = function(e) {
                if (window.innerWidth <= 768) return; // Extra check - don't run hover effect on mobile
                
                if (bookingModal && bookingModal.style.display === 'block') {
                    return;
                }
                
                if (e.target.tagName === 'BUTTON' || 
                    e.target.tagName === 'A' ||
                    e.target.classList.contains('book-now-btn')) {
                    return;
                }
                
                heroSection.classList.add('darkened');
                
                clearTimeout(mouseTimer);
                
                mouseTimer = setTimeout(function() {
                    heroSection.classList.remove('darkened');
                }, inactivityDelay);
            };
            
            // Also handle mouse enter to ensure effect triggers right away
            const handleMouseEnter = function() {
                if (window.innerWidth <= 768) return; // Extra check - don't run hover effect on mobile
                
                if (bookingModal && bookingModal.style.display === 'block') {
                    return;
                }
                
                heroSection.classList.add('darkened');
                heroSection.classList.add('hover-active');
                
                clearTimeout(mouseTimer);
                
                mouseTimer = setTimeout(function() {
                    heroSection.classList.remove('darkened');
                    heroSection.classList.remove('hover-active');
                }, inactivityDelay);
            };
            
            // Handle mouse leave
            const handleMouseLeave = function() {
                if (window.innerWidth <= 768) return; // Extra check - don't run hover effect on mobile
                
                clearTimeout(mouseTimer);
                heroSection.classList.remove('darkened');
                heroSection.classList.remove('hover-active');
            };
            
            // Remove any existing listeners to avoid duplicates
            heroSection.removeEventListener('mousemove', handleMouseMove);
            heroSection.removeEventListener('mouseenter', handleMouseEnter);
            heroSection.removeEventListener('mouseleave', handleMouseLeave);
            
            // Add event listeners ONLY if not mobile
            if (window.innerWidth > 768) {
                heroSection.addEventListener('mousemove', handleMouseMove);
                heroSection.addEventListener('mouseenter', handleMouseEnter);
                heroSection.addEventListener('mouseleave', handleMouseLeave);
                console.log('Hero hover effect applied to:', heroSection);
            }
        });
    }
    
    // Watch for DOM changes (like after transitions or AJAX updates)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            // Exit immediately if on mobile
            if (window.innerWidth <= 768) return;
            
            let shouldReapply = false;
            
            for (let i = 0; i < mutations.length; i++) {
                const mutation = mutations[i];
                // Check if nodes were added
                if (mutation.addedNodes.length > 0) {
                    for (let j = 0; j < mutation.addedNodes.length; j++) {
                        const node = mutation.addedNodes[j];
                        if (node.nodeType === 1) { // Element node
                            if (node.classList && (
                                node.classList.contains('hero') ||
                                node.classList.contains('page-container') ||
                                node.querySelector('.hero')
                            )) {
                                shouldReapply = true;
                                break;
                            }
                        }
                    }
                }
                
                // Also check for class changes on the body
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'class' &&
                    mutation.target.tagName === 'BODY') {
                    shouldReapply = true;
                }
                
                if (shouldReapply) break;
            }
            
            if (shouldReapply) {
                console.log('DOM changed, reapplying hero hover effect');
                setTimeout(setupHeroHoverEffect, 50);
            }
        });
        
        // Start observing the document body ONLY if not mobile
        if (window.innerWidth > 768) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
            console.log('MutationObserver set up for hero hover effect');
        }
    }
    
    // Add resize listener to stop all effects if window resizes to mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // On mobile, find all hero sections and remove any applied classes
            const heroSections = document.querySelectorAll('.hero');
            heroSections.forEach(function(heroSection) {
                if (heroSection) {
                    heroSection.classList.remove('darkened');
                    heroSection.classList.remove('hover-active');
                    
                    // Also force inline styles to prevent any animations
                    heroSection.style.transition = "none";
                    heroSection.style.animation = "none";
                    heroSection.style.transform = "none";
                }
            });
        }
    });
})(); 