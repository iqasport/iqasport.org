import get from 'just-safe-get';
import { Slice, HorizontalCard, Card, Heading, Grid, Flex } from 'components';
import { cardVariants } from 'components/card';

const LatestNews = ({ posts, ...rawData }) => {
  const variant = get(rawData, 'primary.variant');
  const [firstPost, ...rest] = posts;

  return (
    <Slice variant={variant}>
      <Heading as="h2" mt={2}>
        Latest News
      </Heading>
      <Grid>
        <HorizontalCard
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
          variant={cardVariants[variant]}
        />
      </Grid>
      <Grid
        pt={8}
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap={8}
      >
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
              />
            </Flex>
          );
        })}
      </Grid>
    </Slice>
  );
};

export default LatestNews;
