/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { SharedStyles } from './shared-styles.js';
import { PageViewElement } from './page-view-element.js';

class AboutView extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>Über die DuttweilerApp</h2>
        <p>Die DuttweilerApp bietet Nachrichten und den Veranstaltungskalender von duttweiler.de für das Smartphone optimiert. Zusätzlich erweitert die App das reine Anzeigen der Daten um nützliche Funktionen, wie z.B. Veranstaltugen zu teilen oder direkt in den eigenen Kalender zu übernehmen. Am nützlichsten ist wohl die Möglichkeit, sich via Push-Nachrichten über neue Nachrichten informieren zu lassen und so immer auf dem Laufenden zu bleiben.</p>
      </section>
      <section>
        <h2>Impressum</h2>
        <p>Die DuttweilerApp ist ein Angebot von <a href="https://www.jan-sl.de/" target="_blank" rel="noopener">Jan Syring-Lingenfelder</a> (<a href="mailto:support@jan-sl.de">support@jan-sl.de)</a>
        
        <p>Alle redaktionellen Inhalte werden unverändert von duttweiler.de übernommen.<br><a href="https://www.duttweiler.de/impressum.html">Impressum</a></p>
      </section>
    `;
  }
}

window.customElements.define('about-view', AboutView);
