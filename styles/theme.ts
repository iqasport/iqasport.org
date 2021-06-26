import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { SliceStyles } from 'components/slice';
import { CardStyles } from 'components/card';
import { HorizontalCardStyles } from 'components/horizontal-card';
import { ButtonStyles } from 'components/button';

const emBase = 16;
export const rem = (value: number) => `${value / emBase}rem`;

export default extendTheme({
  breakpoints: createBreakpoints({
    sm: rem(576),
    md: rem(768),
    lg: rem(992),
    xl: rem(1200),
  }),

  colors: {
    iqaGreen: '#62b058',
    overlayHover: 'rgba(0, 0, 0, 0.1)',
    overlayPressed: 'rgba(0, 0, 0, 0.2)',
    overlayDisabled: 'rgba(255, 255, 255, 0.4)',
  },

  components: {
    Slice: SliceStyles,
    Card: CardStyles,
    HorizontalCard: HorizontalCardStyles,
    Button: ButtonStyles,
  },

  fonts: {
    heading: 'metropolis, sans-serif',
    body: 'ff-real-headline-pro-2, sans-serif',
  },

  styles: {
    global: {
      'html, body': {
        lineHeight: 1.15,
      },
    },
  },
});
