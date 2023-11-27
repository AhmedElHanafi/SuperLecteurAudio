import "../libs/webaudiocontrols.js";

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
    
    .slider-container {
      display: flex;
      flex-direction: row;
      align-items: center;
     }
     
     .slider {
      -webkit-appearance: slider-vertical;
      width: 25px;
      height: 100px;
      background: #d3d3d3;
      outline: none;
     }
     input{
      padding:15px;
     }
     p{
      padding-left : 5px;
     }
     
     .slider:hover {
      background: #999;
     }
     .knob{
      background-color = "white";
     }
      </style>
      <div class="player" style="display: flex; flex-direction: column;">
        <div class="slider-container">
          <input type="range" min="1" max="100" value="50" class="slider" id="slider1">
          <input type="range" min="1" max="100" value="50" class="slider" id="slider2">
          <input type="range" min="1" max="100" value="50" class="slider" id="slider3">
        </div>
        <br>
        <div class="slider-labels" style="display: flex; flex-direction: row;">
          <p id="label1">Volume</p>
          <p id="label2">Balance</p>
          <p id="label3">Frequency</p>
        </div>
        <div class="knob">
        <webaudio-knob id="knob"  
        src="../images/LittlePatty.png" 
        value="50" step="1" 
        diameter="64" 
        tooltip="Knob1 tooltip %d">
        </webaudio-knob>
        </div>
      </div>
      `;
    }
  
    connectedCallback() {
    }
  
    defineListeners() {
      //je veux recuperer les valeur des slider a fin de les utiliser
    }
  }
  
  customElements.define('play-bar', PlayBar);
  