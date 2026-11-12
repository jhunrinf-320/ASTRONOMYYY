
const planetFacts = {
  Mercury: ["The smallest planet", "Mercury is the smallest planet in our solar system and races around the Sun in just 88 Earth days."],
  Venus: ["Earth's bright neighbour", "Venus is the hottest planet in our solar system because its thick atmosphere traps heat."],
  Earth: ["Our pale blue home", "Earth is the only world we currently know to support life. Its oceans cover about 71% of its surface."],
  Mars: ["The red planet", "Mars gets its rusty colour from iron minerals in its soil. It has the tallest known volcano in the solar system."],
  Jupiter: ["King of the planets", "Jupiter is the largest planet in our solar system. Its Great Red Spot is a giant storm."],
  Saturn: ["The ringed wonder", "Saturn's rings are made mostly of countless pieces of ice and rock."],
  Uranus: ["The sideways planet", "Uranus rotates on its side, giving it some of the most extreme seasons in the solar system."],
  Neptune: ["The distant blue world", "Neptune is the most distant major planet from the Sun. Its winds can reach supersonic speeds."]
};

const info = document.querySelector("#planet-info");

document.querySelectorAll(".planet-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".planet-button").forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const name = button.dataset.planet;

    info.innerHTML = `
      <div class="info-symbol">✦</div>
      <div>
        <p class="eyebrow">${planetFacts[name][0].toUpperCase()}</p>
        <h3>${name}</h3>
        <p>${planetFacts[name][1]}</p>
      </div>`;
  });
});

// Constellation explorer
const constellationStories = {
  orion: "Orion is one of the most recognizable constellations. Its three bright stars form Orion's Belt, with Betelgeuse and Rigel marking the hunter's shoulder and foot.",
  ursa: "Ursa Major means Great Bear. Its famous Big Dipper pattern is an asterism within the constellation. Two stars at the edge of the bowl point toward Polaris, the North Star.",
  cassiopeia: "Cassiopeia is easy to spot by its distinctive W shape. In Greek mythology, Cassiopeia was a queen. It circles the North Star."
};

const detail = document.querySelector("#constellation-detail");

document.querySelectorAll(".constellation-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".constellation-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    detail.innerHTML = `
      <span>✦</span>
      <p>${constellationStories[card.dataset.constellation]}</p>`;
  });
});

// Moon phase explorer
const phaseNames = [
  ["New Moon", "The Moon is between Earth and the Sun, so its illuminated side faces away from us."],
  ["Waxing Crescent", "A slim crescent of sunlight becomes visible. Waxing means the lit portion is growing."],
  ["First Quarter", "We see half of the Moon's near side illuminated."],
  ["Waxing Gibbous", "More than half is illuminated as the Moon approaches its full phase."],
  ["Full Moon", "The Moon's near side is fully illuminated."],
  ["Waning Gibbous", "After full Moon, the illuminated portion begins to shrink."],
  ["Last Quarter", "Half of the Moon's near side is illuminated again."],
  ["Waning Crescent", "A thin crescent remains before the cycle returns to new Moon."]
];

const slider = document.querySelector("#moon-slider");
const moonDay = document.querySelector("#moon-day");
const moonName = document.querySelector("#moon-name");
const moonDesc = document.querySelector("#moon-description");
const moonDisc = document.querySelector("#moon-disc");

function updateMoon() {
  const day = Number(slider.value);
  const angle = (day / 29.53) * Math.PI * 2;
  const illumination = (1 - Math.cos(angle)) / 2;

  let index;
  if (day < 1.5 || day > 27.5) index = 0;
  else if (day < 5.5) index = 1;
  else if (day < 9.5) index = 2;
  else if (day < 13.5) index = 3;
  else if (day < 16.5) index = 4;
  else if (day < 20.5) index = 5;
  else if (day < 24.5) index = 6;
  else index = 7;

  moonDay.textContent = day;
  moonName.textContent = phaseNames[index][0];
  moonDesc.textContent = phaseNames[index][1];

  // Approximate the illuminated portion using a sliding shadow.
  const shadow = day <= 14
    ? (1 - illumination) * 100
    : illumination * 100;

  moonDisc.style.setProperty("--shadow-x", `${shadow}%`);
}

slider.addEventListener("input", updateMoon);

document.querySelector("#moon-prev").addEventListener("click", () => {
  slider.value = Math.max(0, Number(slider.value) - 1);
  updateMoon();
});

document.querySelector("#moon-next").addEventListener("click", () => {
  slider.value = Math.min(29, Number(slider.value) + 1);
  updateMoon();
});

updateMoon();

// Animated starfield
function makeStarfield() {
  const canvas = document.querySelector("#starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = Array.from({ length: 110 }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      r: Math.random() * 1.3 + .25,
      a: Math.random() * .65 + .2
    }));
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    stars.forEach(star => {
      star.a += (Math.random() - .5) * .012;
      star.a = Math.max(.12, Math.min(.9, star.a));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225,232,255,${star.a})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  draw();
}

makeStarfield();

// Shooting star wish
const wishSky = document.querySelector("#wish-sky");
const wishFeedback = document.querySelector("#wish-feedback");
const wishButton = document.querySelector("#wish-button");

let wishCount = 0;

wishButton.addEventListener("click", () => {
  const star = document.createElement("span");
  star.className = "shooting";
  star.textContent = "✦";

  wishSky.appendChild(star);
  wishCount++;

  wishFeedback.textContent = wishCount === 1
    ? "A little wish, carried into the cosmos. ✨"
    : "Another wish sent into the stars. Keep hoping. ✨";

  setTimeout(() => star.remove(), 1600);
});
