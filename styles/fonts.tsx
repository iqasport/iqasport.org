import { Global } from '@emotion/react';
export default function Fonts() {
  return (
    <Global
      styles={`
        @font-face {
          font-display: swap;
          font-family: 'metropolis';
          font-style: normal;
          font-weight: normal;
          src: url('/fonts/Metropolis-ExtraBold.otf') format('opentype');
        }
    `}
    />
  );
}
