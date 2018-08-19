import { LitElement, html } from "@polymer/lit-element/lit-element.js";
//import { Card } from "@material/mwc-card";
import { Button } from "@material/mwc-button";
// Remove this when mwc-card is working
import { style as cardStyle } from "./mwc-card-css.js";
import { style as typographyStyle } from "./mwc-typography-css.js";


// Own card implementation as mwc-card isn't working yet
// needs refactor once that get's available
export class NewsCard extends LitElement {
    _render({ item = {} }) {
          return html`
            ${cardStyle}${typographyStyle}
            <style>
              .content { padding: 1rem; }
              .subtext { color: rgba(0,0,0,0.54); }
              .mdc-card { width: 400px; }
            </style>
            <div class="mdc-card">
                <!--div class="mdc-card__media mdc-card__media--16-9"></div-->
              <div class="content">
                <h2>${item.headline}</h2>
                <h3>${item.subheadline}</h3>
                <div>${item.text}</div>
              </div>
              <div class="mdc-card__actions">
                <div class="mdc-card__action-buttons">
                  <mwc-button dense class="mdc-card__action--button" icon="share">Teilen</mwc-button>
                  <mwc-button raised dense class="mdc-card__action--button" icon="chevron_right">Lesen</mwc-button>
                </div>
              </div>
            </div>
          `;
          /*
          <style>
            mwc-card {
                margin: 1em;
                width: 100%;
            }
            @media(min-width: 1440px) {
                mwc-card {
                    width: 500px;
                }
            }
          </style>
          <mwc-card>
          </mwc-card>
        `;
        */
    }

    static get properties() { return {
        item: Object
    }}
}

window.customElements.define('news-card', NewsCard);
