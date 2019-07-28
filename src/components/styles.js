import { css } from "lit-element";

export const Typography = css`
    :host {
        --font-family: 'Open Sans',sans-serif;
        --font-family-accent: 'Montserrat','Open Sans',sans-serif;

        /* weightless components */
        --input-font-family: var(--font-family);
        --font-family-serif: var(--font-famliy);
    }

    h1, h2, h3, h4, h5, h6, button, .subtitle1, .subtitle2 {
        font-family: var(--font-family-accent, sans-serif);
    }
    h1 { font-size: 6rem; font-weight: 400; }
    h2 { font-size: 3.75rem; font-weight: 400; }
    h3 { font-size: 3rem; }
    h4 { font-size: 2.125rem; }
    h5 { font-size: 1.5rem; }
    h6 { font-size: 1.25rem; font-weight: 600; }
    .subtitle1 { font-size: 1rem; }
    .subtitle2 { font-size: 0.875rem; font-weight: 600; }
    .caption { font-size: 0.75rem; }
    .overline { text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.16667em; }
`;

export const Theme = css`
    /* theme for weightless components in HSL */
    :host {
        --surface: #ffffff;
        --background: 0, 0%, 100%;
        --on-surface: #000000;
        --on-surface_rgb: 0, 0, 0;
        --foreground: 0, 0%, 0%; /* = on-background */

        --error: #b00020;
        --error-hue: 350;

        --primary-hue: 232;
        --primary-saturation: 54%;
        --primary-lightness: 41%;
        --primary: hsl(var(--primary-hue, 232), var(--primary-saturation, 54%), var(--primary-lightness, 41%));
        --on-primary: #ffffff;

        --secondary: #303f9f;
    }

`;
