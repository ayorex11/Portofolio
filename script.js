/* ============================================
   AYOMIDE ADEWALE — PORTFOLIO SCRIPT
   Three.js Hero · Tilt Cards · Games · Animations
   ============================================ */

'use strict';

// ============================================================
// LOADER
// ============================================================
(function initLoader() {
  const loader   = document.getElementById('loader');
  const fill     = document.getElementById('loaderFill');
  const text     = document.getElementById('loaderText');
  const messages = ['Initializing...', 'Loading modules...', 'Building scene...', 'Almost there...'];
  let progress   = 0;
  let msgIdx     = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';

    if (progress > (msgIdx + 1) * 25 && msgIdx < messages.length - 1) {
      msgIdx++;
      text.textContent = messages[msgIdx];
    }

    if (progress >= 100) {
      clearInterval(interval);
      text.textContent = 'Ready.';
      setTimeout(() => {
        loader.classList.add('done');
        document.body.style.overflow = 'auto';
        initAll();
      }, 400);
    }
  }, 80);

  document.body.style.overflow = 'hidden';
})();

// ============================================================
// MASTER INIT
// ============================================================
function initAll() {
  initCursor();
  initNav();
  initHeroTyping();
  initThreeJS();
  initTiltCards();
  initScrollReveal();
  initSkillRings();
  initContact();
  initScrollTop();
  initGameMenu();
  new TicTacToeGame();
  new SnakeGame();
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  const hoverEls = document.querySelectorAll('a, button, .tilt-card, .game-cell, .tool-chip, .tag');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

// ============================================================
// NAVIGATION
// ============================================================
function initNav() {
  const navbar       = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu      = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================
// HERO TYPING EFFECT
// ============================================================
function initHeroTyping() {
  const el = document.getElementById('eyebrowText');
  if (!el) return;
  const phrases = ['Full-Stack Developer', 'API Architect', 'Security-Minded Engineer', 'Based in Lagos, Nigeria'];
  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = phrases[pIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 75);
  }

  setTimeout(type, 1400);
}

// ============================================================
// THREE.JS HERO SCENE
// ============================================================
function initThreeJS() {
  if (typeof THREE === 'undefined') return;

  const canvas   = document.getElementById('threeCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 14);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x00d4ff, 0.3);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00d4ff, 2, 40);
  pointLight1.position.set(8, 8, 8);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x0ea5e9, 1.5, 30);
  pointLight2.position.set(-8, -6, -4);
  scene.add(pointLight2);

  // Green wireframe material
  const wireMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });

  const solidMat = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.06,
    metalness: 0.8,
    roughness: 0.2,
  });

  // Floating shapes
  const shapes = [];

  function addShape(geometry, x, y, z, scale = 1) {
    const group = new THREE.Group();
    const solid = new THREE.Mesh(geometry, solidMat);
    const wire  = new THREE.Mesh(geometry, wireMat);
    group.add(solid, wire);
    group.position.set(x, y, z);
    group.scale.setScalar(scale);
    scene.add(group);
    shapes.push({
      group,
      rotX: (Math.random() - 0.5) * 0.008,
      rotY: (Math.random() - 0.5) * 0.012,
      rotZ: (Math.random() - 0.5) * 0.006,
      floatSpeed: Math.random() * 0.5 + 0.3,
      floatAmp:   Math.random() * 0.4 + 0.2,
      floatOffset: Math.random() * Math.PI * 2,
      baseY: y,
    });
    return group;
  }

  // Main central icosahedron
  addShape(new THREE.IcosahedronGeometry(2.2, 1), 0, 0, 0, 1);

  // Torus knot — offset right
  addShape(new THREE.TorusKnotGeometry(1.1, 0.3, 80, 12), 6, 1.5, -3, 0.9);

  // Octahedron — top left
  addShape(new THREE.OctahedronGeometry(1.2, 0), -6.5, 2.5, -2, 1);

  // Small dodecahedron — bottom right
  addShape(new THREE.DodecahedronGeometry(0.9, 0), 5.5, -3, -1, 1);

  // Tetrahedron — bottom left
  addShape(new THREE.TetrahedronGeometry(1.0, 0), -5, -2.5, -2, 1);

  // Extra tiny shapes for depth
  addShape(new THREE.IcosahedronGeometry(0.5, 0), 3, 3.5, -5, 1);
  addShape(new THREE.OctahedronGeometry(0.4, 0), -3.5, 3, -6, 1);

  // Particle field
  const particleCount = window.innerWidth < 768 ? 600 : 1200;
  const positions     = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.06,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Grid lines (subtle background plane)
  const gridHelper = new THREE.GridHelper(60, 30, 0x001a2e, 0x000d1a);
  gridHelper.position.y = -8;
  gridHelper.rotation.x = 0.1;
  scene.add(gridHelper);

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animate
  let clock = 0;

  function animate() {
    requestAnimationFrame(animate);
    clock += 0.01;

    // Smooth camera parallax
    targetX += (mouseX * 1.2 - targetX) * 0.04;
    targetY += (mouseY * 0.8 - targetY) * 0.04;
    camera.position.x = targetX;
    camera.position.y = -targetY;
    camera.lookAt(scene.position);

    // Animate shapes
    shapes.forEach(s => {
      s.group.rotation.x += s.rotX;
      s.group.rotation.y += s.rotY;
      s.group.rotation.z += s.rotZ;
      s.group.position.y = s.baseY + Math.sin(clock * s.floatSpeed + s.floatOffset) * s.floatAmp;
    });

    // Slowly rotate particles
    particles.rotation.y  = clock * 0.03;
    particles.rotation.x  = clock * 0.01;

    // Pulse grid
    gridHelper.position.y = -8 + Math.sin(clock * 0.5) * 0.3;

    renderer.render(scene, camera);
  }

  animate();
}

// ============================================================
// 3D TILT CARDS
// ============================================================
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);

      card.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateZ(6px)`;

      // Update glow position
      const glow = card.querySelector('.card-glow');
      if (glow) {
        const px = ((e.clientX - rect.left) / rect.width)  * 100;
        const py = ((e.clientY - rect.top)  / rect.height) * 100;
        glow.style.setProperty('--mx', px + '%');
        glow.style.setProperty('--my', py + '%');
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
  });

  // Image frame tilt (stronger)
  const imageFrame = document.getElementById('imageTilt');
  if (imageFrame) {
    imageFrame.addEventListener('mousemove', e => {
      const rect = imageFrame.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      imageFrame.style.transform = `perspective(600px) rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg)`;
    });

    imageFrame.addEventListener('mouseleave', () => {
      imageFrame.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
    });
  }
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.service-card, .project-card, .contact-item, .tools-section, .ring-item, .about-grid, .section-header, .contact-grid, .hero-stats'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// ============================================================
// SKILL RINGS
// ============================================================
function initSkillRings() {
  const rings      = document.querySelectorAll('.ring-item');
  const circumference = 2 * Math.PI * 50; // r=50

  rings.forEach(ring => {
    const fill  = ring.querySelector('.ring-fill');
    const pct   = parseInt(ring.dataset.progress);
    const offset = circumference - (pct / 100) * circumference;

    fill.style.strokeDasharray  = circumference;
    fill.style.strokeDashoffset = circumference; // start empty
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring  = entry.target;
        const fill  = ring.querySelector('.ring-fill');
        const pct   = parseInt(ring.dataset.progress);
        const offset = circumference - (pct / 100) * circumference;
        setTimeout(() => { fill.style.strokeDashoffset = offset; }, 200);
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.4 });

  rings.forEach(ring => observer.observe(ring));
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn  = this.querySelector('.btn-primary');
    const orig = btn.innerHTML;

    btn.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
    btn.style.background = '#0ea5e9';

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ============================================================
// SCROLL TO TOP
// ============================================================
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================================
// GAME MENU
// ============================================================
function initGameMenu() {
  const gameBtn  = document.getElementById('gameButton');
  const gameMenu = document.getElementById('gameMenu');
  const tttBtn   = document.getElementById('openTicTacToe');
  const snakeBtn = document.getElementById('openSnake');

  if (!gameBtn || !gameMenu) return;

  let open = false;

  gameBtn.addEventListener('click', e => {
    e.stopPropagation();
    open = !open;
    gameMenu.classList.toggle('active', open);
  });

  tttBtn.addEventListener('click', e => {
    e.stopPropagation();
    gameMenu.classList.remove('active');
    open = false;
    document.getElementById('gameModal').classList.add('active');
  });

  snakeBtn.addEventListener('click', e => {
    e.stopPropagation();
    gameMenu.classList.remove('active');
    open = false;
    document.getElementById('snakeModal').classList.add('active');
  });

  document.addEventListener('click', e => {
    if (open && !gameBtn.contains(e.target) && !gameMenu.contains(e.target)) {
      gameMenu.classList.remove('active');
      open = false;
    }
  });
}

// ============================================================
// TIC-TAC-TOE GAME
// ============================================================
class TicTacToeGame {
  constructor() {
    this.board   = Array(9).fill('');
    this.active  = true;
    this.player  = 'X';
    this.scores  = { playerWins: 0, aiWins: 0, draws: 0 };
    this.wins    = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    this.init();
  }

  init() {
    this.modal    = document.getElementById('gameModal');
    this.status   = document.getElementById('gameStatus');
    this.cells    = document.querySelectorAll('.game-cell');
    this.pwEl     = document.getElementById('playerWins');
    this.aiEl     = document.getElementById('aiWins');
    this.dEl      = document.getElementById('draws');

    document.getElementById('gameClose').addEventListener('click', () => this.modal.classList.remove('active'));
    document.getElementById('resetGame').addEventListener('click', () => this.reset());
    this.cells.forEach(c => c.addEventListener('click', e => this.click(e)));
    this.modal.addEventListener('click', e => { if (e.target === this.modal) this.modal.classList.remove('active'); });
    this.load();
  }

  click(e) {
    const idx = +e.target.dataset.index;
    if (this.board[idx] || !this.active || this.player !== 'X') return;
    this.move(idx, 'X');
    if (this.active) setTimeout(() => this.aiMove(), 480);
  }

  move(idx, p) {
    this.board[idx] = p;
    const cell = this.cells[idx];
    cell.textContent = p;
    cell.classList.add('taken', p === 'X' ? 'player' : 'ai');
    this.check();
  }

  aiMove() {
    if (!this.active) return;
    this.move(this.minimax(this.board, 'O').index, 'O');
  }

  minimax(board, player) {
    const empty = board.reduce((a, v, i) => v === '' ? [...a, i] : a, []);
    if (this.checkWin(board, 'X')) return { score: -10 };
    if (this.checkWin(board, 'O')) return { score: 10 };
    if (!empty.length) return { score: 0 };

    const moves = empty.map(i => {
      board[i] = player;
      const result = this.minimax(board, player === 'O' ? 'X' : 'O');
      board[i] = '';
      return { index: i, score: result.score };
    });

    return player === 'O'
      ? moves.reduce((best, m) => m.score > best.score ? m : best)
      : moves.reduce((best, m) => m.score < best.score ? m : best);
  }

  checkWin(board, p) {
    return this.wins.some(w => w.every(i => board[i] === p));
  }

  check() {
    for (const cond of this.wins) {
      const [a, b, c] = cond;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[b] === this.board[c]) {
        this.active = false;
        cond.forEach(i => this.cells[i].classList.add('winning'));
        const winner = this.board[a];
        if (winner === 'X') {
          this.status.textContent = '🎉 You Win!';
          this.status.className = 'game-status winner';
          this.scores.playerWins++;
          this.pwEl.textContent = this.scores.playerWins;
        } else {
          this.status.textContent = '🤖 AI Wins!';
          this.status.className = 'game-status loser';
          this.scores.aiWins++;
          this.aiEl.textContent = this.scores.aiWins;
        }
        this.save(); return;
      }
    }

    if (!this.board.includes('')) {
      this.active = false;
      this.status.textContent = '🤝 Draw!';
      this.status.className = 'game-status draw';
      this.scores.draws++;
      this.dEl.textContent = this.scores.draws;
      this.save(); return;
    }

    this.player = this.player === 'X' ? 'O' : 'X';
    this.status.textContent = this.player === 'X' ? 'Your Turn' : 'AI Thinking...';
    this.status.className = 'game-status';
  }

  reset() {
    this.board = Array(9).fill('');
    this.player = 'X';
    this.active = true;
    this.cells.forEach(c => { c.textContent = ''; c.className = 'game-cell'; });
    this.status.textContent = 'Your Turn';
    this.status.className = 'game-status';
  }

  save() { localStorage.setItem('tttScores', JSON.stringify(this.scores)); }
  load() {
    const s = localStorage.getItem('tttScores');
    if (s) {
      this.scores = JSON.parse(s);
      this.pwEl.textContent = this.scores.playerWins;
      this.aiEl.textContent = this.scores.aiWins;
      this.dEl.textContent  = this.scores.draws;
    }
  }
}

// ============================================================
// SNAKE GAME
// ============================================================
class SnakeGame {
  constructor() {
    this.canvas    = document.getElementById('snakeCanvas');
    this.ctx       = this.canvas.getContext('2d');
    this.grid      = 20;
    this.tiles     = 20;
    this.snake     = [{ x: 10, y: 10 }];
    this.food      = { x: 15, y: 15 };
    this.dx = 0; this.dy = 0;
    this.score     = 0;
    this.highScore = 0;
    this.loop      = null;
    this.running   = false;
    this.paused    = false;
    this.aiMode    = false;
    this.speeds    = { easy: 150, medium: 100, hard: 70, extreme: 40 };
    this.difficulty = 'medium';
    this.speed      = this.speeds[this.difficulty];
    this.touchStartX = 0; this.touchStartY = 0;
    this.init();
  }

  init() {
    this.modal    = document.getElementById('snakeModal');
    this.overlay  = document.getElementById('snakeOverlay');
    this.startBtn = document.getElementById('snakeStart');
    this.scoreEl  = document.getElementById('snakeScore');
    this.highEl   = document.getElementById('snakeHighScore');
    this.speedEl  = document.getElementById('snakeSpeed');
    this.titleEl  = document.getElementById('overlayTitle');
    this.msgEl    = document.getElementById('overlayMessage');

    document.getElementById('snakeClose').addEventListener('click', () => this.close());
    this.startBtn.addEventListener('click', () => this.start());
    document.getElementById('pauseGame').addEventListener('click', () => this.togglePause());
    document.getElementById('aiToggle').addEventListener('click', () => this.toggleAI());
    document.getElementById('difficulty').addEventListener('change', e => {
      this.difficulty = e.target.value;
      this.speed = this.speeds[this.difficulty];
      this.updateSpeedLabel();
      if (this.running) this.restartLoop();
    });

    document.addEventListener('keydown', e => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === ' ') { e.preventDefault(); if (this.running) this.togglePause(); }
      if (this.aiMode || this.paused) return;
      const k = e.key.toLowerCase();
      if ((k === 'arrowup'    || k === 'w') && this.dy === 0) { this.dx = 0;  this.dy = -1; }
      if ((k === 'arrowdown'  || k === 's') && this.dy === 0) { this.dx = 0;  this.dy = 1;  }
      if ((k === 'arrowleft'  || k === 'a') && this.dx === 0) { this.dx = -1; this.dy = 0;  }
      if ((k === 'arrowright' || k === 'd') && this.dx === 0) { this.dx = 1;  this.dy = 0;  }
    });

    this.canvas.addEventListener('touchstart', e => { e.preventDefault(); const t = e.touches[0]; this.touchStartX = t.clientX; this.touchStartY = t.clientY; }, { passive: false });
    this.canvas.addEventListener('touchmove',  e => { e.preventDefault(); }, { passive: false });
    this.canvas.addEventListener('touchend',   e => {
      e.preventDefault();
      if (!this.running || this.aiMode || this.paused) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - this.touchStartX;
      const dy = t.clientY - this.touchStartY;
      if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && this.dx === 0) { this.dx = 1;  this.dy = 0;  }
        else if (dx < 0 && this.dx === 0) { this.dx = -1; this.dy = 0; }
      } else {
        if (dy > 0 && this.dy === 0) { this.dx = 0; this.dy = 1;  }
        else if (dy < 0 && this.dy === 0) { this.dx = 0; this.dy = -1; }
      }
    }, { passive: false });

    this.modal.addEventListener('click', e => { if (e.target === this.modal) this.close(); });
    this.loadHS();
    this.updateSpeedLabel();
  }

  close()  { this.modal.classList.remove('active'); if (this.running) this.end(); }
  start()  {
    this.snake   = [{ x: 10, y: 10 }];
    this.dx = 1; this.dy = 0;
    this.score   = 0;
    this.running = true;
    this.paused  = false;
    this.scoreEl.textContent = '0';
    this.overlay.classList.add('hidden');
    document.getElementById('pauseGame').innerHTML = '<i class="fas fa-pause"></i> Pause';
    this.placeFood();
    this.restartLoop();
  }

  restartLoop() {
    if (this.loop) clearInterval(this.loop);
    this.loop = setInterval(() => this.update(), this.speed);
  }

  togglePause() {
    this.paused = !this.paused;
    const btn = document.getElementById('pauseGame');
    btn.innerHTML = this.paused
      ? '<i class="fas fa-play"></i> Resume'
      : '<i class="fas fa-pause"></i> Pause';
    btn.classList.toggle('active', this.paused);
  }

  toggleAI() {
    this.aiMode = !this.aiMode;
    const btn = document.getElementById('aiToggle');
    btn.innerHTML = this.aiMode
      ? '<i class="fas fa-robot"></i> <span class="desktop-only-inline">AI Autopilot: ON</span><span class="mobile-only-inline">AI: ON</span>'
      : '<i class="fas fa-robot"></i> <span class="desktop-only-inline">AI Autopilot: OFF</span><span class="mobile-only-inline">AI: OFF</span>';
    btn.classList.toggle('active', this.aiMode);
  }

  update() {
    if (this.paused || !this.running) return;
    if (this.aiMode) this.aiFindMove();

    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

    if (head.x < 0 || head.x >= this.tiles || head.y < 0 || head.y >= this.tiles) { this.end(); return; }
    if (this.snake.some(s => s.x === head.x && s.y === head.y)) { this.end(); return; }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.scoreEl.textContent = this.score;
      this.placeFood();
    } else {
      this.snake.pop();
    }

    this.draw();
  }

  aiFindMove() {
    const path = this.aStar(this.snake[0], this.food);
    if (path && path.length > 1) {
      this.dx = path[1].x - this.snake[0].x;
      this.dy = path[1].y - this.snake[0].y;
    }
  }

  aStar(start, goal) {
    const key     = p => `${p.x},${p.y}`;
    const open    = [start];
    const cameFrom= new Map();
    const gScore  = new Map([[key(start), 0]]);
    const fScore  = new Map([[key(start), this.h(start, goal)]]);

    while (open.length) {
      let cur = open.reduce((a, b) => (fScore.get(key(a)) || Infinity) < (fScore.get(key(b)) || Infinity) ? a : b);
      if (cur.x === goal.x && cur.y === goal.y) {
        const path = [cur];
        while (cameFrom.has(key(cur))) { cur = cameFrom.get(key(cur)); path.unshift(cur); }
        return path;
      }
      open.splice(open.indexOf(cur), 1);
      for (const n of this.neighbors(cur)) {
        const g = (gScore.get(key(cur)) || 0) + 1;
        if (g < (gScore.get(key(n)) || Infinity)) {
          cameFrom.set(key(n), cur);
          gScore.set(key(n), g);
          fScore.set(key(n), g + this.h(n, goal));
          if (!open.some(o => o.x === n.x && o.y === n.y)) open.push(n);
        }
      }
    }
    return null;
  }

  h(a, b) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); }

  neighbors(pos) {
    return [{ x:pos.x, y:pos.y-1 }, { x:pos.x, y:pos.y+1 }, { x:pos.x-1, y:pos.y }, { x:pos.x+1, y:pos.y }]
      .filter(n => n.x >= 0 && n.x < this.tiles && n.y >= 0 && n.y < this.tiles)
      .filter(n => !this.snake.slice(0, -1).some(s => s.x === n.x && s.y === n.y));
  }

  placeFood() {
    do {
      this.food = { x: Math.floor(Math.random() * this.tiles), y: Math.floor(Math.random() * this.tiles) };
    } while (this.snake.some(s => s.x === this.food.x && s.y === this.food.y));
  }

  draw() {
    const G = this.grid;
    const { ctx } = this;

    ctx.fillStyle = '#030a10';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(0,212,255,0.05)';
    ctx.lineWidth   = 0.5;
    for (let i = 0; i <= this.tiles; i++) {
      ctx.beginPath(); ctx.moveTo(i * G, 0); ctx.lineTo(i * G, this.canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * G); ctx.lineTo(this.canvas.width, i * G); ctx.stroke();
    }

    // Snake
    this.snake.forEach((seg, idx) => {
      const alpha = 1 - (idx / this.snake.length) * 0.6;
      if (idx === 0) {
        ctx.shadowBlur  = 16;
        ctx.shadowColor = '#00d4ff';
        ctx.fillStyle   = '#00d4ff';
      } else {
        ctx.shadowBlur  = 0;
        ctx.fillStyle   = `rgba(0,${Math.floor(212 - idx * 3)},${Math.floor(255 - idx * 4)},${alpha})`;
      }
      ctx.fillRect(seg.x * G + 1, seg.y * G + 1, G - 2, G - 2);
    });

    ctx.shadowBlur = 0;

    // Food (pulsing red dot)
    const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.006);
    ctx.shadowBlur  = 12 + pulse * 8;
    ctx.shadowColor = '#ef4444';
    ctx.fillStyle   = '#ef4444';
    ctx.beginPath();
    ctx.arc(this.food.x * G + G / 2, this.food.y * G + G / 2, G / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  end() {
    this.running = false;
    clearInterval(this.loop);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highEl.textContent = this.highScore;
      this.saveHS();
      this.titleEl.textContent = '🎉 New High Score!';
    } else {
      this.titleEl.textContent = 'Game Over!';
    }

    this.msgEl.innerHTML = `<span>Final Score: ${this.score}</span>`;
    this.overlay.classList.remove('hidden');
    this.startBtn.innerHTML = '<i class="fas fa-redo"></i> Play Again';
  }

  updateSpeedLabel() {
    const labels = { easy: '1x', medium: '1.5x', hard: '2x', extreme: '3x' };
    this.speedEl.textContent = labels[this.difficulty];
  }

  saveHS() { localStorage.setItem('snakeHS', this.highScore); }
  loadHS() {
    const s = localStorage.getItem('snakeHS');
    if (s) { this.highScore = parseInt(s); this.highEl.textContent = this.highScore; }
  }
}
