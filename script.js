/* ==========================================================================
   INTERACTIVE PARTICLES BACKGROUND
   ========================================================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;
let mouse = { x: null, y: null, radius: 120 };

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Boundary check
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Mouse interactive push effect
    if (mouse.x != null && mouse.y != null) {
      let dx = this.x - mouse.x;
      let dy = this.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        let force = (mouse.radius - dist) / mouse.radius;
        this.x += (dx / dist) * force * 2;
        this.y += (dy / dist) * force * 2;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
    ctx.fill();
  }
}

function initParticles() {
  resizeCanvas();
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw connecting lines first
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.1 * (1 - dist / 100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // Draw and update particles
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ==========================================================================
   TYPEWRITER EFFECT (HERO)
   ========================================================================== */
const words = ["Portfolio Website", "Professional Title", "Interactive CV", "Clean Code Structure"];
let i = 0;
let timer;

function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      document.getElementById('typed').innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 100);
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.getElementById('typed').innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      setTimeout(typingEffect, 500);
      return false;
    }
    timer = setTimeout(loopDeleting, 60);
  };
  loopDeleting();
}

document.addEventListener('DOMContentLoaded', () => {
  typingEffect();
  initLeaderboard();
  setupLeaderboardInteractivity();
});

/* ==========================================================================
   TIMELINE TAB NAVIGATION
   ========================================================================== */
const tabButtons = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.timeline-pane');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const targetPane = document.getElementById(`${btn.dataset.tab}-pane`);
    targetPane.classList.add('active');
  });
});

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const termConsole = document.getElementById('contact-terminal');

if (contactForm && termConsole) {
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const msgInput = document.getElementById('form-msg');
  
  let nameLogged = false;
  let emailLogged = false;
  let msgLogged = false;

  function appendTerminalLine(label, text, className) {
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `<span class="${className}">${label}</span> ${text}`;
    termConsole.appendChild(line);
    termConsole.scrollTop = termConsole.scrollHeight;
  }

  nameInput.addEventListener('input', () => {
    if (!nameLogged && nameInput.value.length > 3) {
      appendTerminalLine('[input]', `capturing name payload...`, 't-input');
      nameLogged = true;
    }
  });

  emailInput.addEventListener('input', () => {
    if (!emailLogged && emailInput.value.includes('@')) {
      appendTerminalLine('[input]', `validating target gate: "${emailInput.value}"`, 't-input');
      emailLogged = true;
    }
  });

  msgInput.addEventListener('input', () => {
    if (!msgLogged && msgInput.value.length > 10) {
      appendTerminalLine('[input]', 'buffering message payload stream...', 't-input');
      msgLogged = true;
    }
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const origText = submitBtn.innerHTML;
    submitBtn.innerHTML = "⚡ Transmitting...";
    submitBtn.disabled = true;

    // Console logs sequence
    appendTerminalLine('[system]', 'encrypting packet payload...', 't-sys');
    
    setTimeout(() => {
      appendTerminalLine('[system]', 'resolving dns handshake...', 't-sys');
    }, 400);

    setTimeout(() => {
      appendTerminalLine('[system]', 'shipping payload stream to destination gateway...', 't-sys');
    }, 800);

    setTimeout(() => {
      appendTerminalLine('[status]', 'transmission successful. code: 202 Accepted.', 't-done');
      
      contactForm.reset();
      contactForm.style.display = 'none';
      successMsg.style.display = 'block';
      submitBtn.innerHTML = origText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

/* ==========================================================================
   STARTUP CLICKER MINI GAME
   ========================================================================== */
const gCanvas = document.getElementById('game-canvas');
const gCtx = gCanvas.getContext('2d');
const startBtn = document.getElementById('g-start');
const overlay = document.getElementById('g-overlay');
const scoreEl = document.getElementById('g-score');
const hiEl = document.getElementById('g-hi');
const rateEl = document.getElementById('g-rate');

let loc = 0; // Lines of Code
let peakLoc = localStorage.getItem('founder_game_hi') || 0;
let locPerSec = 0.0;
let clickPower = 1;
let gameActive = false;
let lastTime = 0;

let corePulse = 1.0;
let floatingTexts = [];
let hoverIndex = -1;

const shopItems = [
  { id: 'copilot', name: 'AI Copilot', cost: 15, baseCost: 15, count: 0, benefit: 0.2, type: 'sec', desc: '+0.2 LoC/s' },
  { id: 'ssd', name: 'Upgrade SSD', cost: 50, baseCost: 50, count: 0, benefit: 1.0, type: 'click', desc: '+1 LoC/click' },
  { id: 'junior', name: 'Junior Dev', cost: 150, baseCost: 150, count: 0, benefit: 3.0, type: 'sec', desc: '+3.0 LoC/s' },
  { id: 'senior', name: 'Senior Architect', cost: 1000, baseCost: 1000, count: 0, benefit: 25.0, type: 'sec', desc: '+25.0 LoC/s' },
  { id: 'cloud', name: 'Cloud Cluster', cost: 6000, baseCost: 6000, count: 0, benefit: 200.0, type: 'sec', desc: '+200.0 LoC/s' }
];

hiEl.textContent = formatNumber(peakLoc) + " LoC";

// Format helper
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return Math.floor(num);
}

// Click listener on Canvas
gCanvas.addEventListener('click', (e) => {
  if (!gameActive) return;
  const rect = gCanvas.getBoundingClientRect();
  const scaleX = gCanvas.width / rect.width;
  const scaleY = gCanvas.height / rect.height;
  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;

  // Check click on Core (Left side: center x: 225, y: 225)
  const coreX = 225;
  const coreY = 225;
  const coreRadius = 85;
  const dx = mouseX - coreX;
  const dy = mouseY - coreY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  if (dist <= coreRadius) {
    loc += clickPower;
    corePulse = 0.85; // Click scale pulse
    floatingTexts.push({
      x: mouseX,
      y: mouseY,
      text: `+${clickPower} LoC`,
      alpha: 1.0,
      vy: -2,
      color: '#00f2fe'
    });
    updateHUD();
    return;
  }

  // Check click on Shop Buttons (Right side: X is 470 to 770)
  if (mouseX >= 470 && mouseX <= 770) {
    shopItems.forEach((item, index) => {
      const btnY = 55 + index * 75;
      const btnH = 65;
      if (mouseY >= btnY && mouseY <= btnY + btnH) {
        if (loc >= item.cost) {
          loc -= item.cost;
          item.count++;
          if (item.type === 'click') {
            clickPower += item.benefit;
          } else {
            locPerSec += item.benefit;
          }
          item.cost = Math.floor(item.baseCost * Math.pow(1.15, item.count));
          updateHUD();
          
          floatingTexts.push({
            x: mouseX,
            y: mouseY,
            text: `Hired/Upgraded!`,
            alpha: 1.0,
            vy: -1.5,
            color: '#00ff87'
          });
        } else {
          // Play click fail alert text
          floatingTexts.push({
            x: mouseX,
            y: mouseY,
            text: `Insufficient Code!`,
            alpha: 1.0,
            vy: -1.5,
            color: '#ff007f'
          });
        }
      }
    });
  }
});

// Hover tracking
gCanvas.addEventListener('mousemove', (e) => {
  if (!gameActive) return;
  const rect = gCanvas.getBoundingClientRect();
  const scaleX = gCanvas.width / rect.width;
  const scaleY = gCanvas.height / rect.height;
  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;
  
  if (mouseX >= 470 && mouseX <= 770) {
    let found = false;
    shopItems.forEach((item, index) => {
      const btnY = 55 + index * 75;
      const btnH = 65;
      if (mouseY >= btnY && mouseY <= btnY + btnH) {
        hoverIndex = index;
        found = true;
      }
    });
    if (!found) hoverIndex = -1;
  } else {
    hoverIndex = -1;
  }
});

startBtn.addEventListener('click', startNewGame);

function startNewGame() {
  loc = 0;
  locPerSec = 0;
  clickPower = 1;
  floatingTexts = [];
  
  shopItems.forEach(item => {
    item.count = 0;
    item.cost = item.baseCost;
  });
  
  gameActive = true;
  updateHUD();
  overlay.classList.add('hidden');
  
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

function updateHUD() {
  scoreEl.textContent = formatNumber(loc) + " LoC";
  rateEl.textContent = locPerSec.toFixed(1) + " LoC/s";
  
  if (loc > peakLoc) {
    peakLoc = Math.floor(loc);
    localStorage.setItem('founder_game_hi', peakLoc);
    hiEl.textContent = formatNumber(peakLoc) + " LoC";
  }
}

function gameLoop(time) {
  if (!gameActive) return;

  const dt = (time - lastTime) / 1000;
  lastTime = time;

  // Add automated production
  if (locPerSec > 0) {
    loc += locPerSec * dt;
    updateHUD();
  }

  // Restore pulse scale
  corePulse += (1.0 - corePulse) * 0.1;

  // Update floating texts
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const txt = floatingTexts[i];
    txt.y += txt.vy;
    txt.alpha -= 0.02;
    if (txt.alpha <= 0) {
      floatingTexts.splice(i, 1);
    }
  }

  drawGame();
  requestAnimationFrame(gameLoop);
}

function drawGame() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

  // Divider Line
  gCtx.strokeStyle = 'rgba(255,255,255,0.06)';
  gCtx.lineWidth = 1;
  gCtx.beginPath();
  gCtx.moveTo(450, 0);
  gCtx.lineTo(450, gCanvas.height);
  gCtx.stroke();

  // LEFT ZONE: Server database clicks
  // Cyber grid
  gCtx.strokeStyle = 'rgba(0, 242, 254, 0.02)';
  for (let i = 0; i < 450; i += 30) {
    gCtx.beginPath();
    gCtx.moveTo(i, 0);
    gCtx.lineTo(i, gCanvas.height);
    gCtx.stroke();
  }
  for (let i = 0; i < gCanvas.height; i += 30) {
    gCtx.beginPath();
    gCtx.moveTo(0, i);
    gCtx.lineTo(450, i);
    gCtx.stroke();
  }

  const cx = 225;
  const cy = 225;
  const size = 80 * corePulse;

  // Outer Glowing Core Ring
  gCtx.shadowBlur = 20;
  gCtx.shadowColor = 'rgba(0, 242, 254, 0.6)';
  gCtx.strokeStyle = 'rgba(0, 242, 254, 0.8)';
  gCtx.lineWidth = 3;
  gCtx.beginPath();
  gCtx.arc(cx, cy, size + 10, 0, Math.PI * 2);
  gCtx.stroke();

  // Core fill server shapes
  gCtx.fillStyle = 'rgba(13, 18, 30, 0.8)';
  gCtx.beginPath();
  gCtx.arc(cx, cy, size, 0, Math.PI * 2);
  gCtx.fill();

  // Cyber Server cylinders
  gCtx.shadowBlur = 0;
  gCtx.fillStyle = '#00f2fe';
  gCtx.fillRect(cx - 35, cy - 25, 70, 10);
  gCtx.fillRect(cx - 35, cy - 5, 70, 10);
  gCtx.fillRect(cx - 35, cy + 15, 70, 10);
  
  // Glowing system indicators
  gCtx.fillStyle = '#00ff87';
  gCtx.beginPath();
  gCtx.arc(cx - 20, cy - 20, 2.5, 0, Math.PI * 2);
  gCtx.arc(cx - 20, cy, 2.5, 0, Math.PI * 2);
  gCtx.arc(cx - 20, cy + 20, 2.5, 0, Math.PI * 2);
  gCtx.fill();

  // Core code label text
  gCtx.fillStyle = '#f3f4f6';
  gCtx.font = "11px 'JetBrains Mono', monospace";
  gCtx.textAlign = 'center';
  gCtx.fillText("DATABASE CORE", cx, cy - 35);
  gCtx.fillText("TAP TO CODE", cx, cy + 42);

  // RIGHT ZONE: Upgrade Shop
  gCtx.fillStyle = '#f3f4f6';
  gCtx.font = "bold 14px 'Bricolage Grotesque', sans-serif";
  gCtx.textAlign = 'left';
  gCtx.fillText("AUTOMATION & WORKFORCE SHOP", 470, 30);

  shopItems.forEach((item, index) => {
    const btnY = 55 + index * 75;
    const btnH = 65;
    const btnW = 300;
    const isHovered = hoverIndex === index;
    const canAfford = loc >= item.cost;

    // Draw button background
    gCtx.fillStyle = isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(22, 28, 45, 0.3)';
    gCtx.strokeStyle = canAfford 
      ? (isHovered ? '#00f2fe' : 'rgba(0, 242, 254, 0.3)') 
      : 'rgba(255, 255, 255, 0.08)';
    gCtx.lineWidth = 1;

    gCtx.beginPath();
    gCtx.roundRect(470, btnY, btnW, btnH, 8);
    gCtx.fill();
    gCtx.stroke();

    // Render item details
    gCtx.fillStyle = canAfford ? '#f3f4f6' : 'rgba(243, 244, 246, 0.4)';
    gCtx.font = "bold 13px 'Bricolage Grotesque', sans-serif";
    gCtx.fillText(item.name, 485, btnY + 23);

    gCtx.fillStyle = canAfford ? 'rgba(0, 242, 254, 0.85)' : 'rgba(0, 242, 254, 0.3)';
    gCtx.font = "11px 'JetBrains Mono', monospace";
    gCtx.fillText(item.desc, 485, btnY + 45);

    // Render price tag
    gCtx.textAlign = 'right';
    gCtx.fillStyle = canAfford ? '#00ff87' : '#ff007f';
    gCtx.font = "bold 12px 'JetBrains Mono', monospace";
    gCtx.fillText(`${item.cost} LoC`, 755, btnY + 23);

    // Purchased Count
    gCtx.fillStyle = '#a1a1aa';
    gCtx.font = "11px 'JetBrains Mono', monospace";
    gCtx.fillText(`Own: ${item.count}`, 755, btnY + 45);
    gCtx.textAlign = 'left'; // reset alignment
  });

  // Render floating texts
  floatingTexts.forEach(txt => {
    gCtx.fillStyle = txt.color || '#fff';
    gCtx.globalAlpha = txt.alpha;
    gCtx.font = "bold 13px 'JetBrains Mono', monospace";
    gCtx.fillText(txt.text, txt.x, txt.y);
  });
  gCtx.globalAlpha = 1.0; // Reset alpha
}

/* ==========================================================================
   LEADERBOARD SYSTEM SIMULATION
   ========================================================================== */
function initLeaderboard() {
  let existing = localStorage.getItem('game_leaderboard');
  if (!existing) {
    localStorage.setItem('game_leaderboard', JSON.stringify([]));
  }
  renderLeaderboard();
}

function renderLeaderboard() {
  const lbList = document.getElementById('lb-list');
  if (!lbList) return;
  
  const list = JSON.parse(localStorage.getItem('game_leaderboard')) || [];
  lbList.innerHTML = '';
  
  if (list.length === 0) {
    const li = document.createElement('li');
    li.style = 'text-align: center; color: var(--text-secondary); font-style: italic; padding: 12px; font-size: 13px;';
    li.textContent = 'No high scores recorded yet. Submit your first valuation to top the board!';
    lbList.appendChild(li);
    return;
  }
  
  list.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'lb-item';
    li.style = 'display: flex; justify-content: space-between; padding: 6px 12px; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.02); border-radius: 4px;';
    li.innerHTML = `<div><span style="color:var(--accent-cyan); font-weight:bold; margin-right:12px;">#${index+1}</span> <span>${item.name}</span></div> <span style="color:var(--accent-green); font-weight:bold;">${formatNumber(item.score)} LoC</span>`;
    lbList.appendChild(li);
  });
}

function setupLeaderboardInteractivity() {
  const submitValBtn = document.getElementById('g-submit-score');
  const saveScoreBtn = document.getElementById('save-score-btn');
  const clearLbBtn = document.getElementById('clear-leaderboard');
  const overlay = document.getElementById('g-overlay');
  
  if (submitValBtn) {
    submitValBtn.addEventListener('click', () => {
      if (!gameActive) return;
      
      // Pause clicker game loop
      gameActive = false;
      
      // Open overlay panel in save-score mode
      overlay.classList.remove('hidden');
      document.getElementById('g-title').textContent = "Save Valuation Milestone";
      document.getElementById('g-msg').textContent = "Write your codebase size to the lifetime Top Shippers leaderboard. Submit to lock in your score and prestige (rebooting the database core to level up!).";
      
      // Reveal score input fields
      document.getElementById('save-score-form').style.display = 'block';
      document.getElementById('final-loc-score').textContent = formatNumber(Math.floor(loc));
      document.getElementById('g-start').style.display = 'none';
      document.getElementById('g-legend').style.display = 'none';
    });
  }

  if (saveScoreBtn) {
    saveScoreBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('player-name-input');
      const name = nameInput.value.trim() || "Anonymous Dev";
      
      // Load current leaderboard array
      let list = JSON.parse(localStorage.getItem('game_leaderboard')) || [];
      list.push({ name: name.substring(0, 15), score: Math.floor(loc) });
      
      // Sort descending and cap top 5
      list.sort((a, b) => b.score - a.score);
      list = list.slice(0, 5);
      
      // Save permanently to localStorage
      localStorage.setItem('game_leaderboard', JSON.stringify(list));
      
      // Reset input fields
      nameInput.value = "";
      
      // Re-render display panel
      renderLeaderboard();
      
      // Hide submit form and restore overlay elements
      document.getElementById('save-score-form').style.display = 'none';
      document.getElementById('g-start').style.display = 'inline-flex';
      document.getElementById('g-legend').style.display = 'block';
      
      // Prestige Reset game variables
      loc = 0;
      locPerSec = 0;
      clickPower = 1;
      shopItems.forEach(item => {
        item.count = 0;
        item.cost = item.baseCost;
      });
      updateHUD();
      
      // Restore start titles and close overlay
      document.getElementById('g-title').textContent = "Prestige Complete!";
      document.getElementById('g-msg').textContent = "Your score has been saved. Boot up servers to begin the next codebase expansion.";
      overlay.classList.add('hidden');
      
      // Resume game loops
      gameActive = true;
      lastTime = performance.now();
      requestAnimationFrame(gameLoop);
    });
  }

  if (clearLbBtn) {
    clearLbBtn.addEventListener('click', () => {
      if (confirm("Reset the leaderboard? This will permanently delete all saved high scores.")) {
        localStorage.removeItem('game_leaderboard');
        initLeaderboard();
      }
    });
  }
}

/* ==========================================================================
   3D HOLOGRAM GLOBE RENDERING
   ========================================================================== */
const holoCanvas = document.getElementById('hologram-canvas');
if (holoCanvas) {
  const hCtx = holoCanvas.getContext('2d');
  const width = holoCanvas.width;
  const height = holoCanvas.height;
  const cx = width / 2;
  const cy = height / 2;
  
  let globePoints = [];
  const totalPoints = 150;
  const sphereRadius = 110;
  
  let rotX = 0.003;
  let rotY = 0.003;
  let targetRotX = 0.003;
  let targetRotY = 0.003;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  // Initialize points uniformly distributed on a sphere (Fibonacci lattice)
  const phi = Math.PI * (3. - Math.sqrt(5.));
  for (let i = 0; i < totalPoints; i++) {
    const y = 1 - (i / (totalPoints - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    globePoints.push({
      x: x * sphereRadius,
      y: y * sphereRadius,
      z: z * sphereRadius
    });
  }

  // Mouse Drag Events
  holoCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      
      targetRotY = deltaX * 0.005;
      targetRotX = -deltaY * 0.005;
      
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    } else {
      const rect = holoCanvas.getBoundingClientRect();
      const mouseX = e.clientX - (rect.left + rect.width / 2);
      const mouseY = e.clientY - (rect.top + rect.height / 2);
      targetRotY = mouseX * 0.00003;
      targetRotX = -mouseY * 0.00003;
    }
  });

  // Render loop
  function drawHologram() {
    hCtx.clearRect(0, 0, width, height);

    rotX += (targetRotX - rotX) * 0.05;
    rotY += (targetRotY - rotY) * 0.05;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    globePoints.forEach(p => {
      let x1 = p.x * cosY - p.z * sinY;
      let z1 = p.z * cosY + p.x * sinY;
      let y2 = p.y * cosX - z1 * sinX;
      let z2 = z1 * cosX + p.y * sinX;
      p.x = x1; p.y = y2; p.z = z2;
    });

    const projected = globePoints.map(p => {
      const fov = 350;
      const scale = fov / (fov + p.z);
      return {
        x: cx + p.x * scale,
        y: cy + p.y * scale,
        z: p.z,
        scale: scale
      };
    });

    // Mesh lines
    hCtx.lineWidth = 0.5;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        let p1 = projected[i];
        let p2 = projected[j];
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 45) {
          const depthAlpha = (1 - (p1.z + p2.z) / (sphereRadius * 2)) * 0.15;
          hCtx.strokeStyle = `rgba(0, 242, 254, ${depthAlpha * 0.35})`;
          hCtx.beginPath();
          hCtx.moveTo(p1.x, p1.y);
          hCtx.lineTo(p2.x, p2.y);
          hCtx.stroke();
        }
      }
    }

    // Dots
    projected.forEach(p => {
      const depthAlpha = (1 - p.z / sphereRadius) / 2;
      const radius = p.scale * 1.8;
      
      hCtx.shadowBlur = p.z < 0 ? 8 : 0;
      hCtx.shadowColor = 'rgba(0, 242, 254, 0.8)';
      hCtx.fillStyle = p.z < 0 
        ? `rgba(0, 242, 254, ${0.4 + depthAlpha * 0.5})`
        : `rgba(157, 78, 221, ${0.2 + depthAlpha * 0.4})`;
        
      hCtx.beginPath();
      hCtx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      hCtx.fill();
    });
    
    hCtx.shadowBlur = 0;
    requestAnimationFrame(drawHologram);
  }

  requestAnimationFrame(drawHologram);
}
