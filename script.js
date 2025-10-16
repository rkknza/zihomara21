// Variables globales
let currentScreen = 'welcome-screen';
let gameScore = 0;
let gameActive = false;
let musicPlaying = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createStars();
    createFloatingHearts();
    setCurrentDate();
});

function initializeApp() {
    // Event listeners
    document.getElementById('start-btn').addEventListener('click', startHeartGame);
    document.getElementById('music-btn').addEventListener('click', toggleMusic);
    document.getElementById('surprise-btn').addEventListener('click', showSurprise);
    document.getElementById('memory-btn').addEventListener('click', showMemories);
    document.getElementById('back-to-letter').addEventListener('click', showLetter);
    document.getElementById('play-pause').addEventListener('click', toggleMusic);
    document.getElementById('close-music').addEventListener('click', closeMusic);
    
    // Game area mouse movement
    document.getElementById('game-area').addEventListener('mousemove', moveCatcher);
}

function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = ['💖', '💕', '💗', '💝'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 2000);
}

function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = today.toLocaleDateString('es-ES', options);
}

function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
        currentScreen = screenId;
    }, 300);
}

function startHeartGame() {
    switchScreen('heart-game');
    gameScore = 0;
    gameActive = true;
    updateScore();
    startFallingHearts();
}

function startFallingHearts() {
    if (!gameActive) return;
    
    const gameArea = document.getElementById('game-area');
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    heart.style.color = ['#ff69b4', '#ff1493', '#dc143c', '#ff6b6b'][Math.floor(Math.random() * 4)];
    
    heart.addEventListener('click', catchHeart);
    gameArea.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 3000);
    
    if (gameActive) {
        setTimeout(startFallingHearts, Math.random() * 1000 + 500);
    }
}

function catchHeart(event) {
    event.target.remove();
    gameScore++;
    updateScore();
    createSparkleEffect(event.clientX, event.clientY);
    
    if (gameScore >= 10) {
        gameActive = false;
        setTimeout(() => {
            showLetter();
        }, 1000);
    }
}

function updateScore() {
    document.getElementById('score').textContent = gameScore;
}

function moveCatcher(event) {
    const gameArea = document.getElementById('game-area');
    const catcher = document.getElementById('catcher');
    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    
    catcher.style.left = Math.max(30, Math.min(x - 30, gameArea.offsetWidth - 60)) + 'px';
}

function createSparkleEffect(x, y) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + (Math.random() - 0.5) * 50 + 'px';
        sparkle.style.top = y + (Math.random() - 0.5) * 50 + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

function showLetter() {
    switchScreen('letter-screen');
    animateLetterText();
}

function animateLetterText() {
    const paragraphs = document.querySelectorAll('.letter-text p');
    paragraphs.forEach((p, index) => {
        p.style.animationDelay = (index * 0.2) + 's';
    });
}

function toggleMusic() {
    const musicPlayer = document.getElementById('music-player');
    const playPauseBtn = document.getElementById('play-pause');
    
    if (!musicPlaying) {
        musicPlayer.classList.add('active');
        playPauseBtn.innerHTML = '⏸️';
        musicPlaying = true;
        // Aquí podrías agregar audio real si tienes un archivo de música
        console.log('Música iniciada');
    } else {
        playPauseBtn.innerHTML = '▶️';
        musicPlaying = false;
        console.log('Música pausada');
    }
}

function closeMusic() {
    const musicPlayer = document.getElementById('music-player');
    musicPlayer.classList.remove('active');
    musicPlaying = false;
}

function showSurprise() {
    switchScreen('surprise-screen');
    animatePhotos();
}

function animatePhotos() {
    const photos = document.querySelectorAll('.photo-frame');
    photos.forEach((photo, index) => {
        photo.style.opacity = '0';
        photo.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            photo.style.transition = 'all 0.8s ease';
            photo.style.opacity = '1';
            photo.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function showMemories() {
    // Crear efecto de recuerdos con corazones
    createMemoryEffect();
    
    setTimeout(() => {
        alert('💕 Cada momento contigo es un recuerdo que atesoro en mi corazón. Gracias por llenar mi vida de amor y felicidad. 💕');
    }, 1000);
}

function createMemoryEffect() {
    const colors = ['#ff69b4', '#ff1493', '#dc143c', '#ff6b6b', '#ffd1dc'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'pulse 2s ease-in-out';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// Efectos adicionales al hacer clic en cualquier parte
document.addEventListener('click', function(event) {
    if (Math.random() < 0.3) { // 30% de probabilidad
        createSparkleEffect(event.clientX, event.clientY);
    }
});

// Mensaje especial al cargar la página
window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('💖 Esta página fue hecha con amor para alguien muy especial 💖');
    }, 2000);
});

// Prevenir clic derecho para mantener la magia
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
