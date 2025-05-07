document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('audio');
    const muteButton = document.getElementById('muteButton');
    const startButton = document.getElementById('startButton');
    const infoButton = document.getElementById('infoButton');

    // Cargar la posición guardada
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime); // Reproducir desde la última posición guardada
    }

    // Función para reproducir el audio
    function playAudio() {
        audio.volume = 1.0; // Asegurar volumen alto
        audio.muted = false; // Asegurar que no esté en mute

        audio.play().then(() => {
            console.log("🔊 Audio reproduciéndose correctamente.");
        }).catch(error => {
            console.warn("⚠️ Error al reproducir el audio:", error);
        });

        // Remover el evento después de la primera interacción exitosa
        document.removeEventListener("click", playAudio);
    }

    // Intentar reproducir en cuanto haya cualquier interacción del usuario (por ejemplo, clic)
    document.addEventListener("click", playAudio);

    // Guardar la posición actual al pausar o cerrar la pestaña
    audio.addEventListener('timeupdate', () => {
        localStorage.setItem('audioTime', audio.currentTime);
    });

    // Limpiar la posición guardada si el audio termina
    audio.addEventListener('ended', () => {
        localStorage.removeItem('audioTime');
    });

    // Función para alternar el estado de silencio
    muteButton.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false; // Desactivar silencio
            muteButton.textContent = '🔊'; // Cambiar ícono a sonido activado
        } else {
            audio.muted = true; // Activar silencio
            muteButton.textContent = '🔇'; // Cambiar ícono a sonido silenciado
        }
    });
});

// JavaScript para detectar el scroll y agregar la clase 'visible'
document.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.animated');
    const windowHeight = window.innerHeight;

    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight) {
            element.classList.add('visible');
        }
    });
});
