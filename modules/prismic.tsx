import Prismic from '@prismicio/client';
import {
  Hero,
  HeaderAndParagraph,
  Images,
  ImageAndContent,
  Cards,
  Embed,
  EmbedAndContent,
  Banner,
  HorizontalCards,
  LatestNews,
  Carousel,
  MemberCards,
  ContactForm,
  WorldMap,
  NewsCards,
} from 'components/prismic';

const REPOSITORY = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`;
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
  Prismic.client(REF_API_URL, createClientOptions(req, API_TOKEN));

export const formatMetadata = ({
  meta_description,
  meta_title,
  meta_image,
}) => ({
  description: meta_description,
  subTitle: meta_title,
  image: meta_image?.url,
});

export const getDocs = async (type, options = {}) => {
  const { results } = await Client().query(
    Prismic.Predicates.at('document.type', type),
    options
  );
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

const slices = {
  hero: Hero,
  header_and_paragraph: HeaderAndParagraph,
  images: Images,
  embed: Embed,
  image_and_content: ImageAndContent,
  cards: Cards,
  embed_and_content: EmbedAndContent,
  latest_news: LatestNews,
  horizontal_card: HorizontalCards,
  banner: Banner,
  carousel: Carousel,
  member_card: MemberCards,
  contact_form: ContactForm,
  world_map: WorldMap,
  news_card: NewsCards,
};

type PrismicSliceProps = {
  sections: Array<any>;
  posts?: Array<any>;
};

export function PrismicSlice({ sections, posts }: PrismicSliceProps) {
  return sections.map((section, i) => {
    const Component = slices[section.slice_type];

    if (!Component) {
      console.warn('Missing Prismic Component ID: ', section.slice_type);
      console.warn(section);
      return null;
    }

    return <Component key={`prismic-${i}`} {...section} posts={posts} />;
  });
}

export async function getStaticPrismicProps({
  type,
  uid,
  lang,
  locales,
  previewData,
}) {
  const { ref } = previewData;
  const page = await getPrismicDocByUid(type, uid, { lang, ref });

  const posts = await getDocs('posts', {
    orderings: '[my.posts.date desc]',
    lang,
    pageSize: 4,
    page: 1,
  });

  const { currentLang, isMyMainLanguage } = manageLocal(locales, lang);
  return { page, posts, lang: { currentLang, isMyMainLanguage } };
}
