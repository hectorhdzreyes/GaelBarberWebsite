// Main JavaScript for Gael's Barber Shop

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
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
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Booking modal
    const bookingModal = document.getElementById('booking');
    const bookNowBtns = document.querySelectorAll('.book-now-btn');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when clicking Book Now buttons
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            bookingModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the modal content
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
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
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
}); 