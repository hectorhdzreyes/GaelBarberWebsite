// This file is no longer needed as Cal.com is now embedded inline in index.html

/*
// Cal.com integration with existing booking buttons
document.addEventListener('DOMContentLoaded', function() {
  // Function to move and style the Cal.com button
  function positionCalButton() {
    // Get the hero content container and the Cal.com button container
    const heroContent = document.querySelector('.hero-content');
    const calButtonContainer = document.querySelector('.cal-button-container');

    if (heroContent && calButtonContainer) {
      // Move the Cal.com button container inside the hero content
      heroContent.appendChild(calButtonContainer);

      // Reset and apply centering styles to the container with !important
      calButtonContainer.style.setProperty('position', 'static', 'important');
      calButtonContainer.style.setProperty('bottom', 'auto', 'important');
      calButtonContainer.style.setProperty('right', 'auto', 'important');
      calButtonContainer.style.setProperty('top', 'auto', 'important');
      calButtonContainer.style.setProperty('left', 'auto', 'important');
      calButtonContainer.style.setProperty('transform', 'none', 'important');
      calButtonContainer.style.setProperty('display', 'block', 'important');
      calButtonContainer.style.setProperty('width', 'fit-content', 'important');
      calButtonContainer.style.setProperty('margin', '20px auto 0 auto', 'important');
      calButtonContainer.style.setProperty('z-index', '10', 'important');

      // Style the button itself
      const calButton = calButtonContainer.querySelector('button');
      if (calButton) {
        calButton.style.setProperty('background-color', '#000', 'important');
        calButton.style.setProperty('color', '#fff', 'important');
        calButton.style.setProperty('font-family', "'Montserrat', sans-serif", 'important');
        calButton.style.setProperty('font-weight', '600', 'important');
        calButton.style.setProperty('padding', '12px 28px', 'important');
        calButton.style.setProperty('border-radius', '0', 'important');
        calButton.style.setProperty('margin', '0', 'important');
        calButton.style.setProperty('font-size', '16px', 'important');
        calButton.style.setProperty('border', 'none', 'important');
        calButton.style.setProperty('cursor', 'pointer', 'important');
      }
    } else {
      // If elements not found, try again shortly
      setTimeout(positionCalButton, 200);
    }
  }

  // Hide all original booking buttons on the page
  const bookNowButtons = document.querySelectorAll('.book-now-btn, .menu-book-now');
  bookNowButtons.forEach(button => {
    button.style.display = 'none';
  });

  // Initial attempt to position the button
  positionCalButton();

  // Fallback: Use MutationObserver to watch for Cal.com button changes
  const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            const calButtonContainer = document.querySelector('.cal-button-container');
            // If the button container is added or its style changes, re-apply our styles
            if (calButtonContainer && calButtonContainer.style.position !== 'static') { 
                console.log('Cal.com button styles changed, re-applying...');
                positionCalButton();
            }
        }
    }
  });

  // Start observing the body for additions/changes that might include the Cal.com button
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

});
*/ 