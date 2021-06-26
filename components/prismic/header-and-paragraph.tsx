import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import { Flex, Heading, Button, Slice, Link } from 'components';

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
      {RichText.asText(title) && (
        <Heading as="h2" mt={2} textAlign={centerTitle ? 'center' : 'left'}>
          {RichText.asText(title)}
        </Heading>
      )}

      {RichText.asText(content) && (
        <>{RichText.render(content, linkResolver)}</>
      )}

      {cta_text && cta_url && (
        <Flex justifyContent="center">
          <Link href={cta_url}>
            <Button type="button">{cta_text}</Button>
          </Link>
        </Flex>
      )}
    </Slice>
  );
};

export default HeaderAndParagraph;
