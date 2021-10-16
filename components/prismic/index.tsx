import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('components/prismic/hero'));
const HeaderAndParagraph = dynamic(
  () => import('components/prismic/header-and-paragraph')
);
const Images = dynamic(() => import('components/prismic/images'));
const ImageAndContent = dynamic(
  () => import('components/prismic/image-and-content')
);
const Cards = dynamic(() => import('components/prismic/cards'));
const Embed = dynamic(() => import('components/prismic/embed'));
const EmbedAndContent = dynamic(
  () => import('components/prismic/embed-and-content')
);
const HorizontalCards = dynamic(
  () => import('components/prismic/horizontal-cards')
);
const LatestNews = dynamic(() => import('components/prismic/latest-news'));
const Banner = dynamic(() => import('components/prismic/banner'));
const Carousel = dynamic(() => import('components/prismic/carousel'));
const MemberCards = dynamic(() => import('components/prismic/member-cards'));
const ContactForm = dynamic(() => import('components/prismic/contact-form'));
const WorldMap = dynamic(() => import('components/prismic/world-map'));
const NewsCards = dynamic(() => import('components/prismic/news-cards'));

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
  // world_map: WorldMap,
  news_card: NewsCards,
};

type PrismicSliceProps = {
  sections: Array<any>;
  posts?: Array<any>;
};

function PrismicSlice({ sections, posts }: PrismicSliceProps) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = slices[section.slice_type];

        if (!Component) {
          console.warn('Missing Prismic Component ID: ', section.slice_type);
          console.warn(section);
          return null;
        }

        return <Component key={`prismic-${i}`} {...section} posts={posts} />;
      })}
    </>
  );
}

export default PrismicSlice;
