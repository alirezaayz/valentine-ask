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

const audioEl = document.getElementById("bg-audio");

// --- Audio helpers ---
function stopAudio() {
  if (!audioEl) return;
  audioEl.pause();
  audioEl.currentTime = 0;
}

async function playAudio(fileName, { loop = true, volume = 0.8 } = {}) {
  if (!audioEl) return;

  // اگر همون آهنگ داره پخش میشه، دوباره ست نکن
  const newSrc = fileName;
  const currentSrc = audioEl.getAttribute("data-file");

  if (currentSrc !== newSrc) {
    stopAudio();
    audioEl.src = newSrc;
    audioEl.setAttribute("data-file", newSrc);
  }

  audioEl.loop = loop;
  audioEl.volume = volume;

  try {
    await audioEl.play();
  } catch (err) {
    // اینجا معمولاً دلیلش autoplay policy یا لود نشدن فایل است
    console.warn("Audio play blocked/failed:", err);
  }
}

// Safety checks
if (!envelope || !letter || !letterWindow || !noBtn || !yesBtn || !title || !catImg || !buttons || !finalText || !audioEl) {
  console.error("Some elements were not found. Check your HTML IDs/classes.");
}

// Helper: clamp number inside range
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Move NO button (desktop + mobile)
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

// --- Flow ---
// 1) First interaction: envelope click -> play Hello + show letter -> switch to Dracula
envelope?.addEventListener("click", async () => {
  // روی موبایل: اولین تعامل بهترین شانس برای شروع صداست
  await playAudio("Hello.mp3", { loop: true, volume: 0.8 });

  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(async () => {
    letterWindow.classList.add("open");

    // بعد از باز شدن نامه، آهنگ رو عوض کن
    await playAudio("Dracula.mp3", { loop: true, volume: 0.8 });
  }, 80);
});

// 2) Yes click -> final state + play Ophelia (no loop)
yesBtn?.addEventListener("click", async () => {
  title.textContent = "عاخجوووون🥳";
  catImg.src = "cat_dance.gif";
  letterWindow.classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";

  await playAudio("The Fate of Ophelia.mp3", { loop: false, volume: 0.9 });
});
