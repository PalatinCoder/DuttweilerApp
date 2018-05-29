import { html } from '@polymer/lit-element';
import { SharedStyles } from './shared-styles.js';
import { PageViewElement } from './page-view-element.js';
import '@polymer/paper-toggle-button';

class SettingsView extends PageViewElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <style>
        .grid {
          display: grid;
          grid-template-columns: 2fr minmax(max-content, 1fr);
          grid-gap: 2em 1em;
        }
        .grid paper-toggle-button {
          justify-self: end;
        }
        .description {
          font-size: small;
        }
      </style>
      <section>
        <h2>Einstellungen</h2>
        <div class="grid">
          <div>
            Push-Benachrichtigungen
            <div class="description">Empfange Benachrichtigungen bei neuen Nachrichtenmeldungen</div>
          </div><paper-toggle-button checked></paper-toggle-button>
          <div>
            Digitale Ortsrufanlage
            <div class="description">Empfange kurzfristige Meldungen über die &bdquo;digitale Ortsrufanlage&ldquo;</div>
          </div><paper-toggle-button checked></paper-toggle-button>
        </div>
      </section>
    `;
  }
}

window.customElements.define('settings-view', SettingsView);