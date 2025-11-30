const content = {
    security: {
        badge: 'Cybersecurity Specialist',
        title: 'Securing Digital',
        titleGradient: 'Infrastructure',
        description: 'Cybersecurity Analyst & Backend Developer specializing in threat detection, secure application development, and network security architecture.',
        aboutP1: 'I am a <strong>Cybersecurity Analyst</strong> and <strong>Backend Developer</strong> with expertise in Python, Django Rest Framework, and security protocols. At 21 years old, I bring a unique combination of technical skills, analytical thinking, and a passion for securing digital environments.',
        aboutP2: 'My journey in technology began with backend development, which gave me a strong foundation in building secure applications. This naturally evolved into a dedicated focus on cybersecurity, where I now specialize in threat detection, vulnerability assessment, and security architecture.',
        servicesSubtitle: 'Specialized cybersecurity services combining threat analysis, secure development, and network protection',
        logoIcon: 'fa-shield-halved'
    },
    developer: {
        badge: 'Full-Stack Developer',
        title: 'Building Modern',
        titleGradient: 'Web Solutions',
        description: 'Full-Stack Developer & Security-Minded Engineer specializing in scalable applications, API development, and secure software architecture.',
        aboutP1: 'I am a <strong>Full-Stack Developer</strong> and <strong>Security-Minded Engineer</strong> with expertise in React, Django, and modern web technologies. At 21 years old, I combine development excellence with security awareness to build robust, user-friendly applications.',
        aboutP2: 'My journey started with a passion for creating web applications that solve real problems. Along the way, I developed a deep understanding of security principles, allowing me to build applications that are not only functional and beautiful, but also secure and resilient.',
        servicesSubtitle: 'Professional web development services from concept to deployment with security built-in',
        logoIcon: 'fa-code'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const terminalText = document.getElementById('terminalText');
    const text = "Initializing secure connection...";
    let index = 0;

    function typeText() {
        if (index < text.length) {
            terminalText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }

    typeText();

    const savedMode = localStorage.getItem('portfolioMode') || 'security';
    if (savedMode === 'developer') {
        switchMode('developer', false);
    }
});

const enterBtn = document.getElementById('enterBtn');
const welcomeModal = document.getElementById('welcomeModal');

enterBtn.addEventListener('click', function() {
    welcomeModal.classList.add('hidden');
});

const toggleBtns = document.querySelectorAll('.toggle-btn');
const toggleContainer = document.querySelector('.toggle-container');

toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const mode = this.getAttribute('data-mode');
        switchMode(mode);
    });
});

function switchMode(mode, animate = true) {
    const body = document.body;
    const logoIcon = document.getElementById('logoIcon');
    
    toggleBtns.forEach(btn => {
        if (btn.getAttribute('data-mode') === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (mode === 'developer') {
        toggleContainer.classList.add('developer');
    } else {
        toggleContainer.classList.remove('developer');
    }

    if (mode === 'developer') {
        body.classList.remove('security-mode');
        body.classList.add('developer-mode');
    } else {
        body.classList.remove('developer-mode');
        body.classList.add('security-mode');
    }

    updateContent(mode);
    reorderProjects(mode);
    toggleServices(mode);
    logoIcon.className = `fas ${content[mode].logoIcon}`;
    localStorage.setItem('portfolioMode', mode);
}

function updateContent(mode) {
    const modeContent = content[mode];
    
    document.getElementById('heroBadge').textContent = modeContent.badge;
    document.getElementById('heroTitle').innerHTML = `${modeContent.title}<br><span class="gradient-text" id="heroGradient">${modeContent.titleGradient}</span>`;
    document.getElementById('heroDescription').textContent = modeContent.description;
    document.getElementById('aboutP1').innerHTML = modeContent.aboutP1;
    document.getElementById('aboutP2').innerHTML = modeContent.aboutP2;
    document.getElementById('servicesSubtitle').textContent = modeContent.servicesSubtitle;
}

function reorderProjects(mode) {
    const projectsGrid = document.getElementById('projectsGrid');
    const projects = Array.from(projectsGrid.children);
    
    projects.sort((a, b) => {
        const orderA = parseInt(a.getAttribute(`data-order-${mode}`));
        const orderB = parseInt(b.getAttribute(`data-order-${mode}`));
        return orderA - orderB;
    });
    
    projectsGrid.innerHTML = '';
    projects.forEach(project => projectsGrid.appendChild(project));
}

function toggleServices(mode) {
    const securityServices = document.querySelectorAll('.security-service');
    const developerServices = document.querySelectorAll('.developer-service');
    
    if (mode === 'security') {
        securityServices.forEach(card => card.style.display = 'block');
        developerServices.forEach(card => card.style.display = 'none');
    } else {
        securityServices.forEach(card => card.style.display = 'none');
        developerServices.forEach(card => card.style.display = 'block');
    }
}

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
            skillObserver.unobserve(entry.target);
}
});
}, observerOptions);
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
skillObserver.observe(skillsSection);
}
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
e.preventDefault();
alert('Thank you for your message! I will get back to you soon.');
contactForm.reset();
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
const href = this.getAttribute('href');
    if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});
});
const fadeObserver = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
});
}, {
threshold: 0.1
});
const sections = document.querySelectorAll('section');
sections.forEach(section => {
section.style.opacity = '0';
section.style.transform = 'translateY(20px)';
section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
fadeObserver.observe(section);
});