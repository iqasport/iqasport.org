import dynamic from 'next/dynamic';

import { Box, Grid } from '@chakra-ui/react';

const Slice = dynamic(() => import('components/slice'));
const Text = dynamic(() => import('components/text'));
const Image = dynamic(() => import('components/image'));

const Item = ({ item }) => {
  const { height, width } = item.image?.dimensions;

  return (
    <Box>
      {item?.image?.url && (
        <Image
          alt={item.image?.alt}
          src={item.image?.url}
          layout="responsive"
          height={height}
          width={width}
        />
      )}

      <Box p={2} mt={0}>
        <Text as="em" fontStyle="italic" fontSize="sm">
          {item.support && (
            <>
              {item.support}
              <br />
            </>
          )}

          {item?.image?.copyright && (
            <>
              Photo Credit: <strong>{item?.image?.copyright}</strong>
            </>
          )}
        </Text>
      </Box>
    </Box>
  );
};

const Images = ({ items, primary }) => {
  const { variant, size } = primary;

  const multipleImages = items.length > 1;

  return (
    <Slice variant={variant} size={size}>
      <Grid
        gridTemplateColumns={{
          base: '1fr',
          md: `${multipleImages ? '1fr 1fr' : '1fr'}`,
        }}
        gridGap={{ base: 4, md: 9 }}
      >
        {items.map((item, i) => (
          <Item key={`image-slice-${item?.image?.url}-${i}`} item={item} />
        ))}
      </Grid>
    </Slice>
  );
};

export default Images;
