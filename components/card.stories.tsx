import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Grid, Box, Flex } from '@chakra-ui/react';

import Card from './card';
import Slice from './slice';
import HorizontalCard from './horizontal-card';

export default {
  title: 'Cards',
  component: Card,
} as ComponentMeta<typeof Card>;

export const BlankCards: ComponentStory<typeof Card> = () => (
  <Slice variant="primary">
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gridGap={8}
    >
      <Card title="Blank Card" variant="white" />
      <Card
        title="Card with Content"
        variant="white"
        content={<>A load of extra content</>}
      />
      <Box />
    </Grid>
  </Slice>
);

export const PhotoCards: ComponentStory<typeof Card> = () => (
  <Slice variant="primary">
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gridGap={8}
    >
      <Card title="Blank Card" variant="white" />
      <Card
        variant="white"
        title="Card with Photo and Content"
        content={<>A load of extra content</>}
        image={{
          src: '/images/testing-image.webp',
          alt: 'Testing Image',
          height: 2500,
          width: 1500,
        }}
      />
      <Box />
    </Grid>
  </Slice>
);

export const LinkCards: ComponentStory<typeof Card> = () => (
  <Slice variant="primary">
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gridGap={8}
    >
      <Card
        title="Card with Photo and No Link"
        content={<>A load of extra content</>}
        variant="white"
        image={{
          src: '/images/testing-image.webp',
          alt: 'Testing Image',
          height: 2500,
          width: 1500,
        }}
      />
      <Card
        title="Card with Photo and Content"
        content={<>A load of extra content</>}
        href="#"
        variant="white"
        image={{
          src: '/images/testing-image.webp',
          alt: 'Testing Image',
          height: 2500,
          width: 1500,
        }}
      />
      <Box />
    </Grid>
  </Slice>
);

export const HorizontalCards: ComponentStory<typeof HorizontalCard> = () => (
  <Slice variant="primary">
    <Flex flexDirection="column" mb={5} px={{ base: 0, md: 0 }}>
      <HorizontalCard
        title="Card with Photo and No Link"
        content={<>A load of extra content</>}
        variant="white"
        image={{
          src: '/images/testing-image.webp',
          alt: 'Testing Image',
          height: 2500,
          width: 1500,
        }}
        isImageLeft={true}
      />
    </Flex>
    <Flex flexDirection="column" mb={5} px={{ base: 0, md: 0 }}>
      <HorizontalCard
        title="Card with Photo and Content"
        content={<>A load of extra content</>}
        href="#"
        variant="white"
        image={{
          src: '/images/testing-image.webp',
          alt: 'Testing Image',
          height: 2500,
          width: 1500,
        }}
        isImageLeft={false}
      />
      <Box />
    </Flex>
  </Slice>
);
