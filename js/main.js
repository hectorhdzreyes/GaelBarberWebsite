// Main JavaScript for Gael's Barber Shop

document.addEventListener('DOMContentLoaded', function() {
    /* REMOVED Mobile menu toggle logic as .mobile-menu-btn is not used */
    /*
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
    */
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) { // Keep this check
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    /* REMOVED Booking modal logic as #bookingModal/.close-modal are not used */
    /*
    const bookingModal = document.getElementById('booking'); // Or 'bookingModal'? Check HTML
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when clicking Book Now buttons
    if (bookNowBtns.length > 0 && bookingModal) { 
        bookNowBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                bookingModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; 
            });
        });
    }
    
    // Close modal when clicking X
    if (closeModal && bookingModal) { 
        closeModal.addEventListener('click', function() {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        });
    }
    
    // Close modal when clicking outside the modal content
    if (bookingModal) { 
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto'; 
            }
        });
    }
    */
    
    // Form submission (placeholder for actual submission)
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
            // If modal logic were present, would close it here:
            // if (bookingModal) bookingModal.style.display = 'none';
            // document.body.style.overflow = 'auto'; 
        });
    }
}); 