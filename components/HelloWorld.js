export class HelloWorld extends HTMLElement {  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      .row {
        display: flex;
        flex-direction: row;
        height: 33.33%;
     }
    
     .cell {
        flex: 1;
        border: 1px solid black;
        height: 200px;
     }
    
     .inner-row {
        display: flex;
        flex-direction: row;
        height: 50%;
     }
     input[type=range][orient=vertical] {
      appearance: slider-vertical;
      width: 8px;
      height: 50%;
      padding: 5px 5px;
     }
      </style>
      <h1>Super lecteur audio</h1>
      <div class="row">
        <div class="cell">
           <div class="inner-row">
             <div class="cell">
                <h1>Cell 1</h1>
                <play-bar></play-bar>
             </div>
             <div class="cell">
                <h1>Cell 2</h1>
                <button>Mix</button>
                <button>Boucle</button>
                <button>Playlist</button>
             </div>
           </div>
        </div>
       </div>
       
       <div class="row">
        <div class="cell">
           <div class="inner-row">
             <div class="cell">
                <h1>Cell 1 left</h1>
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange1" orient="vertical">
 <input type="range" min="1" max="100" value="50" class="slider" id="myRange2" orient="vertical">

                
             </div>
             <div class="cell">
                <h1>Cell 2 center</h1>
             </div>
             <div class="cell">
                <h1>Cell 3 center</h1>
             </div>
             <div class="cell">
                <h1>Cell 4 right</h1>
             </div>
           </div>
        </div>
       </div>
       
       <div class="row">
        <div class="cell">
           <div class="inner-row">
             <div class="cell">
                <h1>Cell bottom</h1>
             </div>
           </div>
        </div>
       </div>
      `;
    }
  
    connectedCallback() {
    }
  
    defineListeners() {
    }
  }
  
  customElements.define('hello-world', HelloWorld);
  