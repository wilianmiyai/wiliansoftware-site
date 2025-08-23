// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Advanced Particle System
function createAdvancedParticles() {
    const container = document.querySelector('.hero-particles-advanced');
    if (!container) return;

    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.color = ['#00d4ff', '#ff6b35', '#7c3aed'][Math.floor(Math.random() * 3)];
            this.opacity = Math.random() * 0.8 + 0.2;
            this.element = this.createElement();
        }

        createElement() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${this.size}px;
                height: ${this.size}px;
                background: ${this.color};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${this.opacity};
                box-shadow: 0 0 ${this.size * 2}px ${this.color};
                animation: particlePulse ${2 + Math.random() * 3}s ease-in-out infinite alternate;
            `;
            return particle;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
            if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;

            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }
    }

    const particles = [];
    for (let i = 0; i < 50; i++) {
        const particle = new Particle();
        particles.push(particle);
        container.appendChild(particle.element);
    }

    function animateParticles() {
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Add particle pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particlePulse {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(1.5); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

// Cyber Loading Animation
function createCyberLoader() {
    const loader = document.createElement('div');
    loader.className = 'cyber-loader';
    loader.innerHTML = `
        <div class="cyber-loader-inner">
            <div class="cyber-loader-line"></div>
            <div class="cyber-loader-line"></div>
            <div class="cyber-loader-line"></div>
            <div class="cyber-loader-text">INICIALIZANDO SISTEMA...</div>
        </div>
    `;

    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .cyber-loader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--dark-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: loaderFadeOut 3s ease-in-out forwards;
        }

        .cyber-loader-inner {
            text-align: center;
        }

        .cyber-loader-line {
            width: 200px;
            height: 2px;
            background: var(--gradient-primary);
            margin: 10px auto;
            animation: loaderLine 1.5s ease-in-out infinite;
        }

        .cyber-loader-line:nth-child(2) {
            animation-delay: 0.3s;
        }

        .cyber-loader-line:nth-child(3) {
            animation-delay: 0.6s;
        }

        .cyber-loader-text {
            color: var(--primary-color);
            font-family: var(--font-primary);
            font-size: 1.2rem;
            margin-top: 20px;
            animation: textGlow 2s ease-in-out infinite alternate;
        }

        @keyframes loaderLine {
            0%, 100% { transform: scaleX(0.1); opacity: 0.3; }
            50% { transform: scaleX(1); opacity: 1; }
        }

        @keyframes textGlow {
            0% { text-shadow: 0 0 10px var(--primary-color); }
            100% { text-shadow: 0 0 20px var(--primary-color); }
        }

        @keyframes loaderFadeOut {
            0% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; pointer-events: none; }
        }
    `;
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.remove();
    }, 3000);
}

// Initialize all effects
window.addEventListener('load', () => {
    addWordGlowStyle();
    initMatrixRain();
    createAdvancedParticles();
    setTimeout(() => {
        // Removed typewriter animations to fix mobile issues
        initScrollAnimations();
    }, 1000);
});

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('download-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.download-card, .feature-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header Background on Scroll with Cyber Effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid var(--primary-color)';
        header.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid var(--border-color)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Enhanced Download Button Effects
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function(e) {
        const cardTitle = this.closest('.download-card')?.querySelector('h3')?.textContent || 'Unknown';
        console.log(`Download clicked: ${cardTitle}`);
        
        // Cyber click effect
        this.style.transform = 'scale(0.95)';
        this.style.boxShadow = '0 0 30px var(--secondary-color)';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 150);

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 107, 53, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${e.offsetX - 25}px;
            top: ${e.offsetY - 25}px;
            width: 50px;
            height: 50px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Typing Animation for Hero Title
function typeWriter() {
    const titleLines = document.querySelectorAll('.glitch');
    
    titleLines.forEach((line, index) => {
        const text = line.dataset.text;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    // Add glitch effect after typing
                    line.classList.add('glitch-active');
                }
            }, 80);
        }, index * 1200);
    });

    // Fix typewriter subtitle completely
    const subtitle = document.querySelector('.typewriter');
    if (subtitle) {
        const fullText = subtitle.textContent;
        
        // Create a hidden element to measure the full text width
        const measurer = document.createElement('span');
        measurer.style.cssText = `
            position: absolute;
            visibility: hidden;
            white-space: nowrap;
            font-size: 1.5rem;
            font-family: inherit;
            font-weight: 300;
        `;
        measurer.textContent = fullText;
        document.body.appendChild(measurer);
        
        const textWidth = measurer.offsetWidth;
        document.body.removeChild(measurer);
        
        // Reset and configure the typewriter
        subtitle.style.width = '0';
        subtitle.style.maxWidth = textWidth + 'px';
        subtitle.style.minWidth = textWidth + 'px';
        
        // Restart animation after hero loads
        setTimeout(() => {
            subtitle.style.animation = 'none';
            setTimeout(() => {
                subtitle.style.animation = `typing 8s steps(${fullText.length}, end) forwards, blink-caret 0.75s step-end infinite`;
            }, 100);
        }, 3000);
    }
}

// Enhanced typewriter effect with better mobile support
function simpleTypewriter() {
    const subtitle = document.querySelector('.typewriter');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    const isMobile = window.innerWidth <= 768;
    
    // Clear the text initially
    subtitle.textContent = '';
    
    if (isMobile) {
        // Mobile: Robust word-by-word reveal with forced wrapping
        subtitle.style.borderRight = 'none';
        subtitle.style.whiteSpace = 'normal';
        subtitle.style.display = 'block';
        subtitle.style.width = '100%';
        subtitle.style.overflow = 'visible';
        
        const words = text.split(' ');
        let wordIndex = 0;
        
        function revealWord() {
            if (wordIndex < words.length) {
                if (wordIndex > 0) {
                    subtitle.appendChild(document.createTextNode(' '));
                }
                const wordSpan = document.createElement('span');
                wordSpan.textContent = words[wordIndex];
                wordSpan.style.cssText = `
                    opacity: 0;
                    display: inline;
                    animation: wordGlow 0.5s ease-out forwards;
                `;
                subtitle.appendChild(wordSpan);
                wordIndex++;
                setTimeout(revealWord, 120); // faster for mobile
            }
        }
        setTimeout(revealWord, 1200);
    } else {
        // Desktop: Classic typewriter with improvements
        subtitle.style.whiteSpace = 'nowrap';
        subtitle.style.borderRight = '2px solid var(--primary-color)';
        subtitle.style.display = 'inline-block';
        
        let charIndex = 0;
        const typeSpeed = 45;
        
        function typeChar() {
            if (charIndex < text.length) {
                subtitle.textContent += text.charAt(charIndex);
                charIndex++;
                
                // Add small pause at punctuation
                const currentChar = text.charAt(charIndex - 1);
                const delay = (currentChar === ',' || currentChar === '.') ? typeSpeed * 3 : typeSpeed;
                
                setTimeout(typeChar, delay);
            } else {
                // Blinking cursor effect before removing
                let blinkCount = 0;
                const blinkInterval = setInterval(() => {
                    subtitle.style.borderRightColor = 
                        subtitle.style.borderRightColor === 'transparent' ? 
                        'var(--primary-color)' : 'transparent';
                    
                    blinkCount++;
                    if (blinkCount > 6) {
                        clearInterval(blinkInterval);
                        subtitle.style.borderRight = 'none';
                        
                        // Add final glow effect
                        subtitle.style.animation = 'textGlow 2s ease-in-out infinite alternate';
                    }
                }, 300);
            }
        }
        
        setTimeout(typeChar, 3000);
    }
}

// Add word glow animation style
function addWordGlowStyle() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wordGlow {
            0% {
                opacity: 0;
                transform: translateY(10px) scale(0.8);
                filter: blur(3px);
            }
            50% {
                opacity: 0.7;
                transform: translateY(5px) scale(0.9);
                filter: blur(1px);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }
        
        @keyframes desktopTypewriterGlow {
            0% {
                text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
            }
            100% {
                text-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced window resize handler - removed typewriter restart
window.addEventListener('resize', () => {
    // Resize handler removed to prevent typewriter issues
});

// Add enhanced loading effect
function createEnhancedLoader() {
    const loader = document.createElement('div');
    loader.className = 'enhanced-cyber-loader';
    loader.innerHTML = `
        <div class="loader-container">
            <div class="loader-grid">
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
            </div>
            <div class="loader-text">WILIAN SOFTWARE</div>
            <div class="loader-subtitle">Inicializando Sistema...</div>
            <div class="loader-progress">
                <div class="loader-progress-bar"></div>
            </div>
        </div>
    `;

    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .enhanced-cyber-loader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: loaderFadeOut 3.5s ease-in-out forwards;
        }

        .loader-container {
            text-align: center;
        }

        .loader-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 30px;
            justify-items: center;
        }

        .loader-dot {
            width: 12px;
            height: 12px;
            background: var(--primary-color);
            border-radius: 50%;
            animation: dotPulse 1.5s ease-in-out infinite;
        }

        .loader-dot:nth-child(1) { animation-delay: 0s; }
        .loader-dot:nth-child(2) { animation-delay: 0.1s; }
        .loader-dot:nth-child(3) { animation-delay: 0.2s; }
        .loader-dot:nth-child(4) { animation-delay: 0.3s; }
        .loader-dot:nth-child(5) { animation-delay: 0.4s; }
        .loader-dot:nth-child(6) { animation-delay: 0.5s; }
        .loader-dot:nth-child(7) { animation-delay: 0.6s; }
        .loader-dot:nth-child(8) { animation-delay: 0.7s; }
        .loader-dot:nth-child(9) { animation-delay: 0.8s; }

        .loader-text {
            font-family: var(--font-primary);
            font-size: 2rem;
            color: var(--primary-color);
            margin-bottom: 10px;
            animation: textPulse 2s ease-in-out infinite alternate;
        }

        .loader-subtitle {
            color: var(--text-secondary);
            font-size: 1rem;
            margin-bottom: 20px;
            animation: textFade 3s ease-in-out infinite;
        }

        .loader-progress {
            width: 200px;
            height: 3px;
            background: var(--border-color);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }

        .loader-progress-bar {
            height: 100%;
            background: var(--gradient-primary);
            border-radius: 2px;
            animation: progressFill 3s ease-in-out forwards;
        }

        @keyframes dotPulse {
            0%, 100% { transform: scale(0.8); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes textPulse {
            0% { text-shadow: 0 0 10px var(--primary-color); }
            100% { text-shadow: 0 0 30px var(--primary-color); }
        }

        @keyframes textFade {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }

        @keyframes progressFill {
            0% { width: 0%; }
            100% { width: 100%; }
        }

        @keyframes loaderFadeOut {
            0% { opacity: 1; }
            85% { opacity: 1; }
            100% { opacity: 0; pointer-events: none; }
        }
    `;
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.remove();
    }, 3500);
}

// Cyber Mouse Trail Effect
function createMouseTrail() {
    const trail = [];
    const trailLength = 20;

    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }

        // Remove old trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => {
            if (Date.now() - el.dataset.time > 1000) {
                el.remove();
            }
        });

        // Create trail particle
        const particle = document.createElement('div');
        particle.className = 'mouse-trail';
        particle.dataset.time = Date.now();
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 2}px;
            top: ${e.clientY - 2}px;
            animation: trailFade 1s ease-out forwards;
            box-shadow: 0 0 10px var(--primary-color);
        `;
        document.body.appendChild(particle);
    });

    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.1); }
        }
    `;
    document.head.appendChild(trailStyle);
}

// Initialize mouse trail
createMouseTrail();

// Performance Monitoring
function initPerformanceMonitoring() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
    });
}

initPerformanceMonitoring();

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Keyboard Navigation with Cyber Effects
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Arrow keys for card navigation with glow effect
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const cards = document.querySelectorAll('.download-card');
        const focusedElement = document.activeElement;
        const currentIndex = Array.from(cards).indexOf(focusedElement);
        
        if (currentIndex !== -1) {
            e.preventDefault();
            cards[currentIndex].style.boxShadow = '';
            
            const nextIndex = e.key === 'ArrowDown' 
                ? Math.min(currentIndex + 1, cards.length - 1)
                : Math.max(currentIndex - 1, 0);
                
            cards[nextIndex].focus();
            cards[nextIndex].style.boxShadow = '0 0 30px var(--primary-color)';
        }
    }
});

// Make cards focusable for keyboard navigation
document.querySelectorAll('.download-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const downloadBtn = card.querySelector('.btn-download');
            if (downloadBtn) {
                downloadBtn.click();
            }
        }
    });
});


// Show More/Less Functionality
function initShowMoreButtons() {
    // Todas as seções com botões "Ver mais"
    const buttons = [
        { id: 'show-more-os', grid: '#sistema-operacional .downloads-grid' },
        { id: 'show-more-office', grid: '#office .downloads-grid' },
        { id: 'show-more-drivers', grid: '#drivers .downloads-grid' },
        { id: 'show-more-programas', grid: '#programas .downloads-grid' },
        { id: 'show-more-apks', grid: '#android-grid' },
        { id: 'show-more-playstore', grid: '#playstore-grid' }
    ];
    
    buttons.forEach(buttonConfig => {
        const button = document.getElementById(buttonConfig.id);
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Find all hidden cards in this section
                const hiddenCards = document.querySelectorAll(`${buttonConfig.grid} .hidden-content`);
                const isExpanded = this.classList.contains('expanded');
                
                if (isExpanded) {
                    // Hide content
                    hiddenCards.forEach(card => {
                        card.classList.remove('show');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 500);
                    });
                    this.classList.remove('expanded');
                    
                    // Update button text based on section
                    const buttonTexts = {
                        'show-more-os': 'Ver Mais Sistemas',
                        'show-more-office': 'Ver Mais Office',
                        'show-more-drivers': 'Ver Mais Drivers',
                        'show-more-programas': 'Ver Mais Programas',
                        'show-more-apks': 'Ver Mais APKs',
                        'show-more-playstore': 'Ver Mais Aplicativos'
                    };
                    
                    this.querySelector('.btn-text').innerHTML = `<i class="fas fa-chevron-down"></i> ${buttonTexts[buttonConfig.id]}`;
                    
                    // Smooth scroll to button after collapse
                    setTimeout(() => {
                        this.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 300);
                    
                } else {
                    // Show content
                    hiddenCards.forEach((card, index) => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('show');
                        }, index * 100);
                    });
                    this.classList.add('expanded');
                    
                    // Update button text based on section
                    const buttonTextsExpanded = {
                        'show-more-os': 'Ver Menos Sistemas',
                        'show-more-office': 'Ver Menos Office',
                        'show-more-drivers': 'Ver Menos Drivers',
                        'show-more-programas': 'Ver Menos Programas',
                        'show-more-apks': 'Ver Menos APKs',
                        'show-more-playstore': 'Ver Menos Aplicativos'
                    };
                    
                    this.querySelector('.btn-text').innerHTML = `<i class="fas fa-chevron-up"></i> ${buttonTextsExpanded[buttonConfig.id]}`;
                }
            });
        }
    });
}

// Initialize show more buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', initShowMoreButtons);

// Re-initialize if content is dynamically added
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.querySelector('.btn-show-more')) {
                    initShowMoreButtons();
                }
            });
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Play Store App Card Interactions
function initPlayStoreCards() {
    const playStoreCards = document.querySelectorAll('.playstore-card');
    
    playStoreCards.forEach(card => {
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Keyboard interaction
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const downloadLink = this.querySelector('a[href*="play.google.com"]');
                if (downloadLink) {
                    window.open(downloadLink.href, '_blank');
                }
            }
        });
        
        // Click to download
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the actual link
            if (!e.target.closest('a')) {
                const downloadLink = this.querySelector('a[href*="play.google.com"]');
                if (downloadLink) {
                    window.open(downloadLink.href, '_blank');
                }
            }
        });
    });
}

// Initialize Play Store cards
document.addEventListener('DOMContentLoaded', initPlayStoreCards);
