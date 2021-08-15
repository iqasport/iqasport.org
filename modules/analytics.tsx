import Script from 'next/script';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (process.env.NODE_ENV !== 'development') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_TOKEN, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (process.env.NODE_ENV !== 'development') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

// Global Site Tag (gtag.js) - Google Analytics
const GTag = () => (
  <>
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TOKEN}`}
    />

    <Script strategy="lazyOnload">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TOKEN}', {
            page_path: window.location.pathname,
          });
        `}
    </Script>
  </>
);

export default GTag;
