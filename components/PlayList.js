export class PlayList extends HTMLElement {  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      </style>
      <div>
        <h1>kjhfkerg</h1>
      </div>
          `;
    }
  
    connectedCallback() {
    }
  
    defineListeners() {
    }
  }
  
  customElements.define('play-list', PlayList);
  