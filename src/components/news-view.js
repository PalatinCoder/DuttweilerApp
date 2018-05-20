import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';

class NewsView extends PageViewElement {
  _render(props) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Nachrichten</h2>
      </section>
    `
  }
}

window.customElements.define('news-view', NewsView);
