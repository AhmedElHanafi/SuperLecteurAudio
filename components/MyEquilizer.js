export class MyEquilizer extends HTMLElement {
    constructor() {
        super();
        // Liste des fichiers audio dans la playlist
        this.playlist = [
            'assets/CleanGuitarRiff.mp3',
            'assets/Ssendu.mp3',
            // Ajoutez d'autres morceaux au besoin
        ];

        // Index du morceau en cours de lecture
        this.currentTrackIndex = 1;

        // Contexte audio et nœuds nécessaires pour l'égaliseur
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        // État du lecteur audio
        this.playing = false;

        // Fonctions liées à l'objet Equilizer
        this.defineListeners = this.defineListeners.bind(this);
        this.loadAndPlayTrack = this.loadAndPlayTrack.bind(this);
        this.updateTimeline = this.updateTimeline.bind(this);

        // Création du Shadow DOM pour l'encapsulation du style
        this.attachShadow({ mode: 'open' });

        // Structure HTML de l'égaliseur
        this.shadowRoot.innerHTML = `
            <style>
                /* Ajoutez vos styles pour le lecteur ici */
                .equilizer {
                    width: 100%;
                    height: 45vh;
                    background: #333;
                    color: #fff;
                    padding: 20px;
                    border-radius: 1.5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                audio {
                    width: 100%;
                }

                .controls {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                button {
                    background-color: #1ed760;
                    color: #fff;
                    border: none;
                    padding: 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    font-size: 14px;
                }

                button:hover {
                    background-color: #12763c;
                }

                .timeline {
                    margin-top: 20px;
                    height: 4px;
                    width: 100%;
                    background: #666;
                    border-radius: 2px;
                    position: relative;
                }

                .progress {
                    height: 100%;
                    width: 0;
                    background: #1ed760;
                    border-radius: 2px;
                    transition: width 0.2s linear;
                }

                .thumb {
                    width: 16px;
                    height: 16px;
                    border: 4px solid #333;
                    background: #1ed760;
                    border-radius: 50%;
                    position: absolute;
                    left: 0;
                    top: -6px;
                    cursor: pointer;
                }

                .duration {
                    font-size: 12px;
                    display: block;
                    margin-top: 10px;
                    color: #ccc;
                }

                canvas {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    z-index: 1;
                }
            </style>

            <div class="equilizer">
                <audio controls></audio>
                <div class="controls">
                    <button id="playPauseBtn">Play</button>
                </div>
                <div class="timeline">
                    <div class="progress"></div>
                    <div class="thumb"></div>
                </div>
                <span class="duration">0:00 / 0:00</span>
                <canvas id="visualizer"></canvas>
            </div>
        `;
    }

    connectedCallback() {
        // Initialise les écouteurs d'événements
        this.defineListeners();
        // Charge et joue le premier morceau de la playlist
        this.loadAndPlayTrack();
        // Ajoutez l'initialisation des filtres
        this.initFilters();

        // Ajoutez des éléments interactifs pour contrôler l'égaliseur
        this.addEqualizerControls();
    }

    addEqualizerControls() {
        // Récupérez le Shadow DOM
        const shadow = this.shadowRoot;

        // Créez un curseur pour le filtre passe-haut
        const highPassSlider = document.createElement('input');
        highPassSlider.type = 'range';
        highPassSlider.min = 0;
        highPassSlider.max = 10000; // Vous pouvez ajuster la valeur maximale selon vos besoins
        highPassSlider.value = this.highPassFilter.frequency.value; // Valeur initiale
        highPassSlider.addEventListener('input', () => {
            this.highPassFilter.frequency.value = parseFloat(highPassSlider.value);
        });
        // Créez un curseur pour le filtre passe-bas
        const lowPassSlider = document.createElement('input');
        lowPassSlider.type = 'range';
        lowPassSlider.min = 0;
        lowPassSlider.max = 10000; // Vous pouvez ajuster la valeur maximale selon vos besoins
        lowPassSlider.value = this.lowPassFilter.frequency.value; // Valeur initiale
        lowPassSlider.addEventListener('input', () => {
            this.lowPassFilter.frequency.value = parseFloat(lowPassSlider.value);
        });

        // Ajoutez les curseurs à l'interface utilisateur
        const controlsDiv = shadow.querySelector('.controls');
        controlsDiv.appendChild(highPassSlider);
        controlsDiv.appendChild(lowPassSlider);

        // Créez un bouton pour activer/désactiver le filtre passe-bande
        const bandPassBtn = document.createElement('button');
        bandPassBtn.textContent = 'Toggle BandPass';
        bandPassBtn.addEventListener('click', () => {
            this.toggleFilter(this.bandPassFilter);
        });

        // Créez un bouton pour activer/désactiver le filtre coupe-bande
        const notchBtn = document.createElement('button');
        notchBtn.textContent = 'Toggle Notch';
        notchBtn.addEventListener('click', () => {
            this.toggleFilter(this.notchFilter);
        });

        // Ajoutez les boutons à l'interface utilisateur
        controlsDiv.appendChild(bandPassBtn);
        controlsDiv.appendChild(notchBtn);

        // Créez un curseur pour le contrôle du volume
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = 0;
        volumeSlider.max = 1; // Valeur maximale du volume
        volumeSlider.step = 0.05; // Incréments du volume
        volumeSlider.value = this.volumeNode.gain.value; // Valeur initiale
        volumeSlider.addEventListener('input', () => {
            this.volumeNode.gain.value = parseFloat(volumeSlider.value);
        });

        // Ajoutez le curseur de volume à l'interface utilisateur
        controlsDiv.appendChild(volumeSlider);
    }

    // Fonction pour activer/désactiver un filtre
    toggleFilter(filter) {
        filter.disconnect(); // Déconnecte le filtre actuel
        const isFilterConnected = filter.connect(this.analyser); // Connecte ou déconnecte le filtre
        if (isFilterConnected) {
            console.log(`${filter.type} filter activated.`);
        } else {
            console.log(`${filter.type} filter deactivated.`);
        }
    }

    initFilters() {
        // Créez un filtre passe-haut
        this.highPassFilter = this.audioContext.createBiquadFilter();
        this.highPassFilter.type = 'highpass';
        this.highPassFilter.frequency.value = 1000; // Fréquence de coupure du passe-haut

        // Créez un filtre passe-bas
        this.lowPassFilter = this.audioContext.createBiquadFilter();
        this.lowPassFilter.type = 'lowpass';
        this.lowPassFilter.frequency.value = 8000; // Fréquence de coupure du passe-bas

        // Connectez les filtres en série
        this.gainNode.connect(this.highPassFilter);
        this.highPassFilter.connect(this.lowPassFilter);
        this.lowPassFilter.connect(this.analyser);

        // Créez un filtre passe-bande
        this.bandPassFilter = this.audioContext.createBiquadFilter();
        this.bandPassFilter.type = 'bandpass';
        this.bandPassFilter.frequency.value = 3000; // Fréquence centrale du passe-bande
        this.bandPassFilter.Q.value = 1; // Facteur de qualité du passe-bande

        // Créez un filtre coupe-bande
        this.notchFilter = this.audioContext.createBiquadFilter();
        this.notchFilter.type = 'notch';
        this.notchFilter.frequency.value = 5000; // Fréquence centrale du coupe-bande
        this.notchFilter.Q.value = 1; // Facteur de qualité du coupe-bande

        // Connectez les filtres en série
        this.lowPassFilter.connect(this.bandPassFilter);
        this.bandPassFilter.connect(this.notchFilter);
        this.notchFilter.connect(this.analyser);

        // Créez un nœud de gain pour le contrôle du volume
        this.volumeNode = this.audioContext.createGain();
        this.notchFilter.connect(this.volumeNode);
        this.volumeNode.connect(this.audioContext.destination);
    }

    // Initialise les écouteurs d'événements
    defineListeners() {
        const playPauseBtn = this.shadowRoot.getElementById('playPauseBtn');
        playPauseBtn.addEventListener('click', this.togglePlayPause.bind(this));

        const audioElement = this.shadowRoot.querySelector('audio');
        audioElement.addEventListener('timeupdate', this.updateTimeline);

        const thumb = this.shadowRoot.querySelector('.thumb');
        thumb.addEventListener('mousedown', this.handleThumbDrag.bind(this));
    }

    // Charge et joue un morceau de la playlist
    async loadAndPlayTrack() {
        const audioElement = this.shadowRoot.querySelector('audio');
        const audioBuffer = await this.loadAudio(this.playlist[this.currentTrackIndex]);
        
        // Utilisez un nœud AudioBufferSourceNode pour la lecture audio
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = audioBuffer;

        // Connectez le nœud AudioBufferSourceNode au nœud de gain (volumeNode)
        this.source.connect(this.gainNode);

        // Connectez le nœud de gain au filtre passe-haut
        this.gainNode.connect(this.highPassFilter);

        // Connectez le reste des filtres en série
        this.highPassFilter.connect(this.lowPassFilter);
        this.lowPassFilter.connect(this.bandPassFilter);
        this.bandPassFilter.connect(this.notchFilter);
        this.notchFilter.connect(this.analyser);

        // Connectez finalement le nœud de gain au nœud de volumeNode
        this.gainNode.connect(this.volumeNode);

        // Connectez le nœud de volumeNode à la destination audio
        this.volumeNode.connect(this.audioContext.destination);

        // Commencez la lecture audio
        this.source.start();
        }

    // Charge un fichier audio et retourne le buffer audio
    async loadAudio(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await this.audioContext.decodeAudioData(arrayBuffer);
    }

    // Gère la lecture/pause du morceau
    togglePlayPause() {
        if (this.playing) {
            this.audioContext.suspend();
            this.playing = false;
            this.shadowRoot.getElementById('playPauseBtn').innerText = 'Play';
        } else {
            this.audioContext.resume();
            this.playing = true;
            this.shadowRoot.getElementById('playPauseBtn').innerText = 'Pause';
        }
    }

    // Met à jour la barre de progression de la timeline
    updateTimeline() {
        const audioElement = this.shadowRoot.querySelector('audio');
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        this.shadowRoot.querySelector('.progress').style.width = `${progress}%`;
    }

    // Gère le déplacement du pouce (thumb) pour changer la position de lecture
    handleThumbDrag(event) {
        const thumb = this.shadowRoot.querySelector('.thumb');
        const timeline = this.shadowRoot.querySelector('.timeline');

        const onMouseMove = (e) => {
            const newPosition = e.clientX - timeline.getBoundingClientRect().left;
            const percentage = (newPosition / timeline.offsetWidth) * 100;

            if (percentage >= 0 && percentage <= 100) {
                thumb.style.left = `${percentage}%`;
                this.audioContext.currentTime = (percentage / 100) * this.source.buffer.duration;
                this.updateTimeline();
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
}

// Définition de l'élément personnalisé
customElements.define('my-equilizer', MyEquilizer);
