document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');
    const navLinks = primaryNav.querySelectorAll('a');

    
    /* -------------------------------------
       FEATURE 1: Mobile Navigation Toggle 
       ------------------------------------- */
    navToggle.addEventListener('click', () => {
        // Toggle the 'visible' class to show/hide the menu
        const isVisible = primaryNav.classList.toggle('visible');
        
        // Update the ARIA attribute for accessibility
        navToggle.setAttribute('aria-expanded', isVisible);
    });

    /* ----------------------------------------------------
       FEATURE 2: Close Nav on Link Click (Mobile UX) 
       ---------------------------------------------------- */
    // Since navigation links lead to sections on the same page, 
    // close the menu after a link is clicked for better mobile UX.
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the navigation menu is visible (i.e., on a small screen)
            if (primaryNav.classList.contains('visible')) {
                primaryNav.classList.remove('visible');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* ----------------------------------------------------
       FEATURE 3: Active Nav Link Highlighting (Intersection Observer) 
       ---------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        root: null, // Viewport is the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.primary-navigation a[href="#${id}"]`);

            if (correspondingLink) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add 'active' class to the link of the section currently in view
                if (entry.isIntersecting) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Add this block after your existing 'DOMContentLoaded' listener, or inside it.

/* -------------------------------------
   FEATURE 5: Back to Top Button 
   ------------------------------------- */
const backToTopButton = document.getElementById('back-to-top');
const scrollThreshold = 400; // Distance (in pixels) to scroll down before button appears

// 1. Show/Hide Button based on scroll position
window.addEventListener('scroll', () => {
    // Check if the vertical scroll position is greater than the threshold
    if (window.scrollY > scrollThreshold) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// 2. Scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0, 
        behavior: 'smooth' // Provides the smooth animation
    });
});
