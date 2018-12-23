import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

class AboutView extends PageViewElement {
  render() {
    return html`
      <style>
        section {
          max-width: 600px;
          margin: 0 auto;
        }
        section p { text-align: justify }
        h2 { color: var(--app-dark-text-color); text-align: center; font-family: var(--app-font-family-secondary); }
      </style>
      <section>
        <h2>Über die DuttweilerApp</h2>
        <p>Die DuttweilerApp bietet Nachrichten und den Veranstaltungskalender von duttweiler.de für das Smartphone optimiert. Zusätzlich erweitert die App das reine Anzeigen der Daten um nützliche Funktionen, wie z.B. Veranstaltugen zu teilen oder direkt in den eigenen Kalender zu übernehmen. Am nützlichsten ist wohl die Möglichkeit, sich via Push-Nachrichten über neue Nachrichten informieren zu lassen und so immer auf dem Laufenden zu bleiben.</p>
      </section>
      <section>
        <h2>Impressum</h2>
        <p>Die DuttweilerApp ist ein Angebot von <a href="https://www.jan-sl.de/" target="_blank" rel="noopener">Jan Syring-Lingenfelder</a> (<a href="mailto:support@jan-sl.de">support@jan-sl.de)</a>
        <p>Alle redaktionellen Inhalte werden unverändert von duttweiler.de übernommen.<br><a href="https://www.duttweiler.de/impressum.html">Impressum</a></p>
      </section>
      <section>
        <h2>Open Source Lizenzen</h2>
        <p style="text-align: center">
          <a href="https://github.com/PalatinCoder/DuttweilerApp/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/PalatinCoder/DuttweilerApp.svg?style=flat-square" alt="GitHub"></a>
          <a href="https://github.com/PalatinCoder/DuttweilerApp"><img src="https://img.shields.io/badge/view_on-github-lightgrey.svg?style=flat-square&logo=github" alt="View on GitHub"></a>
          <a href="https://github.com/Polymer/pwa-starter-kit"><img src="https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg?style=flat-square" alt="Built with pwa-starter-kit"></a>
        </p>
        <p>Die DuttweilerApp ist Open Source Software unter der <a href="https://github.com/PalatinCoder/DuttweilerApp/blob/master/LICENSE.md">BSD-3-Clause Lizenz</a>.<br>Copyright (c) 2018 Jan Syring-Lingenfelder. All rights reserved.</p>
        <p>Die DuttweilerApp basiert auf dem <i>pwa-starter-kit</i><br>Copyright (c) 2018 The Polymer Project Authors. All rights reserved. <a href="http://polymer.github.io/LICENSE.txt">(License)</a></p>
        </section>
      `;
  }
}

window.customElements.define('about-view', AboutView);
