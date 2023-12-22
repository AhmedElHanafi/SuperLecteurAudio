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
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = audioContext.createGain();
        this.analyser = audioContext.createAnalyser();
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
        this.shadowRoot.innerHTML = this.shadowRoot.innerHTML =`
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
                <div>
                    <webaudio-knob id="highPassSlider" src="../assets/knobs/knob-1.png" min="0" max="100"></webaudio-knob>
                    <webaudio-knob id="lowPassSlider" src="../assets/knobs/knob-1.png" min="0" max="100"></webaudio-knob>
                    <webaudio-knob id="volumeSlider" src="../assets/knobs/knob-1.png" min="0" max="100" value="50"></webaudio-knob>
                </div>
            </div>
        `;

        const remixTable = document.querySelector('remix-table');
            if (remixTable) {
                this.audioElement = remixTable.shadowRoot.querySelector('#audio');
                if (this.audioElement) {
                    //
                } else {
                    console.error("L'élément audio n'a pas été trouvé dans le lecteur RemixTable.");
                }
            } else {
                console.error("L'élément remix-table n'a pas été trouvé.");
            }
    }
connectedCallback() {}
}

// Définition de l'élément personnalisé
customElements.define('my-equilizer', MyEquilizer);
