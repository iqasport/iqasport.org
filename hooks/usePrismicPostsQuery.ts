import { useQuery } from 'react-query';
import { getDocs } from 'modules/prismic';

type PrismicPostsQueryProps = {
  uid: string | string[];
  lang: string;
  initialData?: any;
};

function usePrismicPostsQuery({
  uid,
  lang,
  initialData,
}: PrismicPostsQueryProps) {
  const { data } = useQuery(
    ['posts', uid, lang],
    () =>
      getDocs('posts', {
        orderings: '[my.posts.date desc]',
        pageSize: 4,
        lang,
      }),
    { initialData }
  );

  return data;
}

export default usePrismicPostsQuery;
