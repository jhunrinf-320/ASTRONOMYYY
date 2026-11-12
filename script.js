// ==========================================
// 1. INTRO SCREEN
// ==========================================

const intro = document.getElementById("intro");

document.getElementById("enterBtn").addEventListener("click", () => {
  intro.classList.add("hidden");
});


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});


// ==========================================
// 3. SCROLL PROGRESS
// ==========================================

const progressBar = document.getElementById("progress");

function updateProgress() {
  const total =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = total > 0
    ? (window.scrollY / total) * 100
    : 0;

  progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

updateProgress();


// ==========================================
// 4. ANIMATED STARFIELD
// ==========================================

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let canvasWidth = 0;
let canvasHeight = 0;
let animationFrame = null;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  canvas.width = canvasWidth * ratio;
  canvas.height = canvasHeight * ratio;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const starCount = Math.min(
    220,
    Math.floor((canvasWidth * canvasHeight) / 6500)
  );

  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 1.3 + 0.2,
    alpha: Math.random() * 0.7 + 0.2,
    speed: Math.random() * 0.004 + 0.001
  }));

  if (animationFrame === null) {
    drawStars();
  }
}

function drawStars() {
  if (document.hidden) {
    animationFrame = null;
    return;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  stars.forEach(star => {
    star.alpha += star.speed;

    if (star.alpha > 0.95 || star.alpha < 0.15) {
      star.speed *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230,230,255,${star.alpha})`;
    ctx.fill();
  });

  animationFrame = requestAnimationFrame(drawStars);
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && animationFrame === null) {
    drawStars();
  }
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


// ==========================================
// 5. PLANET EXPLORER
// ==========================================

const planetFacts = {
  Mercury:
    "Mercury is the smallest planet and the closest to the Sun. A year there lasts only 88 Earth days.",

  Venus:
    "Venus is the hottest planet in our solar system. Its thick atmosphere traps heat in an intense greenhouse effect.",

  Earth:
    "Earth is the only world we currently know to support life. Its oceans cover about 71% of its surface.",

  Mars:
    "Mars is a cold desert world with giant volcanoes and ancient river valleys. Scientists are searching for signs of past life.",

  Jupiter:
    "Jupiter is the largest planet. Its Great Red Spot is a gigantic storm that has been observed for centuries.",

  Saturn:
    "Saturn's beautiful rings are made mostly of countless pieces of ice and rock.",

  Uranus:
    "Uranus rotates almost on its side, making its seasons very unusual. It is an ice giant with a blue-green color.",

  Neptune:
    "Neptune is a distant ice giant with incredibly powerful winds. It takes about 165 Earth years to orbit the Sun."
};

const planetCards = document.querySelectorAll(".planet-card");

planetCards.forEach(card => {
  card.addEventListener("click", () => {
    planetCards.forEach(item => item.classList.remove("active"));

    card.classList.add("active");

    const name = card.dataset.planet;

    document.getElementById("planetTitle").textContent = name;

    document.getElementById("planetDescription").textContent =
      planetFacts[name];
  });
});


// ==========================================
// 6. CONSTELLATION EXPLORER
// ==========================================

const constellations = {
  Orion: {
    description:
      "Orion is one of the most recognizable constellations. Its three aligned belt stars make it easy to spot.",

    points: [
      [100, 75],
      [165, 110],
      [220, 70],
      [185, 190],
      [260, 220],
      [300, 140]
    ],

    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
      [4, 5]
    ]
  },

  "Ursa Major": {
    description:
      "Ursa Major means Great Bear. Its seven-star Big Dipper pattern has helped people find directions in the night sky.",

    points: [
      [80, 90],
      [140, 65],
      [205, 75],
      [265, 115],
      [300, 185],
      [225, 205],
      [155, 175]
    ],

    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 0]
    ]
  },

  Cassiopeia: {
    description:
      "Cassiopeia is known for its distinctive W shape. It is named after a queen in Greek mythology.",

    points: [
      [65, 115],
      [130, 195],
      [200, 90],
      [270, 190],
      [335, 105]
    ],

    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4]
    ]
  },

  "Your Star": {
    description:
      "This little star pattern is dedicated to you. Like the stars above, may you always find your own way to shine.",

    points: [
      [95, 150],
      [145, 75],
      [200, 150],
      [255, 75],
      [310, 150],
      [200, 225]
    ],

    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
      [1, 3]
    ]
  }
};

function drawConstellation(name) {
  const data = constellations[name];

  const lines = document.getElementById("starLines");
  const points = document.getElementById("starPoints");

  lines.replaceChildren();
  points.replaceChildren();

  data.lines.forEach(([a, b]) => {
    const line = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    line.setAttribute("x1", data.points[a][0]);
    line.setAttribute("y1", data.points[a][1]);
    line.setAttribute("x2", data.points[b][0]);
    line.setAttribute("y2", data.points[b][1]);
    line.setAttribute("class", "star-line");

    lines.appendChild(line);
  });

  data.points.forEach(([x, y], index) => {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", index % 2 === 0 ? 6 : 4);
    circle.setAttribute("class", "star-point");

    points.appendChild(circle);
  });

  document.getElementById("constellationInfo").textContent =
    data.description;
}

document.querySelectorAll(".constellation-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".constellation-option").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    drawConstellation(button.dataset.constellation);
  });
});


// ==========================================
// 7. MOON PHASE EXPLORER
// ==========================================

const phases = [
  [
    "New Moon",
    "The Moon's illuminated side faces away from Earth."
  ],
  [
    "Waxing Crescent",
    "A small illuminated crescent becomes visible."
  ],
  [
    "First Quarter",
    "Half of the Moon's visible face is illuminated."
  ],
  [
    "Waxing Gibbous",
    "More than half is illuminated as the Full Moon approaches."
  ],
  [
    "Full Moon",
    "The entire visible face of the Moon is illuminated."
  ],
  [
    "Waning Gibbous",
    "The illuminated portion begins to decrease."
  ],
  [
    "Last Quarter",
    "Half of the visible face is illuminated again."
  ],
  [
    "Waning Crescent",
    "A thin crescent remains before the next New Moon."
  ]
];

const moonSlider = document.getElementById("moonSlider");
const moonShadow = document.getElementById("moonShadow");

function updateMoon() {
  const phase = Number(moonSlider.value);

  document.getElementById("moonName").textContent =
    phases[phase][0];

  document.getElementById("moonDescription").textContent =
    phases[phase][1];

  moonSlider.setAttribute("aria-valuetext", phases[phase][0]);

  const clips = [
    "inset(0 0 0 0 round 50%)",
    "ellipse(43% 50% at 72% 50%)",
    "inset(0 0 0 50% round 0 50% 50% 0)",
    "ellipse(27% 50% at 95% 50%)",
    "inset(0 0 0 100%)",
    "ellipse(27% 50% at 5% 50%)",
    "inset(0 50% 0 0 round 50% 0 0 50%)",
    "ellipse(43% 50% at 28% 50%)"
  ];

  moonShadow.style.clipPath = clips[phase];
}

moonSlider.addEventListener("input", updateMoon);

updateMoon();


// ==========================================
// 8. SHOOTING STAR WISH
// ==========================================

const wishes = [
  "May your dreams always find their way to the stars. ✨",
  "May you always have a reason to look forward to tomorrow. 🌙",
  "Never stop being curious about the universe and everything in it. ✦",
  "May your brightest days be still ahead of you. 💫",
  "May every new adventure bring you something beautiful. 🌌"
];

document.getElementById("wishBtn").addEventListener("click", () => {
  const star = document.createElement("div");

  star.className = "shooting-star";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1400);

  const randomWish =
    wishes[Math.floor(Math.random() * wishes.length)];

  document.getElementById("wishResult").textContent = randomWish;
});


// ==========================================
// 9. SECRET MESSAGE
// ==========================================

let secretClicks = 0;

document.getElementById("secretStar").addEventListener("click", () => {
  secretClicks++;

  if (secretClicks >= 3) {
    document.getElementById("secretMessage").classList.add("show");
    secretClicks = 0;
  }
});


// ==========================================
// 10. SCROLL REVEAL
// ==========================================

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});


// ==========================================
// 11. CINEMATIC FINAL SURPRISE
// ==========================================

const finalSection = document.getElementById("ending");
const finalSurprise = document.getElementById("finalSurprise");

const surpriseContent = document.getElementById("surpriseContent");
const surpriseReveal = document.getElementById("surpriseReveal");
const surpriseCountdown = document.getElementById("surpriseCountdown");
const portalContainer = document.getElementById("portalContainer");
const typedMessage = document.getElementById("typedMessage");

let surpriseOpened = false;
let surpriseTimer = null;
let countdownTimer = null;
let typingTimer = null;
let particlesTimer = null;
let rearmTimer = null;

const personalMessage = [
  "Out of all the stars in the universe,",
  "every single one has its own story.",
  "",
  "Some shine brighter.",
  "Some are far away.",
  "Some take millions of years for their light to reach us.",
  "",
  "And I hope you never forget",
  "that you have your own kind of light, too.",
  "",
  "Never stop dreaming.",
  "Never stop exploring.",
  "Never stop being wonderfully you.",
  "",
  "No matter how big the universe becomes,",
  "there will always be something special about you.",
  "",
  "Keep shining. ✨"
].join("\n");


// OPEN SURPRISE

function openSurprise() {
  if (surpriseOpened) return;

  surpriseOpened = true;

  finalSurprise.classList.add("active");
  finalSurprise.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");

  createFloatingParticles();

  document.getElementById("skipSurprise").focus();
}


// CLOSE SURPRISE

function closeSurprise() {
  finalSurprise.classList.remove("active");
  finalSurprise.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");

  clearTimeout(surpriseTimer);
  clearTimeout(rearmTimer);
  clearInterval(countdownTimer);
  clearInterval(typingTimer);
  clearInterval(particlesTimer);

  surpriseTimer = null;
  countdownTimer = null;
  typingTimer = null;
  particlesTimer = null;
}


// FLOATING PARTICLES

function createFloatingParticles() {
  clearInterval(particlesTimer);

  particlesTimer = setInterval(() => {
    if (!finalSurprise.classList.contains("active")) {
      clearInterval(particlesTimer);
      particlesTimer = null;
      return;
    }

    const particle = document.createElement("span");

    particle.className = "surprise-particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.bottom = "-10px";

    const duration = 5 + Math.random() * 7;

    particle.style.setProperty("--duration", duration + "s");

    finalSurprise.appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1000);
  }, 180);
}


// STAR EXPLOSION

function createStarBurst() {
  for (let i = 0; i < 55; i++) {
    const star = document.createElement("span");

    star.className = "star-burst";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 300;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    star.style.setProperty("--x", x + "px");
    star.style.setProperty("--y", y + "px");

    finalSurprise.appendChild(star);

    setTimeout(() => star.remove(), 1600);
  }
}


// TYPEWRITER MESSAGE

function startTypewriter() {
  clearInterval(typingTimer);

  typedMessage.textContent = "";
  typedMessage.classList.add("typewriter");

  let index = 0;

  typingTimer = setInterval(() => {
    if (index < personalMessage.length) {
      typedMessage.textContent += personalMessage[index];
      index++;
    } else {
      clearInterval(typingTimer);
      typingTimer = null;
      typedMessage.classList.remove("typewriter");
    }
  }, 38);
}


// COUNTDOWN

function startCountdown() {
  surpriseContent.style.display = "none";

  portalContainer.style.transform = "scale(1.5)";
  portalContainer.style.opacity = "0";

  surpriseCountdown.style.display = "block";
  surpriseCountdown.classList.add("show");

  let count = 3;

  surpriseCountdown.textContent = count;

  clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    count--;

    if (count > 0) {
      surpriseCountdown.textContent = count;

      surpriseCountdown.classList.remove("show");
      void surpriseCountdown.offsetWidth;
      surpriseCountdown.classList.add("show");
    } else {
      clearInterval(countdownTimer);
      countdownTimer = null;

      surpriseCountdown.classList.remove("show");
      surpriseCountdown.style.display = "none";

      revealFinalMessage();
    }
  }, 1000);
}


// REVEAL MESSAGE

function revealFinalMessage() {
  createStarBurst();

  surpriseReveal.classList.add("show");

  startTypewriter();
}


// AUTOMATIC FINAL SURPRISE

const endingObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !surpriseOpened) {
      endingObserver.unobserve(finalSection);

      clearTimeout(surpriseTimer);

      surpriseTimer = setTimeout(() => {
        const rect = finalSection.getBoundingClientRect();

        const stillAtEnding =
          rect.top < window.innerHeight * 0.5 &&
          rect.bottom > 0;

        if (stillAtEnding) {
          openSurprise();
        }
      }, 1800);
    }
  });
}, {
  threshold: 0.5
});

endingObserver.observe(finalSection);


// UNLOCK BUTTON

document.getElementById("revealSurprise")
  .addEventListener("click", startCountdown);


// SKIP BUTTON

document.getElementById("skipSurprise")
  .addEventListener("click", closeSurprise);


// REPLAY BUTTON

document.getElementById("replaySurprise")
  .addEventListener("click", () => {
    closeSurprise();

    surpriseOpened = false;

    surpriseContent.style.display = "block";

    surpriseReveal.classList.remove("show");

    surpriseCountdown.classList.remove("show");
    surpriseCountdown.style.display = "none";

    portalContainer.style.opacity = "1";
    portalContainer.style.transform = "";

    typedMessage.textContent = "";

    endingObserver.unobserve(finalSection);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Re-enable the ending trigger after returning to the top.

    let rearmed = false;

    function rearm() {
      if (rearmed || window.scrollY > 20) return;

      rearmed = true;

      endingObserver.observe(finalSection);

      window.removeEventListener("scroll", rearm);
    }

    window.addEventListener("scroll", rearm, { passive: true });

    rearmTimer = setTimeout(rearm, 4000);
  });


// CANCEL PENDING SURPRISE IF VISITOR SCROLLS AWAY

window.addEventListener("scroll", () => {
  if (surpriseTimer && !surpriseOpened) {
    const rect = finalSection.getBoundingClientRect();

    if (rect.top > window.innerHeight || rect.bottom < 0) {
      clearTimeout(surpriseTimer);
      surpriseTimer = null;
    }
  }
}, { passive: true });


// KEYBOARD ESCAPE SUPPORT

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeMenu();

    if (finalSurprise.classList.contains("active")) {
      closeSurprise();
    }
  }
});
