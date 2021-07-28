import { useStyleConfig, Text as ChakraText } from '@chakra-ui/react';

const Text = (props) => {
  const styles = useStyleConfig('Text');
  return <ChakraText __css={styles} {...props} />;
};

export default Text;
