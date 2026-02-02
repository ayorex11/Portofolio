const content = {
  security: {
    badge: "Cybersecurity Specialist",
    title: "Securing Digital",
    titleGradient: "Infrastructure",
    description:
      "Cybersecurity Analyst & Backend Developer specializing in threat detection, secure application development, and network security architecture.",
    aboutP1:
      "I am a <strong>Cybersecurity Analyst</strong> and <strong>Backend Developer</strong> with expertise in Python, Django Rest Framework, and security protocols. At 21 years old, I bring a unique combination of technical skills, analytical thinking, and a passion for securing digital environments.",
    aboutP2:
      "My journey in technology began with backend development, which gave me a strong foundation in building secure applications. This naturally evolved into a dedicated focus on cybersecurity, where I now specialize in threat detection, vulnerability assessment, and security architecture.",
    servicesSubtitle:
      "Specialized cybersecurity services combining threat analysis, secure development, and network protection",
    logoIcon: "fa-shield-halved",
  },
  developer: {
    badge: "Full-Stack Developer",
    title: "Building Modern",
    titleGradient: "Web Solutions",
    description:
      "Full-Stack Developer & Security-Minded Engineer specializing in scalable applications, API development, and secure software architecture.",
    aboutP1:
      "I am a <strong>Full-Stack Developer</strong> and <strong>Security-Minded Engineer</strong> with expertise in  Vue, Django, and modern web technologies. At 21 years old, I combine development excellence with security awareness to build robust, user-friendly applications.",
    aboutP2:
      "My journey started with a passion for creating web applications that solve real problems. Along the way, I developed a deep understanding of security principles, allowing me to build applications that are not only functional and beautiful, but also secure and resilient.",
    servicesSubtitle:
      "Professional web development services from concept to deployment with security built-in",
    logoIcon: "fa-code",
  },
};

// Particle Animation
class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById("particleCanvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 50;
    this.mouse = { x: null, y: null, radius: 150 };

    this.init();
    this.animate();
    this.setupEventListeners();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }
  }

  setupEventListeners() {
    window.addEventListener("resize", () => this.resize());

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener("mouseleave", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Get current theme color
    const isDeveloperMode = document.body.classList.contains("developer-mode");
    const particleColor = isDeveloperMode ? "59, 130, 246" : "16, 185, 129";

    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.2;
          particle.vy -= Math.sin(angle) * force * 0.2;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${particleColor}, 0.5)`;
      this.ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${particleColor}, ${0.2 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Terminal typing animation
  const terminalText = document.getElementById("terminalText");
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

  // Initialize particle system
  new ParticleSystem();

  // Welcome modal
  const enterBtn = document.getElementById("enterBtn");
  const welcomeModal = document.getElementById("welcomeModal");
  
  if (enterBtn && welcomeModal) {
    enterBtn.addEventListener("click", function () {
      welcomeModal.classList.add("hidden");
    });
  }

  // Initialize games and menu AFTER modal is handled
  setTimeout(() => {
    new TicTacToeGame();
    new SnakeGame();
    initGameMenu();
  }, 100);

  // Load saved mode
  const savedMode = localStorage.getItem("portfolioMode") || "security";
  if (savedMode === "developer") {
    switchMode("developer", false);
  }
});

// Mode toggle
const toggleBtns = document.querySelectorAll(".toggle-btn");
const toggleContainer = document.querySelector(".toggle-container");

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const mode = this.getAttribute("data-mode");
    switchMode(mode);
  });
});

function switchMode(mode, animate = true) {
  const body = document.body;
  const logoIcon = document.getElementById("logoIcon");

  toggleBtns.forEach((btn) => {
    if (btn.getAttribute("data-mode") === mode) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (mode === "developer") {
    toggleContainer.classList.add("developer");
  } else {
    toggleContainer.classList.remove("developer");
  }

  if (mode === "developer") {
    body.classList.remove("security-mode");
    body.classList.add("developer-mode");
  } else {
    body.classList.remove("developer-mode");
    body.classList.add("security-mode");
  }

  updateContent(mode);
  reorderProjects(mode);
  toggleServices(mode);
  logoIcon.className = `fas ${content[mode].logoIcon}`;
  localStorage.setItem("portfolioMode", mode);
}

function updateContent(mode) {
  const modeContent = content[mode];

  document.getElementById("heroBadge").textContent = modeContent.badge;
  document.getElementById("heroTitle").innerHTML =
    `${modeContent.title}<br><span class="gradient-text" id="heroGradient">${modeContent.titleGradient}</span>`;
  document.getElementById("heroDescription").textContent =
    modeContent.description;
  document.getElementById("aboutP1").innerHTML = modeContent.aboutP1;
  document.getElementById("aboutP2").innerHTML = modeContent.aboutP2;
  document.getElementById("servicesSubtitle").textContent =
    modeContent.servicesSubtitle;
}

function reorderProjects(mode) {
  const projectsGrid = document.getElementById("projectsGrid");
  const projects = Array.from(projectsGrid.children);

  projects.sort((a, b) => {
    const orderA = parseInt(a.getAttribute(`data-order-${mode}`));
    const orderB = parseInt(b.getAttribute(`data-order-${mode}`));
    return orderA - orderB;
  });

  projectsGrid.innerHTML = "";
  projects.forEach((project) => projectsGrid.appendChild(project));
}

function toggleServices(mode) {
  const securityServices = document.querySelectorAll(".security-service");
  const developerServices = document.querySelectorAll(".developer-service");

  if (mode === "security") {
    securityServices.forEach((card) => (card.style.display = "block"));
    developerServices.forEach((card) => (card.style.display = "none"));
  } else {
    securityServices.forEach((card) => (card.style.display = "none"));
    developerServices.forEach((card) => (card.style.display = "block"));
  }
}

// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

mobileToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
  const icon = mobileToggle.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu on link click
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");
    const icon = mobileToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Skill bars animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll(".skill-progress");
      progressBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress");
        setTimeout(() => {
          bar.style.width = progress + "%";
        }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Contact form
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Create success message
  const btn = this.querySelector(".btn-primary");
  const originalText = btn.textContent;
  btn.textContent = "Message Sent! ✓";
  btn.style.background = "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)";

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = "";
    contactForm.reset();
  }, 3000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.offsetTop - 70;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// Fade in sections on scroll
const fadeObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  },
);

const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  fadeObserver.observe(section);
});

// Add stagger animation to cards
const cardObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(
          ".service-card, .project-card, .skill-item",
        );
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 100);
        });
        cardObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  },
);

// Apply stagger animation to card containers
const cardContainers = document.querySelectorAll(
  ".services-grid, .projects-grid, .skills-bars",
);
cardContainers.forEach((container) => {
  const cards = container.querySelectorAll(
    ".service-card, .project-card, .skill-item",
  );
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });
  cardObserver.observe(container);
});

// ========================================
// TIC-TAC-TOE GAME
// ========================================

class TicTacToeGame {
  constructor() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.gameActive = true;
    this.scores = {
      playerWins: 0,
      aiWins: 0,
      draws: 0
    };
    
    this.winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    
    this.init();
  }
  
  init() {
    this.gameModal = document.getElementById('gameModal');
    this.gameClose = document.getElementById('gameClose');
    this.gameBoard = document.getElementById('gameBoard');
    this.gameStatus = document.getElementById('gameStatus');
    this.resetBtn = document.getElementById('resetGame');
    this.cells = document.querySelectorAll('.game-cell');
    
    this.playerWinsEl = document.getElementById('playerWins');
    this.aiWinsEl = document.getElementById('aiWins');
    this.drawsEl = document.getElementById('draws');
    
    this.loadScores();
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    // Don't attach to game button here - that's handled by game menu
    this.gameClose.addEventListener('click', () => this.closeGame());
    this.resetBtn.addEventListener('click', () => this.resetGame());
    
    this.cells.forEach(cell => {
      cell.addEventListener('click', (e) => this.handleCellClick(e));
    });
    
    // Close on background click
    this.gameModal.addEventListener('click', (e) => {
      if (e.target === this.gameModal) {
        this.closeGame();
      }
    });
  }
  
  openGame() {
    this.gameModal.classList.add('active');
  }
  
  closeGame() {
    this.gameModal.classList.remove('active');
  }
  
  handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    if (this.board[index] !== '' || !this.gameActive || this.currentPlayer !== 'X') {
      return;
    }
    
    this.makeMove(index, 'X');
    
    if (this.gameActive) {
      setTimeout(() => {
        this.aiMove();
      }, 500);
    }
  }
  
  makeMove(index, player) {
    this.board[index] = player;
    const cell = this.cells[index];
    cell.textContent = player;
    cell.classList.add('taken', player === 'X' ? 'player' : 'ai');
    
    this.checkResult();
  }
  
  aiMove() {
    if (!this.gameActive) return;
    
    const bestMove = this.minimax(this.board, 'O').index;
    this.makeMove(bestMove, 'O');
  }
  
  // Minimax algorithm for unbeatable AI
  minimax(newBoard, player) {
    const availSpots = this.getEmptyIndices(newBoard);
    
    if (this.checkWin(newBoard, 'X')) {
      return { score: -10 };
    } else if (this.checkWin(newBoard, 'O')) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }
    
    const moves = [];
    
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      newBoard[availSpots[i]] = player;
      
      if (player === 'O') {
        const result = this.minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = this.minimax(newBoard, 'O');
        move.score = result.score;
      }
      
      newBoard[availSpots[i]] = '';
      moves.push(move);
    }
    
    let bestMove;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    
    return moves[bestMove];
  }
  
  getEmptyIndices(board) {
    return board.reduce((acc, cell, index) => {
      if (cell === '') acc.push(index);
      return acc;
    }, []);
  }
  
  checkWin(board, player) {
    return this.winningConditions.some(condition => {
      return condition.every(index => board[index] === player);
    });
  }
  
  checkResult() {
    let roundWon = false;
    let winningCombination = null;
    
    for (let i = 0; i < this.winningConditions.length; i++) {
      const condition = this.winningConditions[i];
      const a = this.board[condition[0]];
      const b = this.board[condition[1]];
      const c = this.board[condition[2]];
      
      if (a === '' || b === '' || c === '') {
        continue;
      }
      
      if (a === b && b === c) {
        roundWon = true;
        winningCombination = condition;
        break;
      }
    }
    
    if (roundWon) {
      const winner = this.board[winningCombination[0]];
      this.gameActive = false;
      
      // Highlight winning cells
      winningCombination.forEach(index => {
        this.cells[index].classList.add('winning');
      });
      
      if (winner === 'X') {
        this.gameStatus.textContent = '🎉 You Win!';
        this.gameStatus.classList.add('winner');
        this.scores.playerWins++;
        this.playerWinsEl.textContent = this.scores.playerWins;
      } else {
        this.gameStatus.textContent = '😔 AI Wins!';
        this.gameStatus.classList.add('loser');
        this.scores.aiWins++;
        this.aiWinsEl.textContent = this.scores.aiWins;
      }
      
      this.saveScores();
      return;
    }
    
    if (!this.board.includes('')) {
      this.gameActive = false;
      this.gameStatus.textContent = '🤝 Draw!';
      this.gameStatus.classList.add('draw');
      this.scores.draws++;
      this.drawsEl.textContent = this.scores.draws;
      this.saveScores();
      return;
    }
    
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    this.gameStatus.textContent = this.currentPlayer === 'X' ? 'Your Turn' : 'AI Thinking...';
  }
  
  resetGame() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.gameActive = true;
    
    this.cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('taken', 'player', 'ai', 'winning');
    });
    
    this.gameStatus.textContent = 'Your Turn';
    this.gameStatus.classList.remove('winner', 'loser', 'draw');
  }
  
  saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
  }
  
  loadScores() {
    const saved = localStorage.getItem('ticTacToeScores');
    if (saved) {
      this.scores = JSON.parse(saved);
      this.playerWinsEl.textContent = this.scores.playerWins;
      this.aiWinsEl.textContent = this.scores.aiWins;
      this.drawsEl.textContent = this.scores.draws;
    }
  }
}

// ========================================
// GAME MENU - FIXED
// ========================================

function initGameMenu() {
  const gameButton = document.getElementById('gameButton');
  const gameMenu = document.getElementById('gameMenu');
  const openTicTacToe = document.getElementById('openTicTacToe');
  const openSnake = document.getElementById('openSnake');
  
  if (!gameButton || !gameMenu || !openTicTacToe || !openSnake) {
    console.error('Game menu elements not found!');
    return;
  }
  
  let menuOpen = false;
  
  gameButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    menuOpen = !menuOpen;
    if (menuOpen) {
      gameMenu.classList.add('active');
      console.log('Game menu opened');
    } else {
      gameMenu.classList.remove('active');
      console.log('Game menu closed');
    }
  });
  
  openTicTacToe.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Opening Tic-Tac-Toe');
    gameMenu.classList.remove('active');
    menuOpen = false;
    document.getElementById('gameModal').classList.add('active');
  });
  
  openSnake.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Opening Snake');
    gameMenu.classList.remove('active');
    menuOpen = false;
    document.getElementById('snakeModal').classList.add('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menuOpen && !gameButton.contains(e.target) && !gameMenu.contains(e.target)) {
      gameMenu.classList.remove('active');
      menuOpen = false;
    }
  });
}

// ========================================
// SNAKE GAME
// ========================================

class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('snakeCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 20;
    this.tileCount = 20;
    
    this.snake = [{ x: 10, y: 10 }];
    this.food = { x: 15, y: 15 };
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.highScore = 0;
    this.gameLoop = null;
    this.gameRunning = false;
    this.gamePaused = false;
    this.aiMode = false;
    
    this.difficulties = {
      easy: 150,
      medium: 100,
      hard: 70,
      extreme: 40
    };
    this.currentDifficulty = 'medium';
    this.gameSpeed = this.difficulties[this.currentDifficulty];
    
    this.init();
  }
  
  init() {
    this.snakeModal = document.getElementById('snakeModal');
    this.snakeClose = document.getElementById('snakeClose');
    this.snakeStart = document.getElementById('snakeStart');
    this.snakeOverlay = document.getElementById('snakeOverlay');
    this.difficultySelect = document.getElementById('difficulty');
    this.aiToggle = document.getElementById('aiToggle');
    this.pauseBtn = document.getElementById('pauseGame');
    
    this.scoreEl = document.getElementById('snakeScore');
    this.highScoreEl = document.getElementById('snakeHighScore');
    this.speedEl = document.getElementById('snakeSpeed');
    this.overlayTitle = document.getElementById('overlayTitle');
    this.overlayMessage = document.getElementById('overlayMessage');
    
    this.loadHighScore();
    this.attachEventListeners();
    this.updateSpeedDisplay();
  }
  
  attachEventListeners() {
    this.snakeClose.addEventListener('click', () => this.closeGame());
    this.snakeStart.addEventListener('click', () => this.startGame());
    this.pauseBtn.addEventListener('click', () => this.togglePause());
    this.aiToggle.addEventListener('click', () => this.toggleAI());
    
    this.difficultySelect.addEventListener('change', (e) => {
      this.currentDifficulty = e.target.value;
      this.gameSpeed = this.difficulties[this.currentDifficulty];
      this.updateSpeedDisplay();
      if (this.gameRunning) {
        this.restartGameLoop();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (!this.snakeModal.classList.contains('active')) return;
      
      if (e.key === ' ') {
        e.preventDefault();
        if (this.gameRunning) {
          this.togglePause();
        }
      }
      
      if (this.aiMode || this.gamePaused) return;
      
      const key = e.key.toLowerCase();
      
      // Arrow keys or WASD
      if ((key === 'arrowup' || key === 'w') && this.dy === 0) {
        this.dx = 0;
        this.dy = -1;
      } else if ((key === 'arrowdown' || key === 's') && this.dy === 0) {
        this.dx = 0;
        this.dy = 1;
      } else if ((key === 'arrowleft' || key === 'a') && this.dx === 0) {
        this.dx = -1;
        this.dy = 0;
      } else if ((key === 'arrowright' || key === 'd') && this.dx === 0) {
        this.dx = 1;
        this.dy = 0;
      }
    });
    
    // Close on background click
    this.snakeModal.addEventListener('click', (e) => {
      if (e.target === this.snakeModal) {
        this.closeGame();
      }
    });
  }
  
  closeGame() {
    this.snakeModal.classList.remove('active');
    if (this.gameRunning) {
      this.endGame();
    }
  }
  
  startGame() {
    this.snake = [{ x: 10, y: 10 }];
    this.dx = 1;
    this.dy = 0;
    this.score = 0;
    this.gameRunning = true;
    this.gamePaused = false;
    this.scoreEl.textContent = '0';
    this.snakeOverlay.classList.add('hidden');
    this.pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    
    this.placeFood();
    this.restartGameLoop();
  }
  
  restartGameLoop() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
  }
  
  togglePause() {
    if (!this.gameRunning) return;
    
    this.gamePaused = !this.gamePaused;
    
    if (this.gamePaused) {
      this.pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
      this.pauseBtn.classList.add('active');
    } else {
      this.pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
      this.pauseBtn.classList.remove('active');
    }
  }
  
  toggleAI() {
    this.aiMode = !this.aiMode;
    
    if (this.aiMode) {
      this.aiToggle.innerHTML = '<i class="fas fa-robot"></i> AI Autopilot: ON';
      this.aiToggle.classList.add('active');
    } else {
      this.aiToggle.innerHTML = '<i class="fas fa-robot"></i> AI Autopilot: OFF';
      this.aiToggle.classList.remove('active');
    }
  }
  
  update() {
    if (this.gamePaused || !this.gameRunning) return;
    
    if (this.aiMode) {
      this.aiMove();
    }
    
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    
    // Check wall collision
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.endGame();
      return;
    }
    
    // Check self collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.endGame();
      return;
    }
    
    this.snake.unshift(head);
    
    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.scoreEl.textContent = this.score;
      this.placeFood();
    } else {
      this.snake.pop();
    }
    
    this.draw();
  }
  
  aiMove() {
    const path = this.findPath(this.snake[0], this.food);
    if (path && path.length > 1) {
      const nextMove = path[1];
      this.dx = nextMove.x - this.snake[0].x;
      this.dy = nextMove.y - this.snake[0].y;
    }
  }
  
  // A* pathfinding algorithm for AI
  findPath(start, goal) {
    const openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(this.posKey(start), 0);
    fScore.set(this.posKey(start), this.heuristic(start, goal));
    
    while (openSet.length > 0) {
      // Find node with lowest fScore
      let current = openSet[0];
      let currentIdx = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (fScore.get(this.posKey(openSet[i])) < fScore.get(this.posKey(current))) {
          current = openSet[i];
          currentIdx = i;
        }
      }
      
      if (current.x === goal.x && current.y === goal.y) {
        return this.reconstructPath(cameFrom, current);
      }
      
      openSet.splice(currentIdx, 1);
      
      const neighbors = this.getNeighbors(current);
      for (const neighbor of neighbors) {
        const tentativeGScore = gScore.get(this.posKey(current)) + 1;
        const neighborKey = this.posKey(neighbor);
        
        if (!gScore.has(neighborKey) || tentativeGScore < gScore.get(neighborKey)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, goal));
          
          if (!openSet.some(pos => pos.x === neighbor.x && pos.y === neighbor.y)) {
            openSet.push(neighbor);
          }
        }
      }
    }
    
    return null; // No path found
  }
  
  heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  
  posKey(pos) {
    return `${pos.x},${pos.y}`;
  }
  
  reconstructPath(cameFrom, current) {
    const path = [current];
    let currentKey = this.posKey(current);
    
    while (cameFrom.has(currentKey)) {
      current = cameFrom.get(currentKey);
      path.unshift(current);
      currentKey = this.posKey(current);
    }
    
    return path;
  }
  
  getNeighbors(pos) {
    const neighbors = [];
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }   // Right
    ];
    
    for (const dir of directions) {
      const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };
      
      // Check bounds
      if (newPos.x < 0 || newPos.x >= this.tileCount || newPos.y < 0 || newPos.y >= this.tileCount) {
        continue;
      }
      
      // Check snake collision (except tail which will move)
      const snakeBody = this.snake.slice(0, -1);
      if (snakeBody.some(segment => segment.x === newPos.x && segment.y === newPos.y)) {
        continue;
      }
      
      neighbors.push(newPos);
    }
    
    return neighbors;
  }
  
  placeFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.tileCount),
        y: Math.floor(Math.random() * this.tileCount)
      };
    } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    this.food = newFood;
  }
  
  draw() {
    // Get theme colors
    const isDeveloperMode = document.body.classList.contains('developer-mode');
    const primaryColor = isDeveloperMode ? '#3b82f6' : '#10b981';
    const secondaryColor = isDeveloperMode ? '#8b5cf6' : '#14b8a6';
    const bgColor = isDeveloperMode ? '#f9fafb' : '#0a0a0a';
    const gridColor = isDeveloperMode ? '#e5e7eb' : '#1a1a1a';
    
    // Clear canvas
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid
    this.ctx.strokeStyle = gridColor;
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i <= this.tileCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.gridSize, 0);
      this.ctx.lineTo(i * this.gridSize, this.canvas.height);
      this.ctx.stroke();
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.gridSize);
      this.ctx.lineTo(this.canvas.width, i * this.gridSize);
      this.ctx.stroke();
    }
    
    // Draw snake
    this.snake.forEach((segment, index) => {
      const gradient = this.ctx.createLinearGradient(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        (segment.x + 1) * this.gridSize,
        (segment.y + 1) * this.gridSize
      );
      
      if (index === 0) {
        // Head
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);
      } else {
        // Body
        const alpha = 1 - (index / this.snake.length) * 0.5;
        gradient.addColorStop(0, this.hexToRgba(primaryColor, alpha));
        gradient.addColorStop(1, this.hexToRgba(secondaryColor, alpha));
      }
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(
        segment.x * this.gridSize + 1,
        segment.y * this.gridSize + 1,
        this.gridSize - 2,
        this.gridSize - 2
      );
      
      // Add glow to head
      if (index === 0) {
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = primaryColor;
        this.ctx.fillRect(
          segment.x * this.gridSize + 1,
          segment.y * this.gridSize + 1,
          this.gridSize - 2,
          this.gridSize - 2
        );
        this.ctx.shadowBlur = 0;
      }
    });
    
    // Draw food
    this.ctx.fillStyle = '#ef4444';
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = '#ef4444';
    this.ctx.beginPath();
    this.ctx.arc(
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      this.gridSize / 2 - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    this.ctx.shadowBlur = 0;
  }
  
  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  endGame() {
    this.gameRunning = false;
    clearInterval(this.gameLoop);
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreEl.textContent = this.highScore;
      this.saveHighScore();
      this.overlayTitle.textContent = '🎉 New High Score!';
    } else {
      this.overlayTitle.textContent = 'Game Over!';
    }
    
    this.overlayMessage.textContent = `Final Score: ${this.score}`;
    this.snakeOverlay.classList.remove('hidden');
    this.snakeStart.innerHTML = '<i class="fas fa-redo"></i> Play Again';
  }
  
  updateSpeedDisplay() {
    const speedMultiplier = {
      easy: '1x',
      medium: '1.5x',
      hard: '2x',
      extreme: '3x'
    };
    this.speedEl.textContent = speedMultiplier[this.currentDifficulty];
  }
  
  saveHighScore() {
    localStorage.setItem('snakeHighScore', this.highScore);
  }
  
  loadHighScore() {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) {
      this.highScore = parseInt(saved);
      this.highScoreEl.textContent = this.highScore;
    }
  }
}