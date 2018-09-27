import { html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { repeat } from 'lit-html/directives/repeat.js';
import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js';
import { store } from '../store.js';
import { fetchDataIfNeeded, invalidateData } from '../actions/api-data.js';
import { Fab } from '@material/mwc-fab';
import { Button } from "@material/mwc-button";
import '@polymer/paper-card/paper-card.js';

class EventsView extends connect(store)(PageViewElement) {
  render() {
    const { _isFetching } = this;
    const _items = this._items || [];
    return html`
      <style>
        :host {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        paper-card {
          margin: 1em;
          width: calc(100% - 2em); /* - 2x margin */
          max-width: 450px;
        }
        .card-content, .card-actions {
          color: var(--secondary-text-color);
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
      </style>
      ${repeat(_items, (item) => html`
        <paper-card heading="${item.title}">
          <div class="card-content">
            ${item.startDate ? html`<div><mwc-icon>schedule</mwc-icon> ${item.startDate}</div>` : ''}
            ${item.location ? html`<div><mwc-icon>place</mwc-icon> ${item.location}</div>` :''}
            ${item.host ? html`<div><mwc-icon>people</mwc-icon> ${item.host}</div>` :''}
          </div>
          <div class="card-actions">
            ${item.link ? html`<mwc-icon @click="${() => window.location = "https://www.duttweiler.de"+item.link}">public</mwc-icon>`:''}
            <mwc-icon @click="${() => alert("Sharing not yet implemented")}">share</mwc-icon>
            <mwc-icon @click="${() => alert("Add to calendar not yet implemented")}">event</mwc-icon>
          </div>
        </paper-card>
      `)}
      <mwc-fab icon="refresh" label="Aktualisieren" @click="${(e) => this._clickHandler(e)}" .exited="${_isFetching}"></mwc-fab>
    `
  }

  _clickHandler(e) {
    store.dispatch(invalidateData('events'));
    store.dispatch(fetchDataIfNeeded('events'));
  }

  static get properties() {
    return {
      _data: { type: Object },
      _items: { type: Array },
      _isFetching: { type: Boolean }
    }
  }

  firstUpdated() {
    store.dispatch(fetchDataIfNeeded('events'))
  }

  _stateChanged(state) {
    const events = state.dataByEndpoint['events'];
    if (events) {
      this._data = state.dataByEndpoint['events'];
      const items = events.items;
      if (items) {
        this._items = items;
      }
      this._isFetching = state.dataByEndpoint['events'].isFetching;
    }
  }
}

window.customElements.define('events-view', EventsView);
