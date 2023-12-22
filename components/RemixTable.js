// RemixTable.js
export class RemixTable extends HTMLElement {
    constructor() {
        super();
        this.playlist = [
            'assets/CleanGuitarRiff.mp3',
            'assets/Ssendu.mp3',
            // Ajoutez d'autres morceaux au besoin
        ];
        
        this.currentTrackIndex = 0;
        this.attachShadow({ mode: 'open' });

        
        this.playing = false;
        this.defineListeners = this.defineListeners.bind(this);

        // Ajoutez les propriétés pour les filtres et le gain
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.volumeControl = this.audioContext.createGain();

        // Connectez les nœuds audio

        this.volumeControl.connect(this.audioContext.destination);

        // Utilisez les valeurs par défaut
        this.volumeControl.gain.value = 0.5; // Valeur entre 0 et 1

        this.shadowRoot.innerHTML = `

            <style>
                /* Ajoutez vos styles pour le lecteur ici */
                .player {
                    
                    width: 100%; /* Take up 100% of the width */
                    height: 45vh; /* Cover the entire height of the window */
                    background: #333;
                    color: #fff;
                    padding: 20px;
                    border-radius: 1.5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 2; /* Make sure the RemixTable is above the music-vision */
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

            <div class="player remix-table">
                <audio id="audio" controls>
                    <source src='${this.playlist[0]}' type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
              <music-vision id="visualization"></music-vision>
                <div class="controls">
                    <button id="play-pause">Play</button>
                    <button id="rewind">Rewind</button>
                    <button id="fast-forward">Fast Forward</button>
                    <button id="next-track">Next Track</button>
                </div>

                <div class="timeline">
                    <div class="progress">
                        <span class="thumb"></span>
                    </div>
                </div>

                <span class="duration">0:00</span>
                <div class="equilizer">
                <br>
                <div>
                    <webaudio-knob id="volumeSlider" src="../assets/knobs/knob-1.png" min="0" max="100" value="50"></webaudio-knob>
                </div>
            </div>
            </div>
        `;
    }

    get audioElement() {
        return this.shadowRoot.querySelector('#audio');
    }

    connectedCallback() {
        
        this.defineListeners();
        document.addEventListener('playSong', (event) => {
            this.playAudio(event.detail.src);

            // Ajoutez une vérification avant d'appeler startVisualization
            if (this.musicVision && typeof this.musicVision.startVisualization === 'function') {
                this.musicVision.startVisualization();
            } else {
                console.log("La fonction startVisualization n'est pas définie sur music-vision.");
            }

            this.dispatchEvent(new CustomEvent('trackChanged', { detail: { src: event.detail.src } }));
        });
    }

    playNextTrack() {
        if (this.currentTrackIndex < this.playlist.length - 1) {
            this.currentTrackIndex++;
        } else {
            this.currentTrackIndex = 0;
        }
        this.playAudio(this.playlist[this.currentTrackIndex]);
    }
    
    playAudio(src) {
        const audio = this.shadowRoot.querySelector('#audio');
        audio.src = src;

        // Mettez à jour cette ligne pour utiliser le contexte audio
        this.volumeControl.connect(this.volumeControl);
        
        audio.addEventListener('canplaythrough', () => {
            audio.play();
            this.playing = true;
            if(this.playing)
                this.shadowRoot.querySelector('#play-pause').innerHTML = 'Pause';
        });

        audio.load();
    }

    
    defineListeners() {
        const audio = this.shadowRoot.querySelector('#audio');
        const playPause = this.shadowRoot.querySelector('#play-pause');
        const rewindButton = this.shadowRoot.querySelector('#rewind');
        const fastForwardButton = this.shadowRoot.querySelector('#fast-forward');
        const nextTrackButton = this.shadowRoot.querySelector('#next-track');
        const volumeSlider = this.shadowRoot.querySelector('#volumeSlider');

        nextTrackButton.addEventListener('click', () => {
            this.playNextTrack();
        });

        audio.addEventListener('ended', () => {
            this.playNextTrack();
        });

        playPause.addEventListener('click', () => {
            if (this.playing) {
                audio.pause();
                this.playing = false;
                playPause.innerHTML = 'Play';
            } else {
                audio.play();
                this.playing = true;
                playPause.innerHTML = 'Pause';
            }
        });

        rewindButton.addEventListener('click', () => {
            audio.currentTime -= 10;
        });

        fastForwardButton.addEventListener('click', () => {
            audio.currentTime += 10;
        });

        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            const thumb = this.shadowRoot.querySelector('.thumb');
            const duration = this.shadowRoot.querySelector('.duration');
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime - minutes * 60);
            const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            this.shadowRoot.querySelector('.progress').style.width = `${progress}%`;
            thumb.style.left = `${progress}%`;
            duration.innerHTML = formattedTime;
        });
        // give me the code to increase and decrease the volume 
        volumeSlider.addEventListener('input', () => {
            const vol = volumeSlider.value / 100;
            audio.volume = vol;
            });
    }
}

customElements.define('remix-table', RemixTable);
