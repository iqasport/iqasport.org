import { Box } from 'components';
import { useMultiStyleConfig, StylesProvider } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const SliceStyles = {
  parts: ['slice', 'container'],
  baseStyle: (props) => ({
    slice: {
      color: mode('gray.800', 'white')(props),

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
  defaultProps: {
    size: 'md',
  },
};

export default function Slice({ size, children }) {
  const styles = useMultiStyleConfig('Slice', { size });
  return (
    <Box
      py={{ base: 4, lg: 5 }}
      px={{ base: 4, sm: 8, md: 10 }}
      as="section"
      sx={styles.slice}
    >
      <Box width="100%" my="0" mx="auto" sx={styles.container}>
        <StylesProvider value={styles}>{children}</StylesProvider>
      </Box>
    </Box>
  );
}
