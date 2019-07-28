/**
@license
Copyright (c) 2018 Jan Syring-Lingenfelder. All right reserved.

This code is based on the pwa-starter-kit
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';

import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import { Icon } from '@material/mwc-icon';

import 'weightless/nav';
import 'weightless/tab-group';
import 'weightless/tab';
import 'weightless/icon';
import 'weightless/snackbar';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store } from '../store.js';
import { navigate, updateOffline } from '../actions/app.js';
import { Theme, Typography } from './styles.js';

class DuttweilerApp extends connect(store)(LitElement) {
  static get styles() {
    return [
      Theme,
      Typography,
      css`
      :host {
        display: block;
      }


      main {
        padding-bottom: 56px;
        min-height: 100vh;
        box-sizing: border-box;
      }

      .wappen {
        height: 30px;
      }

      .page:not([active]) {
        display: none;
      }
      
      wl-nav {
        --nav-height: 56px;
        --nav-padding: 16px;
        --nav-title-margin: 32px;
        font-family: serif;
        --nav-title-font-size: 30px;
        --nav-title-font-weight: 400;
        --nav-color: var(--primary);
      }

      wl-tab-group {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 56px;
      
        --tab-group-indicator-size: 0;
        --divider-size: 0;

        --background: var(--primary);
      }

      wl-tab {
        min-width: 95px;

        --tab-before-margin-vertical: 0;
        --tab-padding: 8px;

        --tab-bg: var(--primary);
        --tab-bg-hover: var(--primary);
        --tab-bg-disabled: var(--primary);
        --tab-color-active: white;
        --tab-color-active-hover: white;
        
        --shade-lightness: 65%;
      }

      wl-tab > span {
        font-size: 12px;
        line-height: 1;
      }

      wl-snackbar {
        position: fixed;
        bottom: 64px; /* 56px bottom nav + 8px padding */
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 48px); /* width - padding */
      }
    `
    ]
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`

    <!-- Header -->
    <!-- TODO: condeses and reveals -->
    <wl-nav role="banner" shadow>
      <div slot="left">
        <img class="wappen" src="images/manifest/icon-96x96.png" alt="Wappen">
      </div>
      <div slot="title">DuttweilerApp</div>
    </wl-nav>

    <!-- Main content -->
    <main>
      <news-view class="page" ?active="${this._page === 'news'}"></news-view>
      <events-view class="page" ?active="${this._page === 'events'}"></events-view>
      <about-view class="page" ?active="${this._page === 'about'}"></about-view>
      <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
    </main>

    <!-- Bottom navigation -->
    <wl-tab-group align="center" filled>
      <wl-tab vertical ?checked="${this._page === 'news'}" @click="${() => this._navigate('/news')}">
        <wl-icon slot="before">list</wl-icon>
        ${this._page === 'news' ? html`<span>Nachrichten</span>` : ''}
      </wl-tab>
      <wl-tab vertical ?checked="${this._page === 'events'}" @click="${() => this._navigate('/events')}">
        <wl-icon slot="before">event</wl-icon>
        ${this._page === 'events' ? html`<span>Veranstaltungen</span>` : ''}
      </wl-tab>
      <wl-tab vertical ?checked="${this._page === 'about'}" @click="${() => this._navigate('/about')}">
        <wl-icon slot="before">info_outline</wl-icon>
        ${this._page === 'about' ? html`<span>Info</span>` : ''}
      </wl-tab>
      <wl-tab vertical disabled ?checked="${this._page === 'settings'}" @click="${() => this._navigate('/settings')}">
        <wl-icon slot="before">settings</wl-icon>
        ${this._page === 'settings' ? html`<span>Einstellungen</span>` : ''}
      </wl-tab>
    </wl-tab-group>

    <wl-snackbar>
      <wl-icon slot="icon">${this._offline ? 'cloud_off' : 'cloud_queue'}</wl-icon>
      <span>${this._offline ? 'Offline': 'Online'}betrieb</span>
    </wl-snackbar>

    `;
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _offline: { type: Boolean },
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter(this._handleNavigation);
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  _navigate(location) {
    window.history.pushState({}, '', location);
    this._handleNavigation(window.location);
  }

  _handleNavigation(location) {
    store.dispatch(navigate(window.decodeURIComponent(location.pathname)));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
      scroll({ top: 0, behavior: 'silent' });
    }

    if(changedProps.has('_offline')) {
      this.shadowRoot.querySelector('wl-snackbar').show();
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
  }
}

window.customElements.define('duttweiler-app', DuttweilerApp);
