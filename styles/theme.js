import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { SliceStyles } from 'components/slice';

const emBase = 16;
export const rem = (value) => `${value / emBase}rem`;

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
  },

  fonts: {},

  styles: {
    global: {
      'html, body': {
        lineHeight: 1.15,
      },
    },
  },
});
