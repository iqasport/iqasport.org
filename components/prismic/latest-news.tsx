import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Slice, HorizontalCard, Card, Button } from 'components';
import { Heading, Grid, Flex } from '@chakra-ui/react';
import { cardVariants } from 'components/card';
import { buttonVariants } from 'components/button';

const LatestNews = ({ posts, ...rawData }) => {
  const [firstPost, ...rest] = posts;

  const variant = get(rawData, 'primary.variant');
  const title = get(rawData, 'primary.title');
  const cta_text = get(rawData, 'primary.cta_text');

  return (
    <Slice variant={variant}>
      <Flex alignItems="center" justifyContent="space-between" mt={2} mb={4}>
        <Heading
          as="h2"
          m={0}
          id="latest-news"
          fontFamily="body"
          fontWeight="bold"
        >
          {RichText.asText(title)}
        </Heading>
        <Button
          href="/news"
          variant={buttonVariants[variant]}
          aria-labelledby="latest-news"
          rightIcon={<ArrowForwardIcon />}
        >
          {cta_text}
        </Button>
      </Flex>
      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap={8}
      >
        <HorizontalCard
          colSpan={{ base: 1, lg: 3 }}
          href={`/news/${firstPost?.uid}`}
          ariaLabel={firstPost?.data?.title}
          image={{
            src: firstPost?.data?.image?.url,
            alt: firstPost?.data?.image?.alt,
            height: firstPost?.data?.image?.height,
            width: firstPost?.data?.image?.width,
          }}
          title={firstPost?.data?.title}
          content={firstPost?.data?.synopsis}
          date={firstPost?.data?.date}
          variant={cardVariants[variant]}
        />
        {rest?.map((post) => {
          return (
            <Flex flexDirection="column" key={post?.uid}>
              <Card
                href={`/news/${post?.uid}`}
                ariaLabel={post?.data?.title}
                image={{
                  src: post?.data?.image?.url,
                  alt: post?.data?.image?.alt,
                  height: post?.data?.image?.height,
                  width: post?.data?.image?.width,
                }}
                title={post?.data?.title}
                content={post?.data?.synopsis}
                variant={cardVariants[variant]}
                date={post?.data?.date}
              />
            </Flex>
          );
        })}
      </Grid>
    </Slice>
  );
};

export default LatestNews;
