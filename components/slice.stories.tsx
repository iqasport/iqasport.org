import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SliceComponent from './slice';

export default {
  title: 'Slice',
  component: SliceComponent,
} as ComponentMeta<typeof SliceComponent>;

export const Slice: ComponentStory<typeof SliceComponent> = () => (
  <>
    <SliceComponent variant="primary" size="sm">
      <Heading as="h2" fontFamily="body">
        Slices
      </Heading>
      <Text>
        The IQA Website uses a Headless CMS called <code>Prismic</code> (Not to
        be confused with the Database-ORM <code>Prisma</code>). The CMS sends an
        array of Slices - visually thought of as blocks - of our different
        content types, all of which are individually wrapped with our{' '}
        <code>Slice</code> component.
      </Text>
      <Text>
        Slices can have a variant of either <code>primary</code> or{' '}
        <code>white</code> which determines the color scheme, and a size for the
        content container - <code>&apos;sm&apos;</code> (good for text),{' '}
        <code>&apos;md&apos;</code> which is our standard width, and{' '}
        <code>&apos;full&apos;</code> which allows the content to span the full
        width of the slice.
      </Text>
    </SliceComponent>

    <SliceComponent variant="white" size="sm">
      <Text>
        The slice component allows consistent styling for all our CMS content,
        and wraps most of our components.
      </Text>
      <Text>
        It also contains logic for transitioning between different slice
        variants and hides the transition svgs if the following slice is of the
        same variant. Like for example this slice is followed by another white
        Slice.
      </Text>
    </SliceComponent>

    <SliceComponent variant="white" size="sm">
      <Text>
        So it does not display the svg to transition to the primary variant. But
        the next one is so it includes the wave svg
      </Text>
    </SliceComponent>

    <SliceComponent variant="primary" size="sm">
      <Text>
        It also does not display the svg if it is the last slice of the page
      </Text>
    </SliceComponent>
  </>
);
