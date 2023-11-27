// PlayList.js

export class PlayList extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <style>
              .playlist-container {
                  background-color: #333;
                  padding: 10px;
                  border-radius: 4px;
              }

              h2 {
                  color: #fff;
              }

              ol {
                  list-style-type: decimal;
                  padding: 0;
              }

              li {
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
