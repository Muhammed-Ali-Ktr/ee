const messages = [
            "Hoş geldin aşkım... Bu sana özel bir aşk mektubu 💖",
            "Seni tanıdığım gün, hayatımdaki tüm renklerin parlaklığı değişti 🌈",
            "Gözlerin, karanlık gecelerimde parlayan en güzel yıldızlar gibi ✨",
            "Her nefesinde aşkı hissediyorum, her bakışında sonsuzluğu görüyorum 💫",
            "Seninle geçen her an, kalbimde yazılan en güzel şiir 📝",
            "Ellerini tuttuğumda, tüm dünya durmuş gibi oluyor 🌍",
            "Sen benim hayallerimin ötesinde, gerçek bir mucizesin 🌟",
            "Her gülüşün, ruhumda açan binlerce çiçek gibi 🌸",
            "Seninle olmak, cennetin en güzel köşesinde yaşamak gibi 🏰",
            "Ve şimdi... kalbimdeki en derin sırrı paylaşma zamanı 💕",
            "Sen benim kalbimin tek sahibi, ruhunun tek eşisin... Seni sonsuza kadar seveceğim 💖✨"
        ];

        let current = 0;
        const page = document.getElementById("page");
        const message = document.getElementById("message");
        const nextBtn = document.getElementById("nextBtn");
        const progress = document.getElementById("progress");
        const musicBtn = document.getElementById("musicBtn");
        
        let isPlaying = false;
        let audio;

        // Müzik kontrolü
        musicBtn.addEventListener("click", () => {
            if (!audio) {
                // Basit bir melodi oluşturma (Web Audio API ile)
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                playRomanticMelody(audioContext);
            }
        });

        function playRomanticMelody(audioContext) {
            const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00]; // C, D, E, F, G, A
            const melody = [0, 2, 4, 2, 1, 0, 2, 4, 5, 4, 2, 1, 0];
            
            melody.forEach((noteIndex, i) => {
                setTimeout(() => {
                    playNote(audioContext, notes[noteIndex], 0.8);
                }, i * 400);
            });
        }

        function playNote(audioContext, frequency, duration) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }

        // Sayfa değiştirme
        nextBtn.addEventListener("click", () => {
            current++;
            updateProgress();
            
            if (current < messages.length) {
                // Çıkış animasyonu
                message.style.opacity = '0';
                message.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    message.textContent = messages[current];
                    message.style.opacity = '1';
                    message.style.transform = 'translateY(0)';
                    
                    if (current === messages.length - 1) {
                        nextBtn.innerHTML = "💖 Son Söz 💖";
                        message.classList.add('final-message');
                    }
                }, 300);
                
                createSparkles();
            } else {
                showFinalScene();
            }
        });

        function updateProgress() {
            const progressPercent = (current / (messages.length - 1)) * 100;
            progress.style.width = progressPercent + '%';
        }

        function showFinalScene() {
            nextBtn.style.display = "none";
            document.body.style.background = "linear-gradient(-45deg, #ff6b81, #ffd3e1, #ffb3d9, #ff8fab)";
            document.body.style.backgroundSize = "400% 400%";
            
            setTimeout(() => {
                createMassiveHeartRain();
                createSparkleShow();
            }, 500);
        }

        function createSparkles() {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.innerHTML = '✨';
                    sparkle.style.left = Math.random() * 100 + '%';
                    sparkle.style.top = Math.random() * 100 + '%';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 2000);
                }, i * 100);
            }
        }

        function createMassiveHeartRain() {
            const hearts = ["💖", "💕", "💘", "💗", "💓", "💝", "💟", "❤️", "🌹", "✨"];
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const heart = document.createElement("div");
                    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    heart.style.position = "fixed";
                    heart.style.left = Math.random() * 100 + "vw";
                    heart.style.top = "-10vh";
                    heart.style.fontSize = (1 + Math.random() * 2) + "rem";
                    heart.style.animation = `fall ${3 + Math.random() * 4}s ease-in forwards`;
                    heart.style.zIndex = "1000";
                    document.body.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.parentNode.removeChild(heart);
                        }
                    }, 7000);
                }, i * 100);
            }
        }

        function createSparkleShow() {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.innerHTML = '✨';
                    sparkle.style.position = 'fixed';
                    sparkle.style.left = Math.random() * 100 + 'vw';
                    sparkle.style.top = Math.random() * 100 + 'vh';
                    sparkle.style.fontSize = '2rem';
                    sparkle.style.animation = 'sparkle 3s ease-in-out infinite';
                    sparkle.style.zIndex = '1001';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => {
                        if (sparkle.parentNode) {
                            sparkle.parentNode.removeChild(sparkle);
                        }
                    }, 10000);
                }, i * 200);
            }
        }

        // Sürekli kalp yağmuru
        function createFloatingHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = Math.random() > 0.5 ? '💕' : '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            document.getElementById('floatingHearts').appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 10000);
        }

        // Her 2 saniyede bir kalp oluştur
        setInterval(createFloatingHeart, 2000);

        // Düşme animasyonu için CSS oluştur
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(110vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // İlk progress güncellemesi
        updateProgress();
