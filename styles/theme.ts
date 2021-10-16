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
    overlayHover: 'rgba(98, 176, 88, 0.05)',
    overlayPressed: 'rgba(98, 176, 88, 0.2)',
    overlayDisabled: 'rgba(255, 255, 255, 0.4)',
  },

  components: {
    Slice: SliceStyles,
    Card: CardStyles,
    HorizontalCard: HorizontalCardStyles,
    Button: ButtonStyles,
    Text: {
      baseStyle: {
        fontSize: rem(18),
        lineHeight: rem(24),
      },
    },
  },

  fonts: {
    heading: 'metropolis, helvetica, arial, sans-serif',
    body: 'proxima-nova, helvetica, arial, sans-serif',
  },

  styles: {
    global: {
      'html, body': {
        lineHeight: 1.15,
      },
      p: {
        lineHeight: rem(24),
        fontSize: rem(18),
      },
    },
  },
});
