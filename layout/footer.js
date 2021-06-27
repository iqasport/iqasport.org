import { Box, Image, Text, Flex } from 'components';
const backgroundImage = '/images/bg.png';
const logo = '/images/logo_short_monochrome_white.png';

export default function Footer() {
  return (
    <>
      <Box bg="white" height="200px" />
      <Box position="relative" bg="white">
        <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="wavefooter" clipPathUnits="objectBoundingBox">
              <path
                d="M1,1 C0.82,0.28,0.605,-0.192,0.361,0.076 c-0.131,0.145,-0.252,0.483,-0.361,0.924"
                fill="#fff"
              />
            </clipPath>
          </defs>
        </svg>
        <Box
          width="100%"
          backgroundColor="iqaGreen"
          backgroundRepeat="no-repeat"
          backgroundSize="fixed"
          clipPath="url(#wavefooter)"
          bgImage={`url(${backgroundImage})`}
          bgAttachment="fixed"
          bgSize="100%"
          height="calc(100vw * 0.04583705357)"
        />
      </Box>
      <Box as="footer" zIndex="1" marginTop="-1px">
        <Flex
          bgImage={`url(${backgroundImage})`}
          bgAttachment="fixed"
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
