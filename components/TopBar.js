export class TopBar extends HTMLElement {  
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
      <div id="menu-bar">
      <div id="left-controls">
          <a class="menu-item main" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="menu-icon"></i>
          </a>
          <div class="dropdown-menu dropright" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item dropdown-toggle" type="button" id="dropdownSubMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Demo Project</a>
              <div id="songs-container" class="dropdown-menu songs" aria-labelledby="dropdownSubMenuButton"><a class="dropdown-item">Fly me to the moon [RNB]</a><a class="dropdown-item">Save Brubeck - Take Five [Jazz]</a><a class="dropdown-item">Bolz And Knecht - Summertime</a><a class="dropdown-item">Admiral Crumple - Keeps Flowing</a><a class="dropdown-item">Londres - Appelle</a><a class="dropdown-item">Solo Guitar</a><a class="dropdown-item">Street Noise - Revelations</a><a class="dropdown-item">Tarte a la cerise</a></div>

              <div class="dropdown-divider"></div>

              <a class="dropdown-item" id="load-project">Load project</a>
              <a class="dropdown-item" id="save-project">Save project</a>
              <a class="dropdown-item" id="export-project">Render/Export project</a>

              <div class="dropdown-divider"></div>

              <a class="dropdown-item" id="import-songs">Import audio file(s)</a>
              <input id="new-track-input" type="file" accept=".mp3, .wav, .ogg" multiple="" style="display: none">

              <div class="dropdown-divider advanced"></div>

              <a class="dropdown-item" id="keyboard-shortcuts-btn">Keyboard shortcuts</a>

              <div class="dropdown-divider advanced"></div>

              <a class="dropdown-item" id="latency-btn">Calibrate latency compensation</a>
              <a class="dropdown-item" id="settings-btn">Settings</a>

              <div class="dropdown-divider advanced"></div>

              <a class="dropdown-item" id="login">Log in</a>

              <div class="dropdown-divider advanced"></div>

              <a class="dropdown-item" id="about-btn">About</a>
          </div>

          <div id="back-btn" class="menu-item">
              <span class="mytooltip">Restart</span>
              <i class="skip-start-icon"></i>
          </div>
          <div id="play-btn" class="menu-item">
              <span class="mytooltip">Play</span>
              <i class="play-icon" id="play-icon"></i>
          </div>
          <div id="record-btn" class="menu-item">
              <span class="mytooltip">Record</span>
              <i class="record-icon"></i>
          </div>
          <div id="loop-btn" class="menu-item">
              <span class="mytooltip">Loop</span>
              <i class="loop-icon"></i>
          </div>
          <div class="timer-item noselect">
              <div id="timer" class="timer">
                  00:00:00:000
              </div>
          </div>
          <div class="tempo-selector" id="tempo-selector">
              <!-- the tempo web component will be inserted here -->
          <tempo-selector-element></tempo-selector-element></div>
          <div class="time-signature-selector" id="time-signature-selector">
              <!-- the time-signature web component will be inserted here -->
          <time-signature-selector-element></time-signature-selector-element></div>
          <div id="metro-btn" class="menu-item">
              <span class="mytooltip">Metronome</span>
              <i class="metro-icon"></i>
          </div>
          <div id="mute-btn" class="menu-item">
              <span class="mytooltip">Mute</span>
              <i class="volume-up-icon" style="width: 30px" id="mute-icon"></i>
          </div>
          <div id="snap-btn" class="menu-item">
              <span class="mytooltip">Snap grid</span>
              <i class="snap-icon" style="width: 30px" id="snap-icon"></i>
          </div>
          <div id="split-btn" class="menu-item">
              <span class="mytooltip">Split region</span>
              <i class="split-icon" style="width: 30px" id="split-icon"></i>
          </div>

          <div id="undo-btn" class="menu-item">
              <span class="mytooltip">Undo</span>
              <i class="undo-icon-off" style="width: 30px" id="undo-icon"></i>
          </div>
          <div id="redo-btn" class="menu-item">
              <span class="mytooltip">Redo</span>
              <i class="redo-icon-off" style="width: 30px" id="redo-icon"></i>
          </div>
      </div>
      <div id="right-controls">
          <div id="spanZoomLevel">1x</div>
          <div id="zoom-out-btn" class="menu-item">
              <span class="mytooltip">Zoom out</span>
              <i class="zoom-out" style="width: 30px"></i>
          </div>
          <div id="zoom-in-btn" class="menu-item">
              <span class="mytooltip">Zoom in</span>
              <i class="zoom-in" style="width: 30px"></i>
          </div>
      </div>
  </div>      `;
    }
  
    connectedCallback() {
    }
  
    defineListeners() {
    }
  }
  
  customElements.define('top-bar', TopBar);
  