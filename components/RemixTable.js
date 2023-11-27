export class RemixTable extends HTMLElement {
    constructor() {
        super();
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
                }

                audio {
                    width: 100%;
                }

                .controls {
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
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
                }

                button:hover {
                    background-color: #12763c;
                }

                .timeline {
                    margin-top: 20px;
                    height: 4px;
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
                }
            </style>

            <div class="player">
                <audio id="audio" controls>
                    <source src="" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>

                <div class="controls">
                    <button id="remix-1">Load Remix 1</button>
                    <button id="remix-2">Load Remix 2</button>
                    <button id="play-pause">Play</button>
                </div>

                <div class="timeline">
                    <div class="progress">
                        <span class="thumb"></span>
                    </div>
                    <span class="duration">0:00</span>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.defineListeners();
    }

    defineListeners() {
        const audio = this.shadowRoot.querySelector('#audio');
        const remix1 = this.shadowRoot.querySelector('#remix-1');
        const remix2 = this.shadowRoot.querySelector('#remix-2');
        const playPause = this.shadowRoot.querySelector('#play-pause');

        remix1.addEventListener('click', () => {
            this.playing = false;
            playPause.innerHTML = 'Play';
            audio.src = '../assets/CleanGuitarRiff.mp3';
            audio.load();
            audio.play();
        });

        remix2.addEventListener('click', () => {
            this.playing = false;
            playPause.innerHTML = 'Play';
            audio.src = '../assets/CleanGuitarRiff_2.mp3';
            audio.load();
            audio.play();
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

