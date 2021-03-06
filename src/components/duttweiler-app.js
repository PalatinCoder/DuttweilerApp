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

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';

import { Icon } from '@material/mwc-icon';
import './snack-bar.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store } from '../store.js';
import { navigate, updateOffline, updateDrawerState } from '../actions/app.js';

class DuttweilerApp extends connect(store)(LitElement) {
  static get styles() {
    return css`
    :host {
      --app-drawer-width: 256px;
      display: block;

      --app-primary-color: #3f51b5;
      --app-secondary-color: #303f9f;
      --app-dark-text-color: var(--app-secondary-color);
      --app-light-text-color: white;
      --app-section-even-color: #f7f7f7;
      --app-section-odd-color: white;

      --app-header-background-color: white;
      --app-header-text-color: var(--app-dark-text-color);
      --app-header-selected-color: var(--app-primary-color);

      --app-drawer-background-color: var(--app-secondary-color);
      --app-drawer-text-color: var(--app-light-text-color);
      --app-drawer-selected-color: #78909C;
      --app-font-family-primary: 'Open Sans',sans-serif;
      --app-font-family-secondary: 'Montserrat',sans-serif;
    }
    @media (min-width: 768px) {
      :host {
        --app-drawer-width: 384px;
      }
    }
    @media (min-width: 1440px) {
      /* large screen -> drawer is persistent, so we need some margin on the left to keep the content centered */
      main { margin-left: var(--app-drawer-width); }
      [main-title] { padding-left: var(--app-drawer-width);}
    }

    app-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      background-color: var(--app-header-background-color);
      color: var(--app-header-text-color);
      border-bottom: 1px solid #eee;
    }

    .toolbar-top {
      background-color: var(--app-header-background-color);
    }

    [main-title] {
      font-family: serif;
      font-size: 30px;
    }

    .menu-btn {
      background: none;
      border: none;
      color: var(--app-header-text-color);
      cursor: pointer;
      height: 44px;
      width: 44px;
    }
    
    .wappen {
      width: 30px;
      height: 30px;
      margin: 7px;
    }

    app-drawer {
      /* Preventively elevate the drawer above everything else */
      z-index: 999;
    }

    .drawer-list {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 24px;
      background: var(--app-drawer-background-color);
      position: relative;
      font-family: var(--app-font-family-secondary);
    }

    .drawer-list > a {
      display: block;
      text-decoration: none;
      color: var(--app-drawer-text-color);
      line-height: 40px;
      padding: 0 24px;
    }

    .drawer-list > a:focus, app-toolbar *:focus {
      outline: none;
    }

    .drawer-list > a[selected] {
      color: var(--app-drawer-selected-color);
    }

    .main-content {
      padding-top: 64px;
      min-height: 100vh;
      box-sizing: border-box;
    }

    .page:not([active]) {
      display: none;
    }
    `;
  }
  render() {
    // Anything that's related to rendering should be done in here.
    return html`

    <!-- Main content -->
    <main class="main-content">
      <news-view class="page" ?active="${this._page === 'news'}"></news-view>
      <events-view class="page" ?active="${this._page === 'events'}"></events-view>
      <about-view class="page" ?active="${this._page === 'about'}"></about-view>
      <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
    </main>

    <!-- Header -->
    <app-header condenses reveals shadow>
      <app-toolbar class="toolbar-top">
        <button class="menu-btn" title="Menu" @click="${_ => store.dispatch(updateDrawerState({opened: true}))}"><mwc-icon>menu</mwc-icon></button>
        <div main-title>${this.appTitle}</div>
        <img class="wappen" src="images/manifest/icon-96x96.png" alt="Wappen">
      </app-toolbar>
    </app-header>

    <!-- Drawer content -->
    <app-drawer swipe-open 
        .opened="${this._drawerPersistent ? true : this._drawerOpened /* persistent drawer is always open */}"
        @opened-changed="${e => store.dispatch(updateDrawerState({opened: e.target.opened}))}"
        .persistent="${this._drawerPersistent}">
      <nav class="drawer-list">
        <a ?selected="${this._page === 'news'}" href="/news">Nachrichten</a>
        <a ?selected="${this._page === 'events'}" href="/events">Veranstaltungen</a>
        <a ?selected="${this._page === 'about'}" href="/about">Über</a>
      </nav>
    </app-drawer>

    <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.</snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _drawerPersistent: { type: Boolean },
      _snackbarOpened: { type: Boolean },
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
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 1440px)`,
        /* persist the drawer if the query matches */
        (matches) => store.dispatch(updateDrawerState({persistent: matches})));
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
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
    this._drawerPersistent = state.app.drawerPersistent;
  }
}

window.customElements.define('duttweiler-app', DuttweilerApp);
