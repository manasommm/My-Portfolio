// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initSkillBars();
    initProjectCards();
    initResumeDownload();
    initEasterEggs();
    initModals();
    checkImageSources();
    scrollToSection();

   function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Section with ID '${sectionId}' not found.`);
  }
}

    
    // Konami Code Easter Egg
    initKonamiCode();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Add active class to current section
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Theme toggle functionality - FIXED
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        
        // Add ripple effect
        createRipple(themeToggle);
    });
    
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in-up class to elements
    const animatedElements = document.querySelectorAll('.section-header, .project-card, .skill-card, .timeline-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 200);
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => skillObserver.observe(bar));
}

document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
});


// Make sure this is called:
document.addEventListener('DOMContentLoaded', function() {
    // ... other inits ...
    initSkillBars();
});


// Project cards functionality
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
        
        // Add tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Resume download functionality
function initResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    
    downloadBtn.addEventListener('click', () => {
        // Add explosion effect
        downloadBtn.classList.add('explode');
        
        setTimeout(() => {
            downloadBtn.classList.remove('explode');
        }, 600);
        
        // Create download link (you'll need to add your resume file)
        const resumeUrl = ''; // Replace with your resume file path
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Manas_Resume.pdf';
        
        // Check if file exists before triggering download
        fetch(resumeUrl)
            .then(response => {
                if (response.ok) {
                    link.click();
                } else {
                    alert('Resume file not found. Please add your resume.pdf file to the project directory.');
                }
            })
            .catch(() => {
                alert('Resume file not found. Please add your resume.pdf file to the project directory.');
            });
    });
}

// Easter eggs
function initEasterEggs() {
    let clickCount = 0;
    const footer = document.querySelector('.footer');
    const easterEgg = document.getElementById('footer-easter-egg');
    
    footer.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount >= 5) {
            createConfetti();
            clickCount = 0;
        }
    });
}

// Konami Code Easter Egg
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            showSecretMessage();
            userInput = [];
        }
    });
}

// Modal functionality
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

// Check image sources and show placeholders
function checkImageSources() {
    const images = [
        { selector: '#avatar-img', placeholder: '.avatar-placeholder' },
        { selector: '.project-img', placeholder: '.project-placeholder' }
    ];
    
    images.forEach(({ selector, placeholder }) => {
        const imgs = document.querySelectorAll(selector);
        imgs.forEach(img => {
            const placeholderEl = img.parentElement.querySelector(placeholder);
            
            img.addEventListener('load', () => {
                img.style.display = 'block';
                if (placeholderEl) {
                    placeholderEl.style.display = 'none';
                }
            });
            
            img.addEventListener('error', () => {
                img.style.display = 'none';
                if (placeholderEl) {
                    placeholderEl.style.display = 'flex';
                }
            });
            
            // Trigger load event if image is already loaded
            if (img.complete) {
                img.dispatchEvent(new Event('load'));
            }
        });
    });
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function createRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#4facfe', '#fa709a', '#fee140'];
    const confettiContainer = document.getElementById('footer-easter-egg');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        confettiContainer.appendChild(confetti);
        confetti.classList.add('active');
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const projects = {
        '1': {
            title: 'Project Name 1',
            image: 'project1.jpg',
            description: 'This is a detailed description of Project 1. It showcases my skills in React, Node.js, and MongoDB. The project includes features like user authentication, real-time updates, and responsive design.',
            tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
            liveLink: 'https://your-project1-link.com',
            codeLink: 'https://github.com/yourusername/project1'
        },
        '2': {
            title: 'Project Name 2',
            image: 'project2.jpg',
            description: 'A comprehensive description of Project 2. Built with Vue.js and Python, this project demonstrates my full-stack capabilities and includes advanced features like data visualization and API integration.',
            tech: ['Vue.js', 'Python', 'PostgreSQL', 'Chart.js'],
            liveLink: 'https://your-project2-link.com',
            codeLink: 'https://github.com/yourusername/project2'
        },
        '3': {
            title: 'Project Name 3',
            image: 'project3.jpg',
            description: 'An innovative solution built with Next.js and TypeScript. This project showcases modern web development practices, including server-side rendering, type safety, and database optimization.',
            tech: ['Next.js', 'TypeScript', 'Prisma', 'Vercel'],
            liveLink: 'https://your-project3-link.com',
            codeLink: 'https://github.com/yourusername/project3'
        }
    };
    
    const project = projects[projectId];
    if (project) {
        document.getElementById('modal-project-title').textContent = project.title;
        document.getElementById('modal-project-image').src = project.image;
        document.getElementById('modal-project-description').textContent = project.description;
        document.getElementById('modal-live-link').href = project.liveLink;
        document.getElementById('modal-code-link').href = project.codeLink;
        
        const techContainer = document.getElementById('modal-project-tech');
        techContainer.innerHTML = '';
        project.tech.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
        });
        
        showModal(modal);
    }
}

function showModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function showSecretMessage() {
    const secretModal = document.createElement('div');
    secretModal.className = 'modal show';
    secretModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🎉 Secret Unlocked!</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto';">&times;</button>
            </div>
            <div class="modal-body">
                <p>Congratulations! You found the Konami Code easter egg!</p>
                <p>🎮 You're a true gamer at heart! 🚀</p>
                <div style="text-align: center; margin-top: 1rem;">
                    <button class="modal-btn" onclick="this.closest('.modal').remove(); document.body.style.overflow = 'auto';" style="background: var(--primary-gradient); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer;">Awesome!</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(secretModal);
    document.body.style.overflow = 'hidden';
    
    // Add extra confetti for the secret
    setTimeout(createConfetti, 300);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for all internal links
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

console.log('🚀 Portfolio website loaded successfully!');
console.log('💡 Try the Konami Code: ↑↑↓↓←→←→BA');
console.log('🎉 Click the footer 5 times for a surprise!');
