export default function Scripts() {
  return (
    <script
      defer
      src={`//static.cdn.prismic.io/prismic.js?${process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME}&new=true`}
    />
  );
}
