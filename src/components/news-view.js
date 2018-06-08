import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { repeat } from 'lit-html/lib/repeat.js';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
import { store } from '../store';
import { fetchDataIfNeeded, invalidateData } from '../actions/api-data.js';
import { Fab } from "@material/mwc-fab";

class NewsView extends connect(store)(PageViewElement) {
  _render({_items = [], _isFetching}) {
    return html`
      ${SharedStyles}
      <style>
        mwc-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
        }
      </style>
      <section>
        <h2>Nachrichten</h2>
        ${repeat(_items, (item) => html`
          <h3>${item.headline}</h3>
        `)}
        <mwc-fab icon="refresh" label="Aktualisieren" on-click="${(e) => this._clickHandler(e)}" exited="${_isFetching}"></mwc-fab>
      </section>
    `
  }

  _clickHandler(e) {
    store.dispatch(invalidateData('news'));
    store.dispatch(fetchDataIfNeeded('news'));
  }

  static get properties() {
    return {
      _data: Object,
      _items: Array,
      _isFetching: Boolean
    }
  }

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
      this._isFetching = state.dataByEndpoint['news'].isFetching;
    }
  }
}

window.customElements.define('news-view', NewsView);
