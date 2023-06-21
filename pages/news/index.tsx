import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Flex, Grid, Box, Heading } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import {
  PAGE_SIZE,
  Client,
  PrismicDocument,
  manageLocal,
} from 'modules/prismic';

import {
  QueryClientProvider,
  QueryClient,
  useInfiniteQuery,
} from 'react-query';

const queryClient = new QueryClient();

const Meta = dynamic(() => import('components/meta'));
const Button = dynamic(() => import('components/button'));
const Card = dynamic(() => import('components/card'));
const Container = dynamic(() => import('components/container'));

const getPagedDocs = ({ pageParam = 0, lang }) =>
  Client().getByType('posts', {
    orderings: [{ field: 'my.posts.date', direction: 'desc' }],
    pageSize: PAGE_SIZE,
    page: pageParam,
    lang,
  });

export const LoadMore = ({ fetchNextPage, label }) => {
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Flex alignItems="center" justifyContent="center" py={5} ref={ref}>
      <Button variant="primary">{label}</Button>
    </Flex>
  );
};

const News = ({
  page,
  posts: initialPosts = [],
  lang,
}: {
  page: PrismicDocument;
  posts: PrismicDocument[];
  lang: any;
}) => {
  const [showLoadMore, setShowLoadMore] = useState(true);

  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    ['news', lang?.currentLang],
    ({ pageParam }: { pageParam?: number }) =>
      getPagedDocs({ pageParam: pageParam ?? 1, lang: lang?.currentLang }),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
    }
  );

  const posts =
    data?.pages?.flatMap(({ results }) => results).flat() || initialPosts;

  useEffect(() => {
    if (
      posts?.length % PAGE_SIZE !== 0 ||
      posts?.length === 0 ||
      data?.pages[data?.pages?.length - 1]?.results?.length === 0
    ) {
      setShowLoadMore(false);
    }
  }, [posts, data]);

  return (
    <Box bg="gray.100">
      <Meta subTitle={page?.data?.title} />
      <Container bg="gray.100" pb={6} px={{ base: 4, md: 8, lg: 9 }}>
        <Heading fontFamily="body">{page?.data?.title}</Heading>
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gridGap={8}
        >
          {posts?.map((post) => {
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
                  variant={'white'}
                  date={post?.data?.date}
                />
              </Flex>
            );
          })}
        </Grid>
        {isFetching && (
          <Flex
            alignItems="center"
            justifyContent="center"
            py={5}
            color="iqaGreen"
          >
            Loading...
          </Flex>
        )}

        {showLoadMore && !isFetching && (
          <LoadMore
            fetchNextPage={fetchNextPage}
            label={page?.data?.load_more_label}
          />
        )}
      </Container>
    </Box>
  );
};

const NewsWrapper = (props) => (
  <QueryClientProvider client={queryClient}>
    <News {...props} />
  </QueryClientProvider>
);

export const getStaticProps = async ({ locale, locales }) => {
  const page = await Client().getSingle('news', { lang: locale });
  const { results: posts } = await getPagedDocs({
    pageParam: 1,
    lang: locale,
  });
  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: { page, posts, lang: { currentLang, isMyMainLanguage } },
    revalidate: 1,
  };
};

export default NewsWrapper;
