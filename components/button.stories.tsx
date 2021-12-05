import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stack } from '@chakra-ui/react';

import Button from './button';
import Slice from './slice';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
  <Slice variant="white">
    <Stack spacing={3}>
      <Button variant="primary">Button</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="primary" isLoading>
        Loading
      </Button>
    </Stack>
  </Slice>
);
export const White: ComponentStory<typeof Button> = () => (
  <Slice variant="primary">
    <Stack spacing={3}>
      <Button variant="white">Button</Button>
      <Button variant="white" disabled>
        Disabled
      </Button>
      <Button variant="white" isLoading>
        Loading
      </Button>
    </Stack>
  </Slice>
);
