export class PlayList extends HTMLElement {  
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
      <div>

                <button>Mix</button>
                <button>Boucle</button>
                <button>Playlist</button>
      </div>
          `;
    }
  
    connectedCallback() {
    }
  
    defineListeners() {
    }
  }
  
  customElements.define('play-list', PlayList);
  