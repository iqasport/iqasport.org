import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import NextImage from 'next/image';
import { chakra } from '@chakra-ui/react';

const Image = chakra(NextImage, {
  baseStyle: {
    maxH: 120,
    maxW: 120,
    objectFit: 'cover',
    objectPosition: 'center center',
    borderRadius: '2xl',
  },
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'objectFit',
      'objectPosition',
      'onLoad',
      'layout',
      'priority',
    ].includes(prop),
});

const animationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const FadeInImage = ({ alt, src, ...props }) => {
  const [loaded, setLoaded] = useState(props.priority || false);
  const animationControls = useAnimation();

  useEffect(() => {
    if (loaded) {
      animationControls.start('visible');
    }
  }, [loaded, animationControls]);
  return (
    <motion.div
      initial={'hidden'}
      animate={animationControls}
      variants={animationVariants}
      transition={{ ease: 'easeOut', duration: 0.1 }}
    >
      <Image src={src} alt={alt} {...props} onLoad={() => setLoaded(true)} />
    </motion.div>
  );
};

export default FadeInImage;
