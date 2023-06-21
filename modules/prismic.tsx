import { Client as PrismicClient } from '@prismicio/client';

const REPOSITORY = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME;
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};

  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

export const Client = (req = null) =>
  new PrismicClient(REPOSITORY, createClientOptions(req, API_TOKEN));

export const formatMetadata = ({
  meta_description,
  meta_title,
  meta_image,
}) => ({
  description: meta_description,
  subTitle: meta_title,
  image: meta_image?.url,
});

type GetAllByTypeOptions = PrismicClient['getByType'] extends (
  a: any,
  b: infer A
) => any
  ? A
  : never;
export type PrismicDocument = ReturnType<typeof getDocs> extends Promise<
  (infer A)[]
>
  ? A
  : never;
export const getDocs = async (
  type: string,
  options: GetAllByTypeOptions = {}
) => {
  const { results } = await Client().getByType(type, options);
  return results;
};

export const getPrismicDocByUid = (type, uid, options = {}) => {
  return Client().getByUID(type, uid, options);
};

export const PAGE_SIZE = 6;

export const linkResolver = ({ type, uid }: { type: string; uid: string }) => {
  switch (type) {
    case 'volunteer':
      return `/volunteer/${uid}`;
    case 'about':
      return `/about/${uid}`;
    case 'posts':
      return `/news/${uid}`;
    case 'events':
      return `/events/${uid}`;
    case 'pages':
      return uid === 'home' ? '/' : `/${uid}`;
    case 'news':
      return '/news';
    default:
      return `/${uid}`;
  }
};

export const manageLocal = (Locales: Array<any>, locale: string) => {
  // Languages from API response
  // // Setting Master language as default language option
  const mainLanguage = Locales[0];
  // // Sets current language based on the locale
  const currentLang = locale !== undefined ? locale : mainLanguage;
  const isMyMainLanguage = mainLanguage === currentLang;

  return { mainLanguage, currentLang, isMyMainLanguage };
};

export async function getStaticPrismicProps({
  type,
  uid,
  lang,
  locales,
  previewData,
}) {
  const { ref } = previewData;
  const [header, footer, page, posts] = await Promise.all([
    Client().getSingle('header', { lang }),
    Client().getSingle('footer', { lang }),
    getPrismicDocByUid(type, uid, { lang, ref }),
    getDocs('posts', {
      orderings: [{ field: 'my.posts.date', direction: 'desc' }],
      lang,
      pageSize: 4,
      page: 1,
    }),
  ]);

  const { currentLang, isMyMainLanguage } = manageLocal(locales, lang);
  return {
    page,
    posts,
    header: header?.data,
    footer: footer?.data,
    lang: { currentLang, isMyMainLanguage },
  };
}
