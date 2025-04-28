// Mobile navigation handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    // Handle mobile navigation links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href')?.substring(1);
            if (targetId) {
                scrollToSection(targetId);
            }
        });
    });

    // Handle mobile about link
    const mobileAboutLink = document.getElementById('mobile-about-link');
    if (mobileAboutLink) {
        mobileAboutLink.addEventListener('click', function() {
            scrollToSection('about');
        });
    }
});

// Update scrollToSection function to handle mobile navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const isMobile = window.innerWidth <= 768;
        const offset = isMobile ? 80 : 0; // Adjust offset for mobile header
        const targetPosition = section.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
} 