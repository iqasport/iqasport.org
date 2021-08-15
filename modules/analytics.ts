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
