import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { build as appVersion } from "../../environment";
import { Typography } from './styles.js';

class AboutView extends PageViewElement {
  static get styles() {
    return [
      Typography,
      css`
        section {
          padding: 0 16px;
          max-width: 600px;
          margin: 0 auto;
        }
        section p { text-align: justify }
        h5 { color: var(--primary); text-align: center }
      `
    ]
  }
  render() {
    return html`
      <section>
        <h5>Über die DuttweilerApp</h5>
        <p>Die DuttweilerApp bietet Nachrichten und den Veranstaltungskalender von duttweiler.de für das Smartphone optimiert. Zusätzlich erweitert die App das reine Anzeigen der Daten um nützliche Funktionen, wie z.B. Veranstaltungen zu teilen oder direkt in den eigenen Kalender zu übernehmen. Am nützlichsten ist wohl die Möglichkeit, sich via Push-Nachrichten über neue Nachrichten informieren zu lassen und so immer auf dem Laufenden zu bleiben.</p>
        <p style="text-align: center">
          <img style="text-align: center" src="https:/img.shields.io/badge/version-${appVersion}-${appVersion == 'dev' ? 'orange' : 'green'}.svg?style=flat-square" alt="Version: ${appVersion}">
        </p>
      </section>
      <section>
        <h5>Impressum</h5>
        <p>Die DuttweilerApp ist ein Angebot von <a href="https://www.jan-sl.de/" target="_blank" rel="noopener">Jan Syring-Lingenfelder</a> (<a href="mailto:support@jan-sl.de">support@jan-sl.de)</a>
        <p>Alle redaktionellen Inhalte werden unverändert von duttweiler.de übernommen.<br><a href="https://www.duttweiler.de/impressum.html">Impressum</a></p>
      </section>
      <section>
        <h5>Open Source Lizenzen</h5>
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
