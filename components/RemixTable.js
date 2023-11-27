export class RemixTable extends HTMLElement {
    constructor() {
        super();
        this.playlist = [
            '../assets/CleanGuitarRiff.mp3',
            '../assets/Ssendu.mp3',
            // Ajoutez d'autres morceaux au besoin
        ];
        this.currentTrackIndex = 0;
        this.attachShadow({ mode: 'open' });
        this.playing = false;
        this.defineListeners = this.defineListeners.bind(this);
        this.shadowRoot.innerHTML = `
            <style>
                .player {
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                    background: #333;
                    color: #fff;
                    padding: 20px;
                    border-radius: 4px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                audio {
                    width: 100%;
                }

                .controls {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-around; /* Espacement équitable des boutons */
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
            </style>

            <div class="player remix-table">
                <audio id="audio" controls>
              
                    <source src='../assets/CleanGuitarRiff.mp3' type="audio/mp3">
                    <source src='../assets/Ssendu.mp3' type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>

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
                
            </div>
        `;
    }

    connectedCallback() {
        this.defineListeners();
        document.addEventListener('playSong', (event) => {
            this.playAudio(event.detail.src);
        });
    }
    playNextTrack() {
        // Vérifier si nous ne sommes pas à la fin de la liste
        if (this.currentTrackIndex < this.playlist.length - 1) {
            this.currentTrackIndex++;
        } else {
            // Si nous sommes à la fin, revenir au début
            this.currentTrackIndex = 0;
        }

        // Charger et jouer le morceau suivant
        this.playAudio(this.playlist[this.currentTrackIndex]);
    }
    playAudio(src) {
        const audio = this.shadowRoot.querySelector('#audio');
        audio.src = src;
        audio.load();
        audio.play();
        this.playing = true;
        this.shadowRoot.querySelector('#play-pause').innerHTML = 'Pause';
    }

    defineListeners() {
        const audio = this.shadowRoot.querySelector('#audio');
        const playPause = this.shadowRoot.querySelector('#play-pause');
        const rewindButton = this.shadowRoot.querySelector('#rewind');
        const fastForwardButton = this.shadowRoot.querySelector('#fast-forward');
        const nextTrackButton = this.shadowRoot.querySelector('#next-track');
        
        nextTrackButton.addEventListener('click', () => {
            this.playNextTrack();
        });
        
        audio.addEventListener('ended', () => {
            // Lorsque le morceau se termine, passer au suivant
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
            audio.currentTime -= 10; // Rewind by 10 seconds
        });

        fastForwardButton.addEventListener('click', () => {
            audio.currentTime += 10; // Fast forward by 10 seconds
        });

        nextTrackButton.addEventListener('click', () => {
            // Implement logic to switch to the next track
            // For example: audio.src = 'next_track.mp3';
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
    }
}

customElements.define('remix-table', RemixTable);
