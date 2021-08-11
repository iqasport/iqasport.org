import { useStyleConfig, Button as ChakraButton, Box } from '@chakra-ui/react';
import { ButtonProps } from 'components';
import ExternalLink from 'components/external-link';

export const ButtonStyles = {
  baseStyle: {
    borderRadius: 'full',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'body',
    fontWeight: 'normal',
    border: '0',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    _disabled: {
      bgGradient: 'linear(to-b, overlayDisabled, overlayDisabled)',
      opacity: 1,
      cursor: 'not-allowed',
    },
    _hover: {
      transform: 'scale(1.03)',
      bgGradient: 'linear(to-b, overlayHover, overlayHover)',
    },
    _active: {
      bgGradient: 'linear(to-b, overlayPressed, overlayPressed)',
    },
  },
  variants: {
    white: {
      bg: 'gray.50',
      color: 'gray.800',
    },
    primary: {
      bg: 'iqaGreen',
      color: 'white',
    },
  },
};

export const buttonVariants = {
  white: 'primary',
  primary: 'white',
};

interface ButtonTypes extends ButtonProps {
  href?: string;
}

const Button = ({ variant, href, ...rest }: ButtonTypes) => {
  const styles = useStyleConfig('Button', { variant });
  const Wrapper = href ? ExternalLink : Box;

  return (
    <Wrapper href={href}>
      <ChakraButton __css={styles} {...rest} />
    </Wrapper>
  );
};

export default Button;
