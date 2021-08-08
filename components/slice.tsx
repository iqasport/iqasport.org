import { Box } from 'components';
import { useMultiStyleConfig, StylesProvider } from '@chakra-ui/react';
// import { mode } from '@chakra-ui/theme-tools';
const backgroundImage = '/images/bg.png';

export const SliceStyles = {
  parts: ['slice', 'container'],
  baseStyle: {
    slice: {
      a: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'iqaGreen',
        _hover: {
          textDecoration: 'underline',
          color: 'iqaGreen',
        },
      },
    },
  },
  sizes: {
    sm: {
      container: {
        maxWidth: '768px',
      },
    },
    md: {
      container: {
        maxWidth: '1280px',
      },
    },
    full: {
      container: {
        maxWidth: '100%',
        px: 0,
      },
    },
  },
  variants: {
    primary: {
      background: 'iqaGreen',
      color: 'white',
      bgImage: `url(${backgroundImage})`,
      bgAttachment: 'fixed',
      bgSize: '100%',
      marginTop: '-1px', // covers awkward 1/2 pixel gap at certain sizes
      zIndex: '1',
    },
    white: {
      background: 'gray.100',
      color: 'gray.800',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'white',
  },
};

type SliceType = {
  size?: string;
  variant?: string;
  children: React.ReactNode;
};

// The slice component is the grand wrapper around all individual Prismic Components
// It sets a baseline container and padding to make everything conform.
//
// It also does a few clever things to make sure the svg section dividers behave as expected
// using the "data-variant" to do pseudo selections to show the svgs only at the end of sets of a variant
// So tl,dr; Don't mess with these unless you know what you're doing!
// Otherwise keep calm and carry on

export default function Slice({
  size = 'md',
  variant = 'white',
  children,
}: SliceType): React.ReactElement {
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
          data-type="wave"
          position="relative"
          bg="gray.100"
          sx={{
            '& + section[data-variant="white"], & + section[data-type="banner"]':
              {
                bg: 'gray.100',
                marginTop: 'calc(100vw * 0.04583705357 * -1)', // covers the svg
                zIndex: 1,
              },
          }}
        >
          <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="wave1" clipPathUnits="objectBoundingBox">
                <path
                  d="M0,1 V0 C0.166,0.788,0.301,0.871,0.395,0.792 C0.486,0.715,0.528,0.492,0.623,0.402 C0.749,0.28,0.876,0.48,1,1"
                  fill="#EDF2F7"
                />
              </clipPath>
            </defs>
          </svg>
          <Box
            width="100%"
            backgroundColor="iqaGreen"
            backgroundRepeat="no-repeat"
            backgroundSize="fixed"
            clipPath="url(#wave1)"
            bgImage={`url(${backgroundImage})`}
            bgAttachment="fixed"
            bgSize="100%"
            height="calc(100vw * 0.04583705357)"
          />
        </Box>
      )}

      {!isWhiteVariant && (
        <Box
          data-type="wave"
          position="relative"
          bg="gray.100"
          sx={{
            '& + section[data-variant="primary"], & + section[data-type="banner"]':
              {
                backgroundColor: 'iqaGreen',
                backgroundRepeat: 'no-repeat',
                bgImage: `url(${backgroundImage})`,
                bgSize: '100%',
                bgAttachment: 'fixed',
                marginTop: 'calc(100vw * 0.04583705357 * -1)', // covers the svg
                zIndex: 1,
              },
          }}
        >
          <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="wave2" clipPathUnits="objectBoundingBox">
                <path
                  d="M1,0 C0.82,0.72,0.605,1,0.361,0.924 C0.23,0.779,0.109,0.441,0,0"
                  fill="#EDF2F7"
                />
              </clipPath>
            </defs>
          </svg>
          <Box
            width="100%"
            backgroundColor="iqaGreen"
            backgroundRepeat="no-repeat"
            backgroundSize="fixed"
            clipPath="url(#wave2)"
            bgImage={`url(${backgroundImage})`}
            bgAttachment="fixed"
            bgSize="100%"
            height="calc(100vw * 0.04583705357)"
            marginTop="-19px"
          />
        </Box>
      )}
    </>
  );
}
