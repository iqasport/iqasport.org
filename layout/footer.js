import { Box, Image, Text, Flex } from 'components';
const backgroundImage = '/images/rwc-bg.png';
const logo = '/images/logo_short_monochrome_white.png';

export default function Footer() {
  return (
    <>
      <Box bg="white" height="200px" />
      <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1440 66"
        bgImage={`url(${backgroundImage})`}
        bgAttachment="fixed"
        bgRepeat="none"
        bgSize="100%"
      >
        <path
          d="m-9,-24c0,0 2,89 2,89c0,0 67,-54 605,-60c538,-6 847,59 847,59c0,0 28,-91 28,-91c0,0 -1482,3 -1482,3z"
          fill="#ffffff"
        />
      </Box>
      <Box as="footer">
        <Flex
          bgImage={`url(${backgroundImage})`}
          bgAttachment="fixed"
          bgRepeat="none"
          bgSize="100%"
          px={{ base: 4, sm: 8, md: 10 }}
          justifyContent="center"
        >
          <Flex justifyContent="center" alignItems="center" maxWidth="1280px">
            <Image
              src={logo}
              priority={true}
              layout="fixed"
              alt="IQA Logo"
              height={200}
              width={200}
            />
            <Text color="white">
              IQA and its activities are not licensed by, sponsored by or
              associated with Warner Bros., J.K. Rowling or their affiliates.
              &apos;Quidditch&apos;, &apos;Harry Potter&apos;, and all related
              names, characters and indicia are trademarks of and © Warner Bros.
              - Harry Potter publishing rights © J.K. Rowling
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
