import { html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { repeat } from 'lit-html/directives/repeat.js';
import { PageViewElement } from './page-view-element.js';
import { store } from '../store';
import { fetchDataIfNeeded, invalidateData } from '../actions/api-data.js';
import { Fab } from '@material/mwc-fab';
import { Button } from "@material/mwc-button";
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-progress/paper-progress.js';

class NewsView extends connect(store)(PageViewElement) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      paper-card {
        margin: 1em;
        width: calc(100% - 2em); /* - 2x margin */
        max-width: 450px;
        font-family: var(--font-family-accent);
      }
      paper-card span {
        color: var(--secondary-text-color);
      }
      .card-content p, .card-content span { font-family: var(--font-family); }
      .card-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--secondary-text-color);
      }
      .card-actions mwc-icon { cursor: pointer; }
      mwc-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
      }
      .empty-list {
        color: #757575;
      }

      paper-progress {
        width: 100%;
        --paper-progress-active-color: var(--primary);
        --paper-progress-container-color: #fff;
      }
    `;
  }
  render() {
    return html`

      <paper-progress ?indeterminate="${this._isFetching}" value="0"></paper-progress>

      ${this._items.length == 0 ? html`
        <p class="empty-list">Keine Daten vorhanden</p>        
      ` : ''}

      ${repeat(this._items, (item) => html`
        <paper-card heading="${item.headline}" image="${item.imageUrl || ''}" alt="${item.imageAlternativeText}">
          <div class="card-content">
            <span>${item.date}</span>
            <h3>${item.subheadline}</h3>
            <p>${item.text}</p>
          </div>
          <div class="card-actions">
            <mwc-button raised icon="chevron_right" @click="${() => this._readMore(item)}">Lesen</mwc-button>
            <mwc-icon @click="${() => this._share(item)}">share</mwc-icon>
          </div>
        </paper-card>
      `)}
      <mwc-fab icon="refresh" label="Aktualisieren" @click="${this._refresh}" .exited="${this._isFetching}"></mwc-fab>
    `
  }

  _readMore(item) {
    window.location = `https://www.duttweiler.de${item.url}`;
  }

  _share(item) {
    alert("Sharing not implemented yet...");
  }

  _refresh() {
    store.dispatch(invalidateData('news'));
    store.dispatch(fetchDataIfNeeded('news'));
  }

  constructor() {
    super();
    this._items = [];
  }

  static get properties() {
    return {
      _items: { type: Array },
      _isFetching: { type: Boolean }
    }
  }

  firstUpdated() {
    store.dispatch(fetchDataIfNeeded('news'))
  }

  stateChanged(state) {
    const news = state.dataByEndpoint['news'];
    if (news) {
      this._items = news.items;
      this._isFetching = news.isFetching;
    }
  }
}

window.customElements.define('news-view', NewsView);
