/**
 * Enhanced Cyber Loader
 * Advanced technological loading screen with real loading functionality
 */

class EnhancedCyberLoader {
    constructor() {
        this.loadingSteps = [
            { text: "Inicializando Sistema", duration: 500 },
            { text: "Carregando Recursos", duration: 800 },
            { text: "Conectando Servidores", duration: 600 },
            { text: "Verificando Segurança", duration: 700 },
            { text: "Preparando Interface", duration: 500 },
            { text: "Sistema Pronto", duration: 400 }
        ];
        this.currentStep = 0;
        this.progress = 0;
        this.isHidden = false;
        
        this.init();
    }
    
    init() {
        this.createLoader();
        this.createParticles();
        this.startLoading();
    }
    
    createLoader() {
        // Create main loader container
        this.loader = document.createElement('div');
        this.loader.className = 'enhanced-cyber-loader';
        this.loader.id = 'enhanced-cyber-loader';
        
        this.loader.innerHTML = `
            <div class="loader-bg-grid"></div>
            <div class="loader-scan-line"></div>
            <div class="loader-scan-line"></div>
            <div class="loader-scan-line"></div>
            
            <!-- System Diagnostics Panel -->
            <div class="system-diagnostics">
                <div class="diagnostic-item">
                    <span class="diagnostic-label">CPU:</span>
                    <span class="diagnostic-value" id="cpu-value">0%</span>
                </div>
                <div class="diagnostic-item">
                    <span class="diagnostic-label">RAM:</span>
                    <span class="diagnostic-value" id="ram-value">0%</span>
                </div>
                <div class="diagnostic-item">
                    <span class="diagnostic-label">NET:</span>
                    <span class="diagnostic-value" id="net-value">0 KB/s</span>
                </div>
            </div>
            
            <!-- Terminal Console -->
            <div class="cyber-console">
                <div class="console-header">
                    <span class="console-title">[SYSTEM TERMINAL]</span>
                    <div class="console-controls">
                        <span class="console-dot red"></span>
                        <span class="console-dot yellow"></span>
                        <span class="console-dot green"></span>
                    </div>
                </div>
                <div class="console-content" id="console-content">
                    <div class="console-line">$ sudo init_system</div>
                </div>
            </div>
            
            <div class="loader-container">
                <div class="loader-logo">
                    <img src="images/wilian.png" alt="Wilian Software">
                </div>
                
                <h1 class="loader-title" data-text="WILIAN SOFTWARE">WILIAN SOFTWARE</h1>
                <p class="loader-subtitle">Sistema de Downloads Avançado</p>
                
                <!-- System Status Indicators -->
                <div class="system-status">
                    <div class="status-item">
                        <i class="fas fa-server status-icon"></i>
                        <span class="status-text">Servidores Online</span>
                        <div class="status-indicator active"></div>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-shield-alt status-icon"></i>
                        <span class="status-text">Sistema Seguro</span>
                        <div class="status-indicator active"></div>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-database status-icon"></i>
                        <span class="status-text">Base de Dados</span>
                        <div class="status-indicator loading"></div>
                    </div>
                </div>
                
                <!-- Audio Visualizer -->
                <div class="audio-visualizer">
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                    <div class="audio-bar"></div>
                </div>
                
                <div class="loader-progress">
                    <div class="loader-progress-fill" id="progress-fill"></div>
                </div>
                
                <div class="loader-status" id="loader-status">Inicializando Sistema</div>
                <div class="loader-percentage" id="loader-percentage">0%</div>
                
                <!-- Data Streams -->
                <div class="data-streams">
                    <div class="data-stream">
                        <span class="stream-label">Download Speed:</span>
                        <span class="stream-value" id="download-speed">0 MB/s</span>
                    </div>
                    <div class="data-stream">
                        <span class="stream-label">Files Processed:</span>
                        <span class="stream-value" id="files-processed">0/156</span>
                    </div>
                    <div class="data-stream">
                        <span class="stream-label">System Uptime:</span>
                        <span class="stream-value" id="uptime">00:00:01</span>
                    </div>
                </div>
            </div>
            
            <div class="loader-particles" id="loader-particles"></div>
        `;
        
        // Insert at the beginning of body
        document.body.insertBefore(this.loader, document.body.firstChild);
        
        // Get references to dynamic elements
        this.statusElement = document.getElementById('loader-status');
        this.percentageElement = document.getElementById('loader-percentage');
        this.progressFill = document.getElementById('progress-fill');
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('loader-particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'loader-particle';
            
            // Random positioning and timing
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    startLoading() {
        this.simulateRealLoading();
        this.updateLoadingSteps();
        this.animateSystemDiagnostics();
        this.animateConsole();
        this.animateDataStreams();
    }
    
    simulateRealLoading() {
        // Simplified progress system
        const minLoadTime = 3000;
        const startTime = Date.now();
        
        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            const timeProgress = Math.min(elapsedTime / minLoadTime, 1);
            
            this.progress = timeProgress * 100;
            this.percentageElement.textContent = Math.round(this.progress) + '%';
            this.progressFill.style.width = this.progress + '%';
            
            if (this.progress >= 100) {
                this.completeLoading();
            } else {
                requestAnimationFrame(updateProgress);
            }
        };
        
        updateProgress();
    }
    
    updateLoadingSteps() {
        const stepInterval = 600; // Time between step changes
        
        const updateStep = () => {
            if (this.currentStep < this.loadingSteps.length && !this.isHidden) {
                const step = this.loadingSteps[this.currentStep];
                this.statusElement.textContent = step.text;
                this.currentStep++;
                
                setTimeout(updateStep, stepInterval);
            }
        };
        
        updateStep();
    }
    
    animateSystemDiagnostics() {
        const cpuElement = document.getElementById('cpu-value');
        const ramElement = document.getElementById('ram-value');
        const netElement = document.getElementById('net-value');
        
        setInterval(() => {
            if (!this.isHidden) {
                const cpu = Math.floor(Math.random() * 30) + 20;
                const ram = Math.floor(Math.random() * 40) + 30;
                const net = Math.floor(Math.random() * 500) + 100;
                
                cpuElement.textContent = cpu + '%';
                ramElement.textContent = ram + '%';
                netElement.textContent = net + ' KB/s';
            }
        }, 800);
    }
    
    animateConsole() {
        const consoleContent = document.getElementById('console-content');
        const commands = [
            '$ Loading system modules...',
            '$ Initializing drivers...',
            '$ Checking network connectivity...',
            '$ Verifying security protocols...',
            '$ Loading user interface...',
            '$ System ready!'
        ];
        
        let commandIndex = 0;
        const addCommand = () => {
            if (commandIndex < commands.length && !this.isHidden) {
                const line = document.createElement('div');
                line.className = 'console-line';
                line.textContent = commands[commandIndex];
                consoleContent.appendChild(line);
                commandIndex++;
                
                // Keep only last 4 lines
                const lines = consoleContent.querySelectorAll('.console-line');
                if (lines.length > 4) {
                    lines[0].remove();
                }
                
                setTimeout(addCommand, 600);
            }
        };
        
        setTimeout(addCommand, 500);
    }
    
    animateDataStreams() {
        const downloadSpeed = document.getElementById('download-speed');
        const filesProcessed = document.getElementById('files-processed');
        const uptime = document.getElementById('uptime');
        
        let files = 0;
        let seconds = 1;
        
        setInterval(() => {
            if (!this.isHidden) {
                const speed = (Math.random() * 50 + 10).toFixed(1);
                files = Math.min(files + Math.floor(Math.random() * 5) + 1, 156);
                
                downloadSpeed.textContent = speed + ' MB/s';
                filesProcessed.textContent = files + '/156';
                
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                uptime.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                
                seconds++;
            }
        }, 1000);
    }
    
    completeLoading() {
        if (this.isHidden) return;
        
        this.isHidden = true;
        this.statusElement.textContent = 'Sistema Pronto';
        this.percentageElement.textContent = '100%';
        this.progressFill.style.width = '100%';
        
        // Add completion effects
        setTimeout(() => {
            this.loader.classList.add('hidden');
        }, 500);
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (this.loader && this.loader.parentNode) {
                this.loader.parentNode.removeChild(this.loader);
            }
        }, 1300);
        
        // Trigger page content animations
        setTimeout(() => {
            document.body.classList.add('loaded');
            this.triggerPageAnimations();
        }, 800);
    }
    
    triggerPageAnimations() {
        // Initialize AOS and other animations after loading
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Trigger custom page entrance animations
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.animation = 'fadeInUp 1s ease-out forwards';
        }
        
        // Animate header
        const header = document.querySelector('.header');
        if (header) {
            header.style.animation = 'slideInDown 0.8s ease-out forwards';
        }
        
        // Add entrance animation styles if not already present
        if (!document.querySelector('#entrance-animations')) {
            const style = document.createElement('style');
            style.id = 'entrance-animations';
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
                
                @keyframes slideInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                body.loaded {
                    overflow-x: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Auto-initialize when DOM is ready
function initEnhancedCyberLoader() {
    // Ensure the loader appears immediately
    if (document.readyState === 'loading') {
        // DOM still loading
        document.addEventListener('DOMContentLoaded', () => {
            new EnhancedCyberLoader();
        });
    } else {
        // DOM already loaded
        new EnhancedCyberLoader();
    }
}

// Initialize immediately
initEnhancedCyberLoader();

// Backup initialization for various loading states
if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
        // If loader hasn't been created yet, create it
        if (!document.getElementById('enhanced-cyber-loader')) {
            new EnhancedCyberLoader();
        }
    });
}

// Export for manual initialization if needed
window.EnhancedCyberLoader = EnhancedCyberLoader;
