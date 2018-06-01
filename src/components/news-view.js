import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { repeat } from 'lit-html/lib/repeat.js';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
import { store } from '../store';
import { fetchDataIfNeeded } from '../actions/api-data.js';

class NewsView extends connect(store)(PageViewElement) {
  _render({_items = []}) {
    return html`
      ${SharedStyles}
      <section>
        <h2>Nachrichten</h2>
        ${repeat(_items, (item) => html`
          <h3>${item.headline}</h3>
        `)}
      </section>
    `
  }

  static get properties() {
    return {
      _data: Object,
      _items: Array
    }
  }

  /* Temporary!! */
  _firstRendered() {
    store.dispatch(fetchDataIfNeeded('news'))
  }

  _stateChanged(state) {
    const news = state.dataByEndpoint['news'];
    if (news) {
      this._data = state.dataByEndpoint['news'];
      const items = news.items;
      if (items) {
        this._items = items;
      }
    }
  }
}

window.customElements.define('news-view', NewsView);
