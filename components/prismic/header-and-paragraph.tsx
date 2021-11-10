import { RichText, RichTextBlock } from 'prismic-reactjs';
import dynamic from 'next/dynamic';
import { Slice as TSlice, SelectField, KeyTextField } from '@prismicio/types';

const Button = dynamic(() => import('components/button'));
const Slice = dynamic(() => import('components/slice'));

import { Flex, Heading, Link, Box } from '@chakra-ui/react';

import { linkResolver } from 'modules/prismic';
import { ReactElement } from 'react';

type PrimaryProps = {
  title: RichTextBlock[];
  center_title: boolean;
  content: RichTextBlock[];
  variant: SelectField;
  cta_text: KeyTextField;
  cta_url: string;
};

const HeaderAndParagraph = (rawData: TSlice): ReactElement => {
  const { title, center_title, content, variant, cta_text, cta_url } =
    rawData?.primary as unknown as PrimaryProps;

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
            textAlign={center_title ? 'center' : 'left'}
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
