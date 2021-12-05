import NextImage from 'next/image';
import { Box } from '@chakra-ui/react';

const ImageWithDefaults = ({ alt, src, borderRadius, clipPath, ...props }) => {
  return (
    <Box sx={{ '& img': { borderRadius: borderRadius ?? '2xl', clipPath } }}>
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
