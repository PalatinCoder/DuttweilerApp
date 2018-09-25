/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'about' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState({opened: false}));
};

const loadPage = (page) => (dispatch) => {
  switch(page) {
    case 'about':
      import('../components/about-view.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'news':
      import('../components/news-view.js');
      break;
    default:
      page = 'view404';
      import('../components/my-view404.js');
  }
  dispatch(updatePage(page));
}

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
}

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

/**
 * Set the desired drawer state, which includes if the drawer is currently opened and if it's persistent
 * @param state Describes the desired drawer state. Can contain one or more of the following fields:
 * @param {boolean} [state.opened] If the drawer should be open
 * @param {boolean} [state.persistent] - If the drawer should be persisted (i.e. fixed open on the left side)
 */
export const updateDrawerState = (state) => (dispatch, getState) => {
  /* Don't change the actual value in the store if it's not changed (i.e. in the new state) */
  dispatch({
    type: UPDATE_DRAWER_STATE,
      persistent: state.persistent === undefined ? getState().app.drawerPersistent : state.persistent,
      opened: state.opened === undefined ? getState().app.drawerOpened : state.opened
  });
};
