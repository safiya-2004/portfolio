// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Sticky Navigation
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.placeholder-image svg');
        const title = item.querySelector('.gallery-overlay h4').textContent;
        const description = item.querySelector('.gallery-overlay p').textContent;
        
        // Clone SVG to lightbox
        const svgClone = img.cloneNode(true);
        lightboxImage.innerHTML = '';
        lightboxImage.appendChild(svgClone);
        
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formStatus.textContent = '✓ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            formStatus.className = 'form-status success';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.textContent = '✗ Oops! There was a problem sending your message. Please try again or email me directly at safiya.sulthana30@gmail.com';
        formStatus.className = 'form-status error';
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});

// Download Resume Button
const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple text resume
    const resumeContent = `
SAFIYA SULTHANA
Cloud Computing Enthusiast & Frontend Developer
Email: safiya.sulthana30@gmail.com | Phone: +91 8341256018
LinkedIn: linkedin.com/in/safiya-sulthana-780894259
GitHub: github.com/safiya-2004

EDUCATION
G. Pullaiah College of Engineering and Technology (Nov 2022 - June 2026)
B-Tech in Computer Science Engineering (CGPA: 9.1)

TECHNICAL SKILLS
- Programming: Java, C, Python
- Web Development: HTML, CSS, JavaScript
- Cloud: AWS (EC2, S3, Lambda, VPC, IAM, SES)
- Databases: SQL, MySQL

EXPERIENCE
Cloud Computing Intern - APSSDC (May 2025 - June 2025)
- Built serverless email marketing app using AWS Lambda, S3, SES, and EventBridge
- Gained hands-on experience in cloud deployment and IAM

CERTIFICATIONS
- Google Cloud Computing Certificate (July 2025)
- DSA Certified - Smart Interviews (July 2025)
- Java Language Certified - PrepInsta Prime (June 2024)
- Linguaskill General Certificate [B1] - University of Cambridge (Aug 2023)

AREAS OF INTEREST
- Cloud Computing and Serverless Architecture
- Artificial Intelligence and Machine Learning
- Public Speaking and Tech Presentations
    `.trim();
    
    // Create and download the file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Safiya_Sulthana_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Parallax Effect for Hero Shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effects to skill tags
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(3deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add micro-interactions to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Typing Effect for Hero Tagline (Optional Enhancement)
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < originalText.length) {
            heroTagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeText, 1500);
}

// Add stagger animation to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Add progressive image loading effect to gallery
const galleryImages = document.querySelectorAll('.gallery-item');
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

galleryImages.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
});

// Console Easter Egg
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #d4426e;');
console.log('%cLooks like you\'re checking out the code! Feel free to reach out if you want to collaborate.', 'font-size: 14px; color: #4a4a4a;');
console.log('%c💼 Email: safiya.sulthana30@gmail.com', 'font-size: 12px; color: #7a7a7a;');

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll handlers
const debouncedHighlightNav = debounce(highlightNavigation, 100);
window.addEventListener('scroll', debouncedHighlightNav);
