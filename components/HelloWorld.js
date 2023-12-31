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
        height: auto;
       width: auto;
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
    button{
      background-color: #4CAF50; /* Green */
      border : none;
      color: white;
      padding: 16px 32px;
      text-align: center;
      text-decoration: none;
      margin: 4px 2px;
    }

    .remix-table-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #333;
      height: 100%; /* Ajoutez cette ligne pour occuper toute la hauteur de la cellule */
      box-sizing: border-box; /* Ajoutez cette ligne pour inclure les bordures et le rembourrage dans la hauteur totale */
      padding: 10px; /* Ajoutez cette ligne pour ajouter un espace autour de la table */
  }
     input[type=range][orient=vertical] {
      appearance: slider-vertical;
      width: 8px;
      height: 50%;
      padding: 5px 5px;
     }
     .remix-table-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
  }
      </style>
      <h1>Super lecteur audio</h1>
            <div class="row">
                <div class="cell">
                    <div class="inner-row">
                        <div class="cell">
                            <h1>Cell 1</h1>
                            <div class="remix-table-container">
                                <remix-table></remix-table>
                            </div>
                        </div>
                        <div class="cell">
                            <play-list></play-list>
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