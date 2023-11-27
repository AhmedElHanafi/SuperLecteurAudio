export class RemixTable extends HTMLElement {  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      .player {
        width: 400px;
        background: #333;
        color: #fff;
        padding: 20px;
        border-radius: 4px;
        }
        .cover {
        width: 100px;
        float: left;
        }
        .cover img {
        width: 100%;
        border-radius: 2px;
        }
        .controls {
        float: left;
        width: calc(100% - 100px);
        padding-left: 20px;
        
        }
        .title,
        .artist {
        margin-bottom: 5px;
        }
        .buttons {
        margin-bottom: 10px;
        }
        .buttons button {
        width: 30px;
        height: 30px;
        border: none;
        background: transparent;
        color: #fff;
        cursor: pointer;
        
        }
        .timeline {
        height: 4px;
        width: 100%;
        background: #666;
        border-radius: 2px;
        margin-bottom: 10px;
        position: relative;
        }
        .progress {
        height: 4px;
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
        }
      </style>
      <div class="player"> 
      <div class="controls">
        <div class="title">
            Song Title
        </div>

        <div class="artist">
            Artist Name
        </div>

        <div class="buttons">

        <button class="prev">
            <i class="fas fa-backward"></i>  
        </button>

        <button class="play">
            <i class="fas fa-play"></i>  
        </button>

        <button class="next">  
            <i class="fas fa-forward"></i>
        </button>

        </div>

        <div class="timeline">
        <div class="progress">
            <span class="thumb"></span>
        </div>

        <span class="duration">3:47</span>
        </div>
        </div> 
        </div> 
      `;
    }
  
    connectedCallback() {
    }
    
  
    defineListeners() {
        const audio = document.getElementById('audio');
        const remix_1 = document.getElementById('remix-1');
        const duration_1 = document.getElementById('duration-1');
        const remix_2 = document.getElementById('remix-2');
        const duration_2 = document.getElementById('duration-2');
        const playPause = document.getElementById('play-pause');
        let playing = false;
        let playTime = 0;
        
        remix_1.addEventListener('click', function() {
            playPause.innerHTML = 'Play';
            playing = false;
            playTime = 0;
            audio.src = '../assets/CleanGuitarRiff.mp3';
            audio.currentTime = playTime;
            duration_1.innerHTML = '00:00';
            duration_2.innerHTML = '00:00';
        });
        
        remix_2.addEventListener('click', function() {
            playPause.innerHTML = 'Play';
            playing = false;
            playTime = 0;
            audio.src = '../assets/CleanGuitarRiff_2.mp3';
            audio.currentTime = playTime;
            duration_1.innerHTML = '00:00';
            duration_2.innerHTML = '00:00';
        });
        
        playPause.addEventListener('click', function() {
            console.log("click play");
            if (playing) {
                audio.pause();
                playing = false;
                playPause.innerHTML = 'Play';
            } else {
                audio.play();
                playing = true;
                playPause.innerHTML = 'Pause';
                setInterval(function() {
                    playTime = audio.currentTime;
                    let minutes = Math.floor(playTime / 60);
                    let seconds = Math.floor(playTime - minutes * 60);
                    if (seconds < 10) {
                        seconds = '0' + seconds;
                    }
                    duration_1.innerHTML = minutes + ':' + seconds;
                    duration_2.innerHTML = minutes + ':' + seconds;
                }, 1000);
            }
        });
        
  }
}
  customElements.define('remix-table', RemixTable);
  