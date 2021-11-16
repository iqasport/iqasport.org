import { RichText } from 'prismic-reactjs';
import dynamic from 'next/dynamic';

import { Flex, Heading, Box } from '@chakra-ui/react';
import { cardVariants } from 'components/card';

import { getPrismicDocByUid, linkResolver } from 'modules/prismic';
import { useEffect, useState } from 'react';

const Slice = dynamic(() => import('components/slice'));
const Card = dynamic(() => import('components/card'));
const HorizontalCard = dynamic(() => import('components/horizontal-card'));

const NewsCard = ({ post, variant }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      const getPost = async () => {
        const { data } = await getPrismicDocByUid('posts', post.uid);

        setData(data);
      };

      getPost();
    }
  }, [data, setData, post.uid]);

  if (!data) {
    return (
      <Flex flexDirection="column" mb={5}>
        <Card />
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" mb={5}>
      <HorizontalCard
        variant={cardVariants[variant]}
        href={`/news/${post?.uid}`}
        ariaLabel={data?.title}
        image={{
          src: data?.image?.url,
          alt: data?.image?.alt,
          height: data?.image?.height,
          width: data?.image?.width,
        }}
        title={data?.title}
        content={data?.synopsis}
        date={data?.date}
      />
    </Flex>
  );
};

const NewsCardSlice = ({ primary, items }) => {
  const { title, content, variant } = primary;

  return (
    <Slice variant={variant}>
      {RichText.asText(title) && (
        <Heading
          as="h2"
          mt={2}
          textAlign="center"
          px={{ base: 0, md: 9 }}
          fontFamily="body"
        >
          {RichText.asText(title)}
        </Heading>
      )}

      {content && (
        <Box textAlign="center" pb={3} px={{ base: 0, md: 9 }}>
          <RichText render={content} linkResolver={linkResolver} />
        </Box>
      )}

      {items.map(({ post }, i) => (
        <NewsCard
          variant={variant}
          post={post}
          key={`news-card-${i}-${post?.uid}`}
        />
      ))}
    </Slice>
  );
};

export default NewsCardSlice;
