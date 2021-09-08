export default function ErrorComponent({ crash }) {
  if (crash) {
    throw Error;
  }

  return <></>;
}
