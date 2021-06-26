import { useStyleConfig, Button as ChakraButton } from '@chakra-ui/react';
import { ButtonProps } from 'components';
import ExternalLink from 'components/external-link';

export const ButtonStyles = {
  baseStyle: {
    borderRadius: 'full',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'body',
    fontWeight: 'bold',
    border: '0',
    alignItems: 'center',
    justifyContent: 'center',
    _disabled: {
      bgGradient: 'linear(to-b, overlayDisabled, overlayDisabled)',
      opacity: 1,
      cursor: 'not-allowed',
    },
    _hover: {
      bgGradient: 'linear(to-b, overlayHover, overlayHover)',
    },
    _active: {
      bgGradient: 'linear(to-b, overlayPressed, overlayPressed)',
    },
  },
  variants: {
    white: {
      bg: 'gray.50',
      color: 'iqaGreen',
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

  return (
    <ExternalLink href={href}>
      <ChakraButton __css={styles} {...rest} />
    </ExternalLink>
  );
};

export default Button;
