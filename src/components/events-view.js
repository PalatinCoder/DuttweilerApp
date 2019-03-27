import { html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { repeat } from 'lit-html/directives/repeat.js';
import { PageViewElement } from './page-view-element.js';
import { store } from '../store.js';
import { fetchDataIfNeeded, invalidateData } from '../actions/api-data.js';
import { Fab } from '@material/mwc-fab';
import { Button } from "@material/mwc-button";
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-progress/paper-progress.js';

class EventsView extends connect(store)(PageViewElement) {
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
        font-family: var(--app-font-family-secondary);
      }
      .card-content, .card-actions {
        color: var(--secondary-text-color);
        font-family: var(--app-font-family-primary);
      }
      .card-content mwc-icon {
        margin-right: 0.5em;
      } 
      .card-content > div {
        display: flex;
        align-items: center;
      }
      .card-actions {
        text-align: right;
      }
      .card-actions mwc-icon {
        margin: 0 0.25em;
        cursor: pointer;
      }
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
        --paper-progress-active-color: var(--app-primary-color);
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
        <paper-card heading="${item.title}">
          <div class="card-content">
            ${item.startDate ? html`<div><mwc-icon>schedule</mwc-icon> ${item.startDate}</div>` : ''}
            ${item.location ? html`<div><mwc-icon>place</mwc-icon> ${item.location}</div>` :''}
            ${item.host ? html`<div><mwc-icon>people</mwc-icon> ${item.host}</div>` :''}
          </div>
          <div class="card-actions">
            ${item.link ? html`<mwc-icon @click="${() => this._showDetailsFor(item)}">public</mwc-icon>`:''}
            <mwc-icon @click="${() => this._share(item)}">share</mwc-icon>
            <mwc-icon @click="${() => this._addToCalendar(item)}">event</mwc-icon>
          </div>
        </paper-card>
      `)}
      <mwc-fab icon="refresh" label="Aktualisieren" @click="${this._refresh}" .exited="${this._isFetching}"></mwc-fab>
    `
  }

  _showDetailsFor(item) {
    window.location = `https://www.duttweiler.de${item.link}`;
  }

  _share(item) {
    alert("Sharing not yet implemented");
  }

  _addToCalendar(item) {
    alert("Add to calendar not yet implemented");
  }

  _refresh() {
    store.dispatch(invalidateData('events'));
    store.dispatch(fetchDataIfNeeded('events'));
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
    store.dispatch(fetchDataIfNeeded('events'))
  }

  stateChanged(state) {
    const events = state.dataByEndpoint['events'];
    if (events) {
      this._items = events.items;
      this._isFetching = events.isFetching;
    }
  }
}

window.customElements.define('events-view', EventsView);
