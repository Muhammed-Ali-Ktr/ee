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
            "Bir oyun oynayalım mı? 🎮 (Oyun butonuna bas)",
            "Ve şimdi... kalbimdeki en derin sırrı paylaşma zamanı 💕",
            "Sen benim kalbimin tek sahibi, ruhunun tek eşisin... Seni sonsuza kadar seveceğim 💖✨"
        ];

        let current = 0;
        const page = document.getElementById("page");
        const message = document.getElementById("message");
        const nextBtn = document.getElementById("nextBtn");
        const progress = document.getElementById("progress");
        const musicBtn = document.getElementById("musicBtn");
        const gameBtn = document.getElementById("gameBtn");
        const effectBtn = document.getElementById("effectBtn");
        
        let isPlaying = false;
        let audio;
        let gameActive = false;

        // Oyun değişkenleri
        let heartScore = 0;
        let memoryScore = 0;
        let memoryCards = [];
        let flippedCards = [];

        // Bildirim göster
        function showNotification(text) {
            const notification = document.getElementById('notification');
            notification.textContent = text;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Müzik kontrolü
        musicBtn.addEventListener("click", () => {
            if (!isPlaying) {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                playRomanticMelody(audioContext);
                showNotification("🎵 Romantik melodi çalıyor...");
                isPlaying = true;
            }
        });

        function playRomanticMelody(audioContext) {
            const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00];
            const melody = [0, 2, 4, 2, 1, 0, 2, 4, 5, 4, 2, 1, 0, 2, 4, 5];
            
            melody.forEach((noteIndex, i) => {
                setTimeout(() => {
                    playNote(audioContext, notes[noteIndex], 0.8);
                }, i * 500);
            });
            
            setTimeout(() => { isPlaying = false; }, melody.length * 500);
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

        // Oyun kontrolü
        gameBtn.addEventListener("click", () => {
            showGameMenu();
        });

        function showGameMenu() {
            const games = ['heartCatchGame', 'memoryGame', 'drawingGame'];
            const randomGame = games[Math.floor(Math.random() * games.length)];
            document.getElementById(randomGame).classList.add('game-active');
            gameActive = true;
            
            if (randomGame === 'memoryGame') {
                startMemoryGame();
            }
        }

        function closeGame() {
            document.querySelectorAll('.game-container').forEach(game => {
                game.classList.remove('game-active');
            });
            gameActive = false;
        }

        // Kalp yakalama oyunu
        let heartGameInterval;
        
        function startHeartGame() {
            heartScore = 0;
            document.getElementById('heartScore').textContent = heartScore;
            document.getElementById('heartGameArea').innerHTML = '';
            
            heartGameInterval = setInterval(() => {
                createFallingHeart();
            }, 1000);
            
            setTimeout(() => {
                clearInterval(heartGameInterval);
                showNotification(`🎉 Oyun bitti! Skor: ${heartScore}`);
            }, 15000);
        }

        function createFallingHeart() {
            const gameArea = document.getElementById('heartGameArea');
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.innerHTML = ['💖', '💕', '💘', '💗'][Math.floor(Math.random() * 4)];
            heart.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
            
            heart.addEventListener('click', () => {
                heartScore += 10;
                document.getElementById('heartScore').textContent = heartScore;
                heart.remove();
                createCelebrationBurst(heart.offsetLeft, heart.offsetTop);
            });
            
            gameArea.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 3000);
        }

        // Hafıza oyunu
        function startMemoryGame() {
            const symbols = ['💖', '💕', '💘', '💗', '💝', '💟', '❤️', '🌹'];
            const gameSymbols = [...symbols, ...symbols];
            gameSymbols.sort(() => Math.random() - 0.5);
            
            const grid = document.getElementById('memoryGrid');
            grid.innerHTML = '';
            memoryCards = [];
            flippedCards = [];
            memoryScore = 0;
            document.getElementById('memoryScore').textContent = memoryScore;
            
            gameSymbols.forEach((symbol, index) => {
                const card = document.createElement('button');
                card.className = 'memory-card';
                card.dataset.symbol = symbol;
                card.dataset.index = index;
                card.innerHTML = '?';
                
                card.addEventListener('click', () => flipCard(card));
                grid.appendChild(card);
                memoryCards.push(card);
            });
        }

        function flipCard(card) {
            if (card.classList.contains('flipped') || flippedCards.length >= 2) return;
            
            card.classList.add('flipped');
            card.innerHTML = card.dataset.symbol;
            flippedCards.push(card);
            
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.symbol === card2.dataset.symbol) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                memoryScore++;
                document.getElementById('memoryScore').textContent = memoryScore;
                
                if (memoryScore === 8) {
                    showNotification('🎉 Tebrikler! Tüm eşleşmeleri buldun!');
                    createMassiveSparkleShow();
                }
            } else {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.innerHTML = '?';
                card2.innerHTML = '?';
            }
            
            flippedCards = [];
        }

        // Çizim oyunu
        let isDrawing = false;
        const canvas = document.getElementById('drawCanvas');
        const ctx = canvas.getContext('2d');

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);

        function startDrawing(e) {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        }

        function draw(e) {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            ctx.strokeStyle = '#ff6b81';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
        }

        function stopDrawing() {
            isDrawing = false;
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawHeart() {
            clearCanvas();
            ctx.fillStyle = '#ff6b81';
            ctx.beginPath();
            
            const x = canvas.width / 2;
            const y = canvas.height / 2 - 20;
            const width = 60;
            const height = 50;
            
            // Kalp şekli çiz
            ctx.moveTo(x, y + height / 4);
            ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + height / 4);
            ctx.bezierCurveTo(x - width / 2, y + height / 2, x, y + height, x, y + height);
            ctx.bezierCurveTo(x, y + height, x + width / 2, y + height / 2, x + width / 2, y + height / 4);
            ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + height / 4);
            ctx.fill();
        }

        // Efekt kontrolü
        effectBtn.addEventListener("click", () => {
            createRandomEffect();
        });

        function createRandomEffect() {
            const effects = [
                () => createMassiveHeartRain(),
                () => createSparkleShow(),
                () => createFloatingBubbles(),
                () => createRainbowTrail(),
                () => createStarExplosion()
            ];
            
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            randomEffect();
            showNotification('✨ Sihirli efekt aktifleştirildi!');
        }

        // Sayfa değiştirme
        nextBtn.addEventListener("click", () => {
            if (gameActive) {
                showNotification('🎮 Önce oyunu kapatın!');
                return;
            }
            
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
                    
                    // Özel mesajlar için özel efektler
                    if (current === 9) { // Oyun mesajı
                        createGamePromptEffect();
                    }
                }, 300);
                
                createSparkles();
                createPageTurnEffect();
            } else {
                showFinalScene();
            }
        });

        function updateProgress() {
            const progressPercent = (current / (messages.length - 1)) * 100;
            progress.style.width = progressPercent + '%';
        }

        function createPageTurnEffect() {
            const book = document.querySelector('.book');
            book.style.transform = 'rotateY(10deg) scale(0.98)';
            setTimeout(() => {
                book.style.transform = '';
            }, 300);
        }

        function createGamePromptEffect() {
            gameBtn.style.animation = 'buttonPulse 0.5s ease-in-out 5';
            gameBtn.style.boxShadow = '0 0 30px rgba(255, 107, 129, 0.8)';
            setTimeout(() => {
                gameBtn.style.boxShadow = '';
            }, 3000);
        }

        function showFinalScene() {
            nextBtn.style.display = "none";
            document.body.style.background = "linear-gradient(-45deg, #ff6b81, #ffd3e1, #ffb3d9, #ff8fab)";
            document.body.style.backgroundSize = "400% 400%";
            
            setTimeout(() => {
                createMassiveHeartRain();
                createSparkleShow();
                createFireworks();
                showNotification('💖 Seni sonsuza kadar seviyorum!');
            }, 500);
        }

        // Efekt fonksiyonları
        function createSparkles() {
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
                    sparkle.style.left = Math.random() * 100 + '%';
                    sparkle.style.top = Math.random() * 100 + '%';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 3000);
                }, i * 150);
            }
        }

        function createMassiveHeartRain() {
            const hearts = ["💖", "💕", "💘", "💗", "💓", "💝", "💟", "❤️", "🌹", "✨", "⭐", "💫"];
            
            for (let i = 0; i < 80; i++) {
                setTimeout(() => {
                    const heart = document.createElement("div");
                    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    heart.style.position = "fixed";
                    heart.style.left = Math.random() * 100 + "vw";
                    heart.style.top = "-10vh";
                    heart.style.fontSize = (1.5 + Math.random() * 2.5) + "rem";
                    heart.style.animation = `fall ${2 + Math.random() * 4}s ease-in forwards`;
                    heart.style.zIndex = "1000";
                    heart.style.pointerEvents = "none";
                    document.body.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.parentNode.removeChild(heart);
                        }
                    }, 6000);
                }, i * 80);
            }
        }

        function createSparkleShow() {
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.innerHTML = ['✨', '⭐', '💫', '🌟', '💥'][Math.floor(Math.random() * 5)];
                    sparkle.style.position = 'fixed';
                    sparkle.style.left = Math.random() * 100 + 'vw';
                    sparkle.style.top = Math.random() * 100 + 'vh';
                    sparkle.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
                    sparkle.style.animation = 'sparkle 4s ease-in-out infinite';
                    sparkle.style.zIndex = '1001';
                    sparkle.style.pointerEvents = 'none';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => {
                        if (sparkle.parentNode) {
                            sparkle.parentNode.removeChild(sparkle);
                        }
                    }, 12000);
                }, i * 200);
            }
        }

        function createMassiveSparkleShow() {
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.innerHTML = '🎉';
                    sparkle.style.position = 'fixed';
                    sparkle.style.left = Math.random() * 100 + 'vw';
                    sparkle.style.top = Math.random() * 100 + 'vh';
                    sparkle.style.fontSize = '2rem';
                    sparkle.style.animation = 'sparkle 2s ease-in-out infinite';
                    sparkle.style.zIndex = '1002';
                    sparkle.style.pointerEvents = 'none';
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => sparkle.remove(), 5000);
                }, i * 100);
            }
        }

        function createFloatingBubbles() {
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const bubble = document.createElement('div');
                    bubble.style.position = 'fixed';
                    bubble.style.width = (20 + Math.random() * 40) + 'px';
                    bubble.style.height = bubble.style.width;
                    bubble.style.background = 'rgba(255, 182, 193, 0.3)';
                    bubble.style.borderRadius = '50%';
                    bubble.style.left = Math.random() * 100 + 'vw';
                    bubble.style.bottom = '-50px';
                    bubble.style.animation = `bubbleFloat ${3 + Math.random() * 4}s ease-in forwards`;
                    bubble.style.zIndex = '999';
                    bubble.style.pointerEvents = 'none';
                    document.body.appendChild(bubble);
                    
                    setTimeout(() => bubble.remove(), 7000);
                }, i * 300);
            }
        }

        function createRainbowTrail() {
            const colors = ['#ff9a9e', '#fecfef', '#ffd3e1', '#ffb3d9', '#ff8fab'];
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const trail = document.createElement('div');
                    trail.style.position = 'fixed';
                    trail.style.width = '4px';
                    trail.style.height = '100vh';
                    trail.style.background = colors[i % colors.length];
                    trail.style.left = (i * 7) + '%';
                    trail.style.top = '0';
                    trail.style.animation = 'rainbowMove 3s ease-in-out forwards';
                    trail.style.zIndex = '998';
                    trail.style.pointerEvents = 'none';
                    document.body.appendChild(trail);
                    
                    setTimeout(() => trail.remove(), 3000);
                }, i * 100);
            }
        }

        function createStarExplosion() {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            for (let i = 0; i < 24; i++) {
                const star = document.createElement('div');
                star.innerHTML = '⭐';
                star.style.position = 'fixed';
                star.style.left = centerX + 'px';
                star.style.top = centerY + 'px';
                star.style.fontSize = '1.5rem';
                star.style.zIndex = '1003';
                star.style.pointerEvents = 'none';
                
                const angle = (i * 15) * Math.PI / 180;
                const distance = 200;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                star.style.animation = `starExplode 2s ease-out forwards`;
                star.style.setProperty('--endX', endX + 'px');
                star.style.setProperty('--endY', endY + 'px');
                
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 2000);
            }
        }

        function createFireworks() {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * (window.innerHeight / 2);
                    createSingleFirework(x, y);
                }, i * 800);
            }
        }

        function createSingleFirework(x, y) {
            const colors = ['#ff6b81', '#ffd700', '#ff9a9e', '#87ceeb', '#98fb98'];
            const particles = ['✨', '⭐', '💫', '🌟', '💥'];
            
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
                particle.style.position = 'fixed';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.fontSize = '1.5rem';
                particle.style.zIndex = '1004';
                particle.style.pointerEvents = 'none';
                
                const angle = (i * 30) * Math.PI / 180;
                const velocity = 50 + Math.random() * 100;
                const endX = x + Math.cos(angle) * velocity;
                const endY = y + Math.sin(angle) * velocity;
                
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                });
                
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }
        }

        function createCelebrationBurst(x, y) {
            for (let i = 0; i < 8; i++) {
                const burst = document.createElement('div');
                burst.innerHTML = '💖';
                burst.style.position = 'absolute';
                burst.style.left = x + 'px';
                burst.style.top = y + 'px';
                burst.style.fontSize = '1rem';
                burst.style.zIndex = '1000';
                burst.style.pointerEvents = 'none';
                
                const angle = (i * 45) * Math.PI / 180;
                const distance = 30;
                const endX = x + Math.cos(angle) * distance;
                const endY = y + Math.sin(angle) * distance;
                
                burst.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });
                
                document.getElementById('heartCatchGame').appendChild(burst);
                setTimeout(() => burst.remove(), 800);
            }
        }

        // Sürekli arka plan efektleri
        function createFloatingHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = Math.random() > 0.5 ? '💕' : '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 8 + 's';
            heart.style.animationDuration = (6 + Math.random() * 4) + 's';
            
            document.getElementById('floatingHearts').appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 12000);
        }

        function createFloatingStar() {
            const star = document.createElement('div');
            star.className = 'star';
            star.innerHTML = ['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)];
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDelay = Math.random() * 3 + 's';
            
            document.getElementById('floatingStars').appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 8000);
        }

        // Sürekli efektler
        setInterval(createFloatingHeart, 3000);
        setInterval(createFloatingStar, 4000);

        // Ek animasyon stilleri
        const additionalStyles = document.createElement('style');
        additionalStyles.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(110vh) rotate(720deg);
                    opacity: 0;
                }
            }
            
            @keyframes bubbleFloat {
                to {
                    transform: translateY(-110vh);
                    opacity: 0;
                }
            }
            
            @keyframes rainbowMove {
                from { transform: translateX(-100px); opacity: 0; }
                50% { opacity: 1; }
                to { transform: translateX(100vw); opacity: 0; }
            }
            
            @keyframes starExplode {
                to {
                    transform: translate(var(--endX), var(--endY)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(additionalStyles);

        // İlk progress güncellemesi
        updateProgress();
        
        // Başlangıç efekti
        setTimeout(() => {
            createSparkles();
        }, 1000);
