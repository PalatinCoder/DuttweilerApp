import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { repeat } from 'lit-html/directives/repeat.js';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
import { store } from '../store';
import { fetchDataIfNeeded, invalidateData } from '../actions/api-data.js';
import { Fab } from '@material/mwc-fab';
import { Button } from "@material/mwc-button";
import '@polymer/paper-card/paper-card.js';

class NewsView extends connect(store)(PageViewElement) {
  render() {
    const { _isFetching } = this;
    const _items = this._items || [];
    return html`
      <style>
        :host {
          display: flex !important;
          flex-wrap: wrap;
          justify-content: center;
        }
        paper-card {
          margin: 1em;
          width: calc(100% - 2em); /* - 2x margin */
          max-width: 450px;
        }
        paper-card span {
          color: gray;
        }
        mwc-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
        }
      </style>
      ${repeat(_items, (item) => html`
        <paper-card heading="${item.headline}" image="${item.imageUrl || ''}" alt="${item.imageAlternativeText}">
          <div class="card-content">
            <span>${item.date}</span>
            <h3>${item.subheadline}</h3>
            <p>${item.text}</p>
          </div>
          <div class="card-actions">
            <mwc-button dense class="mdc-card__action--button" icon="share">Teilen</mwc-button>
            <mwc-button raised dense class="mdc-card__action--button" icon="chevron_right" @click="${() => window.open("https://www.duttweiler.de"+item.url)}">Lesen</mwc-button>
          </div>
        </paper-card>
      `)}
      <mwc-fab icon="refresh" label="Aktualisieren" @click="${(e) => this._clickHandler(e)}" .exited="${_isFetching}"></mwc-fab>
    `
  }

  _clickHandler(e) {
    store.dispatch(invalidateData('news'));
    store.dispatch(fetchDataIfNeeded('news'));
  }

  static get properties() {
    return {
      _data: { type: Object },
      _items: { type: Array },
      _isFetching: { type: Boolean }
    }
  }

  firstUpdated() {
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
