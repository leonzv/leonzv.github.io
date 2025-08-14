import translations from './translations.js';

class PortfolioSystem {
    constructor() {
        this.currentLanguage = 'en';
        this.init();
    }

    async init() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        this.initLanguageSystem();
        this.initTypingEffect();
        this.initScrollAnimations();
        this.renderProjects();
        this.initSmoothScroll();
        this.initMobileMenu();
    }

    initLanguageSystem() {
        // Desktop buttons (hidden on mobile)
        const langEnBtn = document.getElementById('lang-en');
        const langPtBtn = document.getElementById('lang-pt');

        // Mobile buttons (in drawer)
        const langEnMobileBtn = document.getElementById('lang-en-mobile');
        const langPtMobileBtn = document.getElementById('lang-pt-mobile');

        this.updateLanguageButtons();

        // Desktop handlers
        if (langEnBtn) {
            langEnBtn.addEventListener('click', () => {
                this.changeLanguage('en');
            });
        }

        if (langPtBtn) {
            langPtBtn.addEventListener('click', () => {
                this.changeLanguage('pt');
            });
        }

        // Mobile handlers
        langEnMobileBtn.addEventListener('click', () => {
            this.changeLanguage('en');
        });

        langPtMobileBtn.addEventListener('click', () => {
            this.changeLanguage('pt');
        });

        this.updateContent();
    }

    updateLanguageButtons() {
        // Desktop buttons
        const langEnBtn = document.getElementById('lang-en');
        const langPtBtn = document.getElementById('lang-pt');

        // Mobile buttons
        const langEnMobileBtn = document.getElementById('lang-en-mobile');
        const langPtMobileBtn = document.getElementById('lang-pt-mobile');

        // Update desktop buttons if they exist
        if (langEnBtn && langPtBtn) {
            langEnBtn.classList.toggle('active', this.currentLanguage === 'en');
            langPtBtn.classList.toggle('active', this.currentLanguage === 'pt');
        }

        // Update mobile buttons
        langEnMobileBtn.classList.toggle('active', this.currentLanguage === 'en');
        langPtMobileBtn.classList.toggle('active', this.currentLanguage === 'pt');
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.updateLanguageButtons();
        this.updateContent();
        this.renderProjects();

        setTimeout(() => {
            this.initTypingEffect();
        }, 100);
    }

    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileDrawer = document.getElementById('mobile-drawer');
        const drawerOverlay = document.getElementById('drawer-overlay');
        const drawerClose = document.getElementById('drawer-close');
        const drawerLinks = document.querySelectorAll('.drawer-nav a');

        const openDrawer = () => {
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        const closeDrawer = () => {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', openDrawer);
        drawerClose.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);

        drawerLinks.forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                closeDrawer();
            }
        });
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'TITLE') {
                    element.textContent = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let result = translations[this.currentLanguage];

        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return null;
            }
        }

        return result;
    }

    initTypingEffect() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        const element = document.getElementById('typing-header');
        const t = translations[this.currentLanguage].typing;
        const messages = [
            { text: t.systemStarted, delay: 800 },
            { text: t.checkingCredentials, delay: 600 },
            { text: t.accessGranted, delay: 800 },
            { text: '', delay: 300 },
            { text: t.greeting, delay: 0 }
        ];

        let messageIndex = 0;
        let charIndex = 0;
        const self = this;

        function typeText() {
            const currentMessage = messages[messageIndex];
            if (charIndex <= currentMessage.text.length) {
                const currentText = currentMessage.text.substring(0, charIndex);
                element.innerHTML = `<span class="text-glow">${currentText}</span><span class="cursor">|</span>`;
                charIndex++;
                self.typingTimeout = setTimeout(typeText, 60);
            } else if (messageIndex < messages.length - 1) {
                self.typingTimeout = setTimeout(() => {
                    messageIndex++;
                    charIndex = 0;
                    self.typingTimeout = setTimeout(typeText, currentMessage.delay);
                }, 500);
            } else {
                element.innerHTML = `<span class="text-glow">${currentMessage.text}</span><span class="cursor">|</span>`;
                self.typingTimeout = null;
            }
        }
        this.typingTimeout = setTimeout(typeText, 1000);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-section').forEach(section => {
            observer.observe(section);
        });
    }

    renderProjects() {
        const container = document.getElementById('projects-container');
        const t = translations[this.currentLanguage].projects;

        const projects = [
            {
                name: this.currentLanguage === 'en' ? "BoniBot Discord" : "Bonibot",
                icon: "bot",
                description: this.currentLanguage === 'en' ? "Complete Discord bot with music system, custom commands and web dashboard. Self-hosted with 24/7 uptime and Spotify integration." : "Bot completo para Discord com sistema de música e comandos personalizados. Auto-hospedado com uptime 24/7 e integração com Spotify.",
                tags: ["Node.js", "Discord.js", "Express", "PostgreSQL", "ffmpeg"],
                link: "#",
                status: this.currentLanguage === 'en' ? "Active" : "Ativo"
            },
            {
                name: this.currentLanguage === 'en' ? "Landing Page (HMC)" : "Landing Page (HMC)",
                icon: "layout",
                description: this.currentLanguage === 'en' ? "Landing page in tribute to Hamilton Machado Dias' kickboxing career." : "Landing page em homenagem a carreira de Hamilton Machado Dias no kickboxing.",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://hmckickboxingbio.netlify.app",
                status: this.currentLanguage === 'en' ? "Active" : "Ativo"
            },
            {
                name: this.currentLanguage === 'en' ? "Landing Page (FPV)" : "Landing Page (FPV)",
                icon: "layout",
                description: this.currentLanguage === 'en' ? "Landing page for Freitas Provensi Law Firm, with information about services, team and contact." : "Landing page para a equipe de Freitas Provensi Advocacia, com informações sobre serviços, equipe e contato.",
                tags: ["HTML", "CSS", "JavaScript"],
                link: "https://freitasprovensi.netlify.app/",
                status: this.currentLanguage === 'en' ? "Expanding" : "Em expansão"
            },
            {
                name: "ATIC",
                icon: "truck",
                description: this.currentLanguage === 'en' ? "Application that connects services and truck drivers, facilitating communication and cargo management, handling all involved logistics, including routes, deadlines and payments." : "Aplicativo que conecta serviços e caminhoneiros, facilitando a comunicação e o gerenciamento de cargas, cuidando de toda a logística envolvida, incluindo rotas, prazos e pagamentos.",
                tags: ["React", "React Native", "NestJS", "PostgreSQL"],
                link: "#",
                status: this.currentLanguage === 'en' ? "In Development" : "Em desenvolvimento"
            }
        ];

        const statusColors = {
            'Active': 'text-green-400',
            'Ativo': 'text-green-400',
            'Expanding': 'text-blue-400',
            'Em expansão': 'text-blue-400',
            'Finished': 'text-gray-400',
            'Finalizado': 'text-gray-400',
            'In Development': 'text-yellow-400',
            'Em desenvolvimento': 'text-yellow-400'
        };

        const projectsHTML = projects.map(project => {
            const statusColor = statusColors[project.status] || 'text-gray-400';
            const tagsHTML = project.tags.map(tag =>
                `<span class="bg-green-900/20 text-green-300 text-xs font-medium px-2 py-1 rounded border border-green-700/30">${tag}</span>`
            ).join('');

            const viewProjectText = this.currentLanguage === 'en' ? 'View project' : 'Ver projeto';
            const privateText = this.currentLanguage === 'en' ? 'Private' : 'Privado';

            return `
                <div class="interactive-card p-6 rounded-lg h-full flex flex-col">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="font-bold text-lg text-glow flex items-center gap-2">
                            <i data-lucide="${project.icon}" class="w-5 h-5"></i>
                            ${project.name}
                        </h3>
                        <span class="text-xs ${statusColor} font-medium px-2 py-1 rounded-full bg-current/10">${project.status}</span>
                    </div>
                    <p class="text-gray-300 mb-4 flex-grow text-sm leading-relaxed">${project.description}</p>
                    <div class="space-y-4">
                        <div class="flex flex-wrap gap-2">
                            ${tagsHTML}
                        </div>
                        <div class="pt-2 border-t border-green-500/20">
                            ${project.link !== '#' ?
                    `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 hover:border-green-500/60 text-green-400 hover:text-green-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                                    <i data-lucide="external-link" class="w-3 h-3"></i>
                                    ${viewProjectText}
                                </a>` :
                    `<button disabled class="inline-flex items-center gap-2 bg-gray-600/20 border border-gray-500/40 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                                    <i data-lucide="lock" class="w-3 h-3"></i>
                                    ${privateText}
                                </button>`
                }
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = projectsHTML;

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSystem();
});
