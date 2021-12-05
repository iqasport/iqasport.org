import NextImage from 'next/image';
import { Box } from '@chakra-ui/react';

const ImageWithDefaults = ({ alt, src, borderRadius = '2xl', ...props }) => {
  return (
    <Box sx={{ '& img': { borderRadius } }}>
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
