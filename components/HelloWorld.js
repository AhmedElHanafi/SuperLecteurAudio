export class HelloWorld extends HTMLElement {  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
        h1 {
          font-family: Arial;
          color: red;
        }
      </style>
      <h1>Hello World</h1>
      `;
    }
  
    connectedCallback() {
    }
  
    defineListeners() {
    }
  }
  
  customElements.define('hello-world', HelloWorld);
  