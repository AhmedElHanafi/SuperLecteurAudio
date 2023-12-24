// PlayList.js

export class PlayList extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <style>
              .playlist-container {
               
            
                  width: 100%; /* Take up 100% of the width */
                    background: #333;
                    color: #fff;
                    padding: 20px;
                    border-radius: 1.5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                  border-radius: 1.5px;
              }

              h2 {
                  color: #fff;
              }

              ol {
        
                  list-style-type: decimal;
                  padding: 40;
              }

              li {
                color: #fff;
                  margin-bottom: 10px;
              }

              a {
                  color: #1ed760;
                  text-decoration: none;
                  cursor: pointer;
                  transition: color 0.3s ease;
              }

              a:hover {
                  color: #12763c;
              }
          </style>
          <div class="playlist-container">
              <h2>Playlist</h2>
              <ol id="playlist-container"></ol>
          </div>
      `;
  }

  connectedCallback() {
      this.addSong('../assets/CleanGuitarRiff.mp3', "Clean Guitar Riff");
      this.addSong('../assets/Ssendu.mp3', "Ssendu");
      this.addSong('../assets/The Most Beautiful & Relaxing Piano Pieces.mp3', "The Most Beautiful & Relaxing Piano Pieces");
      this.addSong('../assets/Alan Walker - Faded.mp3', "Alan Walker - Faded");
      this.addSong('../assets/Paradise - Coldplay.mp3', "Paradise - Coldplay");
      this.addSong('../assets/Tom Frager - Lady Melody.mp3', "Tom Frager - Lady Melody");

      
  }

  addSong(src, name) {
      const playlistContainer = this.shadowRoot.querySelector('#playlist-container');
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <a href="#" data-src="${src}">${name}</a>
      `;
      listItem.querySelector('a').addEventListener('click', (event) => this.playSong(event, src));
      playlistContainer.appendChild(listItem);
  }

  playSong(event, src) {
      event.preventDefault();
      const playEvent = new CustomEvent('playSong', { detail: { src } });
      document.dispatchEvent(playEvent);
  }
}

customElements.define('play-list', PlayList);
