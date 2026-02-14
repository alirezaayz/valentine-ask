// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const letterWindow = document.querySelector(".letter-window");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Audio Elements
const bgAudio = document.getElementById("bg-audio"); // وقتی لینک باز میشه
const openLetterAudio = document.getElementById("open-letter-audio"); // وقتی نامه باز میشه
const yesAudio = document.getElementById("yes-audio"); // وقتی Yes زده میشه

// Safety checks
if (
  !envelope ||
  !letter ||
  !letterWindow ||
  !noBtn ||
  !yesBtn ||
  !title ||
  !catImg ||
  !buttons ||
  !finalText
) {
  console.error("Some elements were not found. Check your HTML IDs/classes.");
}

// ---------- Helper: Stop All Audio ----------
function stopAllAudio() {
  [bgAudio, openLetterAudio, yesAudio].forEach((audio) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });
}

// ---------- Helper: Play One Audio ----------
function playExclusive(audio) {
  if (!audio) return;
  stopAllAudio();
  audio.play().catch(() => {
    // مرورگر ممکنه autoplay رو بلاک کنه
  });
}

// ---------- وقتی لینک باز میشه ----------
window.addEventListener("load", () => {
  playExclusive(bgAudio);
});

// اگر autoplay بلاک شد، با اولین تعامل پلی کن
document.addEventListener(
  "pointerdown",
  () => {
    if (bgAudio && bgAudio.paused) {
      playExclusive(bgAudio);
    }
  },
  { once: true }
);

// ---------- Click Envelope ----------
envelope?.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    letterWindow.classList.add("open");
  }, 50);

  // آهنگ دوم
  playExclusive(openLetterAudio);
});

// ---------- حرکت دکمه NO ----------
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function moveNoButton() {
  const minDist = 140;
  const maxDist = 260;

  const distance = Math.random() * (maxDist - minDist) + minDist;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  const maxX = window.innerWidth / 3;
  const maxY = window.innerHeight / 4;

  const safeX = clamp(moveX, -maxX, maxX);
  const safeY = clamp(moveY, -maxY, maxY);

  noBtn.style.transition = "transform 0.25s ease";
  noBtn.style.transform = `translate(${safeX}px, ${safeY}px)`;
}

noBtn?.addEventListener("pointerenter", moveNoButton);

noBtn?.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false }
);

// ---------- YES Click ----------
yesBtn?.addEventListener("click", () => {
  title.textContent = "عاخجوووون🥳";
  catImg.src = "cat_dance.gif";
  letterWindow.classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";

  // آهنگ سوم
  playExclusive(yesAudio);
});
