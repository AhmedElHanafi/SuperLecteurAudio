// Vision.js

    export class Vision extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML =  this.shadowRoot.innerHTML = `
            <style>
                canvas {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    z-index: 1; /* Place le canevas au-dessus du lecteur audio */
                }
            </style>
            <canvas id="visualization"></canvas>
        `;
            this.canvas = this.shadowRoot.querySelector('#visualization');
            this.context = this.canvas.getContext('2d');
            this.analyser = null;
            this.animationFrameId = null;
            this.audioElement = null;
    
            // Move the logic to the constructor
            const remixTable = document.querySelector('remix-table');
            if (remixTable) {
                this.audioElement = remixTable.shadowRoot.querySelector('#audio');
                if (this.audioElement) {
                    this.initVisualization();
                    this.startVisualization();
                } else {
                    console.error("L'élément audio n'a pas été trouvé dans le lecteur RemixTable.");
                }
            } else {
                console.error("L'élément remix-table n'a pas été trouvé.");
            }
        }

    startVisualization() {
        // Démarrer la visualisation
        if (this.analyser) {
            this.animationFrameId = requestAnimationFrame(() => this.drawVisualization());
        }
    }

    stopVisualization() {
        // Arrêter la visualisation
        cancelAnimationFrame(this.animationFrameId);
    }

    connectedCallback() {
        this.audioElement = this.closest('remix-table').shadowRoot.querySelector('#audio');

        if (this.audioElement) {
            // Add an event listener for a user gesture (e.g., click)
            document.addEventListener('click', () => {
                // Now, within this event listener, create the AudioContext
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.context = audioContext;

                // Initialize the visualization
                this.initVisualization();
                this.startVisualization();
            });
        } else {
            console.error("L'élément audio n'a pas été trouvé dans le lecteur RemixTable.");
        }
    }

    initVisualization() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = audioContext.createAnalyser();

        const source = audioContext.createMediaElementSource(this.audioElement);
        source.connect(this.analyser);
        this.analyser.connect(audioContext.destination);

        this.analyser.fftSize = 256;
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            this.analyser.getByteFrequencyData(dataArray);
            this.drawVisualization(dataArray);
            this.animationFrameId = requestAnimationFrame(draw);
        };

        draw();
    }
   
    drawVisualization(dataArray) {
        if (dataArray && dataArray.length) {
            const width = window.innerWidth;  // Use the window width
            const height = window.innerHeight;  // Use the window height

            this.canvas.width = width;
            this.canvas.height = height;

            this.context.clearRect(0, 0, width, height);
            this.context.fillStyle = 'rgba(255, 255, 255, 0.0)';
            this.context.fillRect(0, 0, width, height);

            const barWidth = (width / dataArray.length) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {
                barHeight = dataArray[i] * 2;

                this.context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                this.context.fillRect(x, height - barHeight / 2, barWidth, barHeight);

                x += barWidth + 1;
            }
        }
    }



    startVisualization() {
        // Démarrer la visualisation
        if (this.analyser) {
            this.animationFrameId = requestAnimationFrame(() => this.drawVisualization());
        }
    }

    stopVisualization() {
        // Arrêter la visualisation
        cancelAnimationFrame(this.animationFrameId);
    }
}

customElements.define('music-vision', Vision);