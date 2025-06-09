const messages = [
  "Hoş geldin, bu sana özel bir aşk mektubu... 💖",
  "Seni tanıdığım gün hayatımın en güzel dönüm noktasıydı. 🌟",
  "Gözlerin, içimi ısıtan en güzel bahar güneşi gibi... ☀️",
  "Her mesajında, her ses tonunda yeniden âşık oluyorum. 💌",
  "Seninle geçen zaman, dünyadaki tüm hazinelerden daha değerli. 🕰️",
  "Ve şimdi... son sayfadasın.",
  "Bu mektubun yazarı kalbim, konusu ise yalnızca sensin. ❤️"
];

let current = 0;
const page = document.getElementById("page");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  current++;
  if (current < messages.length) {
    message.textContent = messages[current];
    if (current === messages.length - 1) {
      nextBtn.textContent = "💖 Bitir";
    }
  } else {
    nextBtn.style.display = "none";
    message.innerHTML = "💘 Seni çok seviyorum... Sonsuza dek. 🌹";
    document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
    confetti(); // bonus efekt
  }
});

// 🎉 Basit konfeti efekti (bonus)
function confetti() {
  const hearts = ["💖", "💕", "💘", "💗", "💓"];
  for (let i = 0; i < 30; i++) {
    let el = document.createElement("div");
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-2vh";
    el.style.fontSize = "2rem";
    el.style.animation = `fall ${2 + Math.random() * 3}s ease-in infinite`;
    document.body.appendChild(el);
  }
}

const style = document.createElement('style');
style.textContent = `
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
