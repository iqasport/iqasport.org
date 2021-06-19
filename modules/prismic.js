import Prismic from '@prismicio/client';
import {
  Hero,
  HeaderAndParagraph,
  Images,
  // ImageAndContent,
  // Cards,
  Embed,
  EmbedAndContent,
  // TwoColumnTable,
  // HorizontalCard,
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
  image: meta_image.url,
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

export const linkResolver = ({ type, uid }) => {
  switch (type) {
    case 'volunteer':
      return `/volunteer/${uid}`;
    case 'about':
      return `/about/${uid}`;
    case 'posts':
      return `/news/${uid}`;
    case 'pages':
      return uid === 'home' ? '/' : `/${uid}`;
    default:
      return `/${uid}`;
  }
};

export const manageLocal = (Locales, locale) => {
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
  // image_and_content: ImageAndContent,
  // cards: Cards,
  embed: Embed,
  embed_and_content: EmbedAndContent,
  // two_column_table: TwoColumnTable,
  // horizontal_card: HorizontalCard,
};

export function PrismicSlice(sections, posts) {
  return sections.map((section, i) => {
    const Component = slices[section.slice_type];

    if (!Component) {
      console.warn('Missing Prismic Component ID: ', section.slice_type);
      return null;
    }

    return <Component key={`prismic${i}`} {...section} posts={posts} />;
  });
}
