import { Box } from 'components';
import { useMultiStyleConfig, StylesProvider } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const SliceStyles = {
  parts: ['slice', 'container'],
  baseStyle: (props) => ({
    slice: {
      a: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: mode('iqaGreen', 'teal.300')(props),
        _hover: {
          textDecoration: 'underline',
          color: mode('iqaGreen', 'pink.300')(props),
        },
      },
      'p::selection, a::selection, h2::selection': {
        background: mode('iqaGreen', 'teal.300')(props),
        color: mode('white', 'gray.800')(props),
      },
    },
  }),
  sizes: {
    sm: {
      container: {
        maxWidth: '960px',
      },
    },
    md: {
      container: {
        maxWidth: '1280px',
      },
    },
  },
  variants: {
    primary: {
      background: 'transparent',
      color: 'white',
    },
    white: {
      background: 'white',
      color: 'gray.800',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'white',
  },
};

export default function Slice({ size, variant = 'white', children }) {
  const styles = useMultiStyleConfig('Slice', { size, variant });
  const isWhiteVariant = variant === 'white';
  return (
    <>
      <Box
        as="section"
        __css={styles}
        {...(isWhiteVariant && { 'data-variant': 'white' })}
      >
        <Box
          width="100%"
          my="0"
          mx="auto"
          py={{ base: 4, lg: 5 }}
          px={{ base: 4, sm: 8, md: 10 }}
          sx={styles.container}
        >
          <StylesProvider value={styles}>{children}</StylesProvider>
        </Box>
      </Box>
      {isWhiteVariant && (
        <Box
          as="svg"
          viewBox="0 0 1440 66"
          fill="none"
          sx={{
            '& + section[data-variant="white"]': {
              marginTop: 'calc(100vw * 0.04584020101 * -1)', // covers the svg
            },
          }}
        >
          <path
            d="M1440 0H0s341.5 103 625 29 815 37 815 37V0z"
            fill="#ffffff"
          ></path>
        </Box>
      )}
    </>
  );
}
