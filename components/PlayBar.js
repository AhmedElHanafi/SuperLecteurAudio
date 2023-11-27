export class PlayBar extends HTMLElement {  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      .player {
        display: flex;
        align-items: center;
      }
      
      .controls {
        display: flex;  
      }
      .volume {
        margin-left: 20px;
        height: 100px;
        width: 5px;  
      }
      
      input[type=range][orient=vertical] {
        appearance: slider-vertical;
        width: 8px;
        height: 90%;
        padding: 0 5px;
    }    
      </style>
      <div class="player">
      <h1> Equilizer</h1>

        <input type="range" min="1" max="100" value="50" class="slider" id="myRange1" orient="vertical">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange2" orient="vertical">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" orient="vertical">
      </div>
      `;
    }
  
    connectedCallback() {
    }
  
    defineListeners() {
    }
  }
  
  customElements.define('play-bar', PlayBar);
  