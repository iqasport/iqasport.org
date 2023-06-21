import NextImage from 'next/image';
import { Box } from '@chakra-ui/react';

const ImageWithDefaults = ({ alt, src, ...props }) => {
  return (
    <Box
      sx={{
        '& img': {
          borderRadius: props?.borderRadius ?? '2xl',
          clipPath: props?.clipPath ?? 'initial',
        },
      }}
    >
      <NextImage
        src={src}
        alt={alt}
        objectFit="cover"
        objectPosition="center center"
        {...props}
      />
    </Box>
  );
};

export default ImageWithDefaults;
