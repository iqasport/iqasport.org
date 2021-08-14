import { useQuery } from 'react-query';
import { getPrismicDocByUid } from 'modules/prismic';

type PrismicQueryProps = {
  type: string;
  uid: string | string[];
  lang: string;
  initialData?: any;
};

function usePrismicQuery({ type, uid, lang, initialData }: PrismicQueryProps) {
  const { data } = useQuery(
    [type, uid, lang],
    () => getPrismicDocByUid(type, uid, { lang }),
    { initialData }
  );

  return data;
}

export default usePrismicQuery;
