import { Box } from 'components';
import { useMultiStyleConfig, StylesProvider } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
const backgroundImage = '/images/rwc-bg.png';

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
      background: 'iqaGreen',
      color: 'black',
      bgImage: `url(${backgroundImage})`,
      bgAttachment: 'fixed',
      bgRepeat: 'none',
      bgSize: '100%',
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

// The slice component is the grand wrapper around all individual Prismic Components
// It sets a baseline container and padding to make everything conform.
//
// It also does a few clever things to make sure the svg section dividers behave as expected
// using the "data-variant" to do pseudo selections to show the svgs only at the end of sets of a variant
// So tl,dr; Don't mess with these unless you know what you're doing!
// Otherwise keep calm and carry on

export default function Slice({ size, variant = 'white', children }) {
  const styles = useMultiStyleConfig('Slice', { size, variant });
  const isWhiteVariant = variant === 'white';

  return (
    <>
      <Box
        as="section"
        __css={styles}
        data-variant={isWhiteVariant ? 'white' : 'primary'}
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
          bgImage={`url(${backgroundImage})`}
          bgAttachment="fixed"
          bgRepeat="none"
          bgSize="100%"
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

      {!isWhiteVariant && (
        <Box
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 1440 66"
          bgImage={`url(${backgroundImage})`}
          bgAttachment="fixed"
          bgRepeat="none"
          bgSize="100%"
          sx={{
            '& + section[data-variant="primary"]': {
              marginTop: 'calc(100vw * 0.04584020101 * -1)', // covers the svg
            },
          }}
        >
          <path
            d="m0,0c0,0 293,68 704,58c411,-10 674,-28 740,-60c66,-32 50,95 50,95c0,0 -33,9 -33,9c0,0 -1485,0 -1485,0c0,0 24,-102 24,-102z"
            fill="#ffffff"
          />
        </Box>
      )}
    </>
  );
}
