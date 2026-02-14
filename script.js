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

// Safety checks (اگر چیزی پیدا نشد، بی‌صدا خراب نشه)
if (!envelope || !letter || !letterWindow || !noBtn || !yesBtn || !title || !catImg || !buttons || !finalText) {
  console.error("Some elements were not found. Check your HTML IDs/classes.");
}

// Click Envelope
envelope?.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    letterWindow.classList.add("open");
  }, 50);
});

// Helper: clamp number inside range
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Move NO button (works on desktop + mobile)
function moveNoButton() {
  // Distance range (واقعی‌تر از min=max)
  const minDist = 140;
  const maxDist = 260;

  const distance = Math.random() * (maxDist - minDist) + minDist;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  // جلوگیری از پریدن بیرون صفحه: محدوده را با ابعاد پنجره می‌بندیم
  // این روش ساده‌ست: حرکت را محدود می‌کنیم که خیلی دور نره
  const maxX = window.innerWidth / 3;
  const maxY = window.innerHeight / 4;

  const safeX = clamp(moveX, -maxX, maxX);
  const safeY = clamp(moveY, -maxY, maxY);

  noBtn.style.transition = "transform 0.25s ease";
  noBtn.style.transform = `translate(${safeX}px, ${safeY}px)`;
}

// Desktop hover
noBtn?.addEventListener("pointerenter", moveNoButton);

// Mobile touch
noBtn?.addEventListener("touchstart", (e) => {
  // جلوگیری از کلیک/اسکرول عجیب روی موبایل
  e.preventDefault();
  moveNoButton();
}, { passive: false });

// YES is clicked
yesBtn?.addEventListener("click", () => {
  // متن بعد از Yes
  title.textContent = "عاخجوووون🥳";

  // گیف نهایی
  catImg.src = "cat_dance.gif";

  // حالت نهایی برای کوچک شدن گربه (طبق CSS)
  letterWindow.classList.add("final");

  // مخفی کردن دکمه‌ها
  buttons.style.display = "none";

  // نمایش متن آخر
  finalText.style.display = "block";
});
