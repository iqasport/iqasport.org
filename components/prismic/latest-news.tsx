import get from 'just-safe-get';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Slice,
  HorizontalCard,
  Card,
  Heading,
  Grid,
  Flex,
  Button,
} from 'components';
import { cardVariants } from 'components/card';
import { buttonVariants } from 'components/button';

const LatestNews = ({ posts, ...rawData }) => {
  const variant = get(rawData, 'primary.variant');
  const [firstPost, ...rest] = posts;

  return (
    <Slice variant={variant}>
      <Flex alignItems="center" justifyContent="space-between" mt={2} mb={4}>
        <Heading as="h2" m={0}>
          Latest News
        </Heading>
        <Button
          href="/news"
          variant={buttonVariants[variant]}
          rightIcon={<ArrowForwardIcon />}
        >
          View more
        </Button>
      </Flex>
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
          date={firstPost?.data?.date}
          variant={cardVariants[variant]}
        />
      </Grid>
      <Grid
        pt={8}
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap={8}
      >
        {rest?.map((post) => {
          console.log(post);
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
