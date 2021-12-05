import { Global } from '@emotion/react';
export default function Fonts() {
  return (
    <Global
      styles={`
        /* @import must be at top of file, otherwise CSS will not work */
        @import url("//hello.myfonts.net/count/409a73");
        @font-face {
          font-display: swap;
          font-family: 'metropolis';
          font-style: normal;
          font-weight: normal;
          src: url('/fonts/Metropolis-ExtraBold.otf') format('opentype');
        }

        /**
        * @license
        * MyFonts Webfont Build ID 4233843, 2021-12-05T08:08:35-0500
        *
        * The fonts listed in this notice are subject to the End User License
        * Agreement(s) entered into by the website owner. All other parties are
        * explicitly restricted from using the Licensed Webfonts(s).
        *
        * You may obtain a valid license at the URLs below.
        *
        * Webfont: ProximaNova-Regular by Mark Simonson
        * URL: https://www.myfonts.com/fonts/marksimonson/proxima-nova/regular/
        *
        * Webfont: ProximaNova-RegularIt by Mark Simonson
        * URL: https://www.myfonts.com/fonts/marksimonson/proxima-nova/regular-it/
        *
        * Webfont: ProximaNova-Bold by Mark Simonson
        * URL: https://www.myfonts.com/fonts/marksimonson/proxima-nova/bold/
        *
        * Webfont: ProximaNova-BoldIt by Mark Simonson
        * URL: https://www.myfonts.com/fonts/marksimonson/proxima-nova/bold-it/
        *
        *
        * Webfonts copyright: Copyright (c) Mark Simonson, 2005. All rights reserved.
        *
        * © 2021 MyFonts Inc
        */

        @font-face {
          font-display: swap;
          font-family: 'proxima-nova';
          src: url('/fonts/ProximaNova-Regular.woff2') format('woff2'), url('/fonts/ProximaNova-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-display: swap;
          font-family: 'proxima-nova';
          src: url('/fonts/ProximaNova-Italic.woff2') format('woff2'), url('/fonts/ProximaNovaItalic.woff') format('woff');
          font-style: italic;
        }
        @font-face {
          font-display: swap;
          font-family: 'proxima-nova';
          src: url('/fonts/ProximaNova-Bold.woff2') format('woff2'), url('/fonts/ProximaNova-Bold.woff') format('woff');
          font-weight: bold;
        }
        @font-face {
          font-display: swap;
          font-family: 'proxima-nova';
          src: url('/fonts/ProximaNova-BoldItalic.woff2') format('woff2'), url('/fonts/ProximaNova-BoldItalic.woff') format('woff');
          font-weight: bold;
          font-style: italic;
        }
    `}
    />
  );
}
