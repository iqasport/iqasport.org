import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('components/button'));
const Slice = dynamic(() => import('components/slice'));

import { Flex, Heading, Link, Box } from '@chakra-ui/react';

import { linkResolver } from 'modules/prismic';

const HeaderAndParagraph = (rawData) => {
  const title = get(rawData, 'primary.title');
  const centerTitle = get(rawData, 'primary.center_title');
  const content = get(rawData, 'primary.content');
  const variant = get(rawData, 'primary.variant');
  const cta_text = get(rawData, 'primary.cta_text');
  const cta_url = get(rawData, 'primary.cta_url');

  return (
    <Slice size="sm" variant={variant}>
      <Box
        sx={{
          '& a': {
            fontWeight: 'bold',
            textDecoration: 'none',
            color: variant === 'white' ? 'iqaGreen' : 'gray.800',
            _hover: {
              textDecoration: 'underline',
            },
          },
          '& li': {
            lineHeight: '1.5rem',
            fontSize: '1.125rem',
          },
        }}
      >
        {RichText.asText(title) && (
          <Heading
            as="h2"
            mt={2}
            textAlign={centerTitle ? 'center' : 'left'}
            fontFamily="body"
            fontWeight="bold"
          >
            {RichText.asText(title)}
          </Heading>
        )}

        {RichText.asText(content) && (
          <RichText render={content} linkResolver={linkResolver} />
        )}

        {cta_text && cta_url && (
          <Flex justifyContent="center">
            <Link href={cta_url}>
              <Button type="button">{cta_text}</Button>
            </Link>
          </Flex>
        )}
      </Box>
    </Slice>
  );
};

export default HeaderAndParagraph;
