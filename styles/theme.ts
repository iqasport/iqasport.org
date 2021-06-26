import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { SliceStyles } from 'components/slice';
import { CardStyles } from 'components/card';
import { HorizontalCardStyles } from 'components/horizontal-card';

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
  },

  components: {
    Slice: SliceStyles,
    Card: CardStyles,
    HorizontalCard: HorizontalCardStyles,
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
