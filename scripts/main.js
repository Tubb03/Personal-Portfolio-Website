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

/* -------------------------------------
   FEATURE 6: Light/Dark Theme Toggle & Local Storage
   ------------------------------------- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function enableDarkMode() {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌙'; // Moon icon
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '☀️'; // Sun icon
    localStorage.setItem('theme', 'light');
}

// 1. Initial Load: Check for saved preference
const storedTheme = localStorage.getItem('theme');

// Apply stored theme or default to system preference
if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    enableDarkMode();
} else {
    disableDarkMode();
}

// 2. Click Handler: Toggle the theme
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

/* -------------------------------------
   FEATURE 7: Scroll-Triggered Animations (Intersection Observer) 
   ------------------------------------- */

const animatedElements = document.querySelectorAll('.animate-on-scroll');

// Observer options: Trigger when 15% of the element is visible
const animationObserverOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.15 
};

const animationObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the element is visible, add the animation class
            entry.target.classList.add('fade-in');
            // Stop observing it once it has animated
            observer.unobserve(entry.target);
        }
    });
};

const animationObserver = new IntersectionObserver(animationObserverCallback, animationObserverOptions);

// Start observing all elements with the 'animate-on-scroll' class
animatedElements.forEach(element => {
    animationObserver.observe(element);
});