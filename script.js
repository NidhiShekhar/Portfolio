// =====================================
// PORTFOLIO WEBSITE JAVASCRIPT
// =====================================

// Wait for DOM to be fully loaded
// Add this to your JavaScript file or in a <script> tag
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');

    // Theme switch event handler
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Audio functionality for button sounds
let audioContext;
let buttonSound;

// Initialize audio on first user interaction
function initAudio() {
    if (audioContext) return; // Already initialized

    try {
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Load button sound
        loadButtonSound('rsc/button_press.mp3');
    } catch (e) {
        console.error('Web Audio API not supported:', e);
    }
}

// Load the sound file
function loadButtonSound(url) {
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            buttonSound = audioBuffer;
        })
        .catch(error => console.error('Error loading sound:', error));
}

// Play button sound
function playButtonSound() {
    // Check sound enabled state from the existing sound toggle
    const soundEnabled = document.getElementById('sound-button').querySelector('.sound-on-icon').style.display !== 'none';

    if (!audioContext || !buttonSound || !soundEnabled) return;

    const source = audioContext.createBufferSource();
    source.buffer = buttonSound;
    source.connect(audioContext.destination);
    source.start(0);
}

// Add sound to buttons
function addSoundToButtons() {
    // About me link
    const aboutMeLink = document.querySelector('a[href="#about"]');
    if (aboutMeLink) {
        aboutMeLink.addEventListener('click', playButtonSound);
    }

    // ALL "Explore my work" buttons (including the one in hero section)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', playButtonSound);
    });

    // Research paper buttons
    const paperButtons = document.querySelectorAll('.paper-button');
    paperButtons.forEach(button => {
        button.addEventListener('click', playButtonSound);
    });

    // Hobby cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('click', playButtonSound);
    });

    // Logo that opens about panel
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', playButtonSound);
    }

    // Back button in about panel
    const backArrow = document.querySelector('.back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', playButtonSound);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // First user interaction will initialize audio
    document.body.addEventListener('click', initAudio, { once: true });

    // Add sounds to buttons
    addSoundToButtons();
});

document.addEventListener('DOMContentLoaded', function() {
    const parallaxCat = document.querySelector('.parallax-cat');
    const lightAudio = document.getElementById('light-theme-audio');
    const darkAudio = document.getElementById('dark-theme-audio');
    const soundButton = document.getElementById('sound-button');
    const soundOnIcon = document.querySelector('.sound-on-icon');
    const soundOffIcon = document.querySelector('.sound-off-icon');
    const themeSwitch = document.getElementById('theme-switch');

    // Track if audio is currently playing
    let isPlaying = false;
    let currentAudio = null;

    // Sound state management
    let soundEnabled = localStorage.getItem('soundEnabled') !== 'false'; // Default to true

    // Initialize sound button state
    updateSoundButtonUI();

    // Debug the theme status - log to console when clicked
    themeSwitch.addEventListener('change', function() {
        console.log("Theme changed. Dark mode: ", document.documentElement.classList.contains('dark-mode'));

        // If audio is currently playing, switch to the appropriate theme audio
        if (isPlaying && soundEnabled) {
            stopAllAudio();
            playAppropriateAudio();
        }
    });

    function playAppropriateAudio() {
        // Check if dark mode is active by checking the html element class
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        console.log("Playing audio for mode:", isDarkMode ? "dark" : "light");

        if (isDarkMode) {
            darkAudio.play();
            currentAudio = darkAudio;
        } else {
            lightAudio.play();
            currentAudio = lightAudio;
        }
        isPlaying = true;
    }

    // Sound button click handler
    soundButton.addEventListener('click', function() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('soundEnabled', soundEnabled);
        updateSoundButtonUI();

        // If sound is now disabled, stop any playing audio
        if (!soundEnabled) {
            stopAllAudio();
            isPlaying = false;
        }
    });

    function updateSoundButtonUI() {
        if (soundEnabled) {
            soundOnIcon.style.display = 'block';
            soundOffIcon.style.display = 'none';
        } else {
            soundOnIcon.style.display = 'none';
            soundOffIcon.style.display = 'block';
        }
    }

    function stopAllAudio() {
        lightAudio.pause();
        lightAudio.currentTime = 0;
        darkAudio.pause();
        darkAudio.currentTime = 0;
        currentAudio = null;
        isPlaying = false;
    }

    // Only apply effects if cat element exists and screen is large enough
    if (parallaxCat && window.innerWidth >= 769) {
        // Parallax effect
        const movementDivider = 20;

        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const translateY = scrollY / movementDivider;
            parallaxCat.style.transform = `translateY(-${translateY}px)`;
        });

        // Toggle audio on click
        parallaxCat.addEventListener('click', function() {
            if (!soundEnabled) return;

            // If audio is already playing, stop it
            if (isPlaying) {
                stopAllAudio();
                return;
            }

            // Otherwise play appropriate audio
            playAppropriateAudio();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const parallaxCat = document.querySelector('.parallax-cat');

    // Only apply the effect if the cat element exists and the screen is large enough
    if (parallaxCat && window.innerWidth >= 769) {
        // Slow down the movement for a subtle effect
        const movementDivider = 20;

        window.addEventListener('scroll', function() {
            // Calculate position based on scroll
            const scrollY = window.scrollY;
            const translateY = scrollY / movementDivider;

            // Apply transformation with some constraints
            parallaxCat.style.transform = `translateY(-${translateY}px)`;
        });
    }
});
// About panel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that should trigger the about panel
    const aboutTriggers = [
        document.querySelector('.logo'), // Nidhi Shekhar in nav
        ...Array.from(document.querySelectorAll('.nav-links a')).filter(a => a.textContent.includes('About')), // About in nav
        document.querySelector('.cta-button') // About me! button
    ].filter(Boolean); // Filter out any null elements

    const aboutPanel = document.querySelector('.about-panel');
    const backArrow = document.querySelector('.back-arrow');

    // Add click event to each trigger
    aboutTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            if (this.classList.contains('logo') ||
                (this.textContent && this.textContent.includes('About'))) {
                e.preventDefault(); // Prevent default only for nav links
            }
            aboutPanel.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when panel is open
        });
    });

    // Close panel when back arrow is clicked
    backArrow.addEventListener('click', function() {
        aboutPanel.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close panel when clicking outside (optional)
    document.addEventListener('click', function(e) {
        if (aboutPanel.classList.contains('active') &&
            !aboutPanel.contains(e.target) &&
            !aboutTriggers.some(trigger => trigger.contains(e.target))) {
            aboutPanel.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
// =====================================
// MAIN INITIALIZATION FUNCTION
// =====================================
function initializeWebsite() {
    setupSmoothScrolling();
    setupCardInteractions();
    setupFloatingHearts();
    setupNavigationHighlight();
    setupLazyLoading();
    setupAccessibility();
}

// =====================================
// SMOOTH SCROLLING NAVIGATION
// =====================================
function setupSmoothScrolling() {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed navigation
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================
// CARD HOVER INTERACTIONS
// =====================================
function setupCardInteractions() {
    const cards = document.querySelectorAll('.card, .hobby-card');

    cards.forEach(card => {
        // Mouse enter event
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        // Mouse leave event
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add subtle animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(card);
    });
}

// =====================================
// FLOATING HEARTS ANIMATION
// =====================================
function setupFloatingHearts() {
    const hearts = document.querySelectorAll('.heart');

    function randomizeHearts() {
        hearts.forEach(heart => {
            // Random vertical position
            heart.style.top = Math.random() * 100 + '%';

            // Random animation duration
            const duration = 4 + Math.random() * 4;
            heart.style.animationDuration = duration + 's';

            // Random horizontal drift
            const drift = (Math.random() - 0.5) * 10;
            heart.style.transform = `translateX(${drift}px)`;
        });
    }

    // Initial randomization
    randomizeHearts();

    // Reposition hearts every 10 seconds
    setInterval(randomizeHearts, 10000);

    // Add click interaction to hearts
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.style.animation = 'heartPulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = 'float 6s ease-in-out infinite';
            }, 600);
        });
    });
}

// =====================================
// NAVIGATION HIGHLIGHT
// =====================================
function setupNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavigation() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 100;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', highlightNavigation);

    // Initial highlight
    highlightNavigation();
}

// =====================================
// LAZY LOADING OPTIMIZATION
// =====================================
function setupLazyLoading() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// =====================================
// ACCESSIBILITY ENHANCEMENTS
// =====================================
function setupAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--pink-dark);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
        transition: top 0.3s;
    `;

    // Show skip link on focus
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels and roles where needed
    setupAriaLabels();

    // Handle keyboard navigation
    setupKeyboardNavigation();

    // Respect reduced motion preferences
    respectReducedMotion();
}

function setupAriaLabels() {
    // Add ARIA labels to navigation
    const nav = document.querySelector('nav');
    nav.setAttribute('aria-label', 'Main navigation');

    // Add ARIA labels to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
            section.setAttribute('aria-labelledby', heading.textContent.toLowerCase().replace(/\s+/g, '-'));
        }
    });

    // Mark decorative elements as such
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.setAttribute('aria-hidden', 'true');
    });
}

function setupKeyboardNavigation() {
    // Enhanced focus management for cards
    const interactiveElements = document.querySelectorAll('.card, .hobby-card, .contact-link, .cta-button');

    interactiveElements.forEach(element => {
        // Make cards focusable
        if (!element.hasAttribute('tabindex') && !element.href) {
            element.setAttribute('tabindex', '0');
        }

        // Add keyboard interaction
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function respectReducedMotion() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Disable floating hearts animation
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            heart.style.animation = 'none';
        });

        // Reduce other animations
        document.documentElement.style.setProperty('--transition-normal', '0.1s ease');
        document.documentElement.style.setProperty('--transition-fast', '0.05s ease');
    }
}

// =====================================
// UTILITY FUNCTIONS
// =====================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// =====================================
// PERFORMANCE OPTIMIZATIONS
// =====================================
function optimizeScrollEvents() {
    // Use throttled scroll event for better performance
    const throttledScrollHandler = throttle(function() {
        highlightNavigation();
        updateScrollProgress();
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update CSS custom property for potential scroll indicator
    document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
}

// =====================================
// DYNAMIC CONTENT LOADING
// =====================================
function setupDynamicContent() {
    // Placeholder for future blog content loading
    const blogSection = document.querySelector('#blog');

    if (blogSection) {
        // Could fetch blog posts from API in the future
        // fetchBlogPosts().then(posts => renderBlogPosts(posts));
    }
}

// =====================================
// THEME MANAGEMENT
// =====================================
function setupThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply theme
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Theme toggle functionality (if theme toggle button is added in the future)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');

            // Save preference
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
}

// =====================================
// CONTACT FORM HANDLING (if added later)
// =====================================
function setupContactForm() {
    const contactForm = document.querySelector('#contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form validation and submission logic
            const formData = new FormData(this);

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual logic)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent! ✨';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }
}

function activateEasterEgg() {
    // Add rainbow effect to hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.color = `hsl(${index * 60}, 70%, 60%)`;
            heart.style.transform = 'scale(1.5)';
            heart.style.animation = 'rainbow 2s infinite';
        }, index * 100);
    });

    // Reset after 5 seconds
    setTimeout(() => {
        hearts.forEach(heart => {
            heart.style.color = '';
            heart.style.transform = '';
            heart.style.animation = 'float 6s ease-in-out infinite';
        });
    }, 5000);
}

// =====================================
// CSS ANIMATIONS (injected via JS)
// =====================================
function injectAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes heartPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .nav-links a.active {
            background: var(--pink-medium);
            color: white;
        }
    `;

    document.head.appendChild(style);
}

// =====================================
// ERROR HANDLING
// =====================================
function setupErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('Portfolio website error:', e.error);
        // Could send error reports to analytics service
    });

    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// =====================================
// INITIALIZATION WITH ERROR HANDLING
// =====================================
function initializeWebsite() {
    try {
        // Inject CSS animations
        injectAnimations();

        // Core functionality
        setupSmoothScrolling();
        setupCardInteractions();
        setupFloatingHearts();
        setupNavigationHighlight();
        setupLazyLoading();
        setupAccessibility();

        // Performance optimizations
        optimizeScrollEvents();

        // Optional features
        setupDynamicContent();
        setupContactForm();
        setupEasterEggs();

        // Error handling
        setupErrorHandling();

        console.log('🌸 Portfolio website initialized successfully!');

    } catch (error) {
        console.error('Failed to initialize website:', error);
    }
}

// =====================================
// EXPORT FOR POTENTIAL MODULE USE
// =====================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        setupSmoothScrolling,
        setupCardInteractions,
        setupFloatingHearts
    };
}