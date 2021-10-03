import { Heading, Container, Box, Flex } from '@chakra-ui/react';
import { Text } from 'components';
import Image from 'next/image';
import formatLocale from 'modules/dates';
import { useRouter } from 'next/router';

const NewsHero = ({ title, date, category, image }) => {
  const { locale } = useRouter();

  return (
    <Box width="100%">
      <Container
        px={{ base: 4, sm: 8, md: 10 }}
        textAlign="center"
        maxWidth="768px"
      >
        <Flex justifyContent="center" alignItems="center">
          <Text fontWeight="bold" mr={4}>
            {category}
          </Text>
          <Text>
            {formatLocale({
              date: new Date(date),
              locale,
            })}
          </Text>
        </Flex>
        <Heading as="h1" textAlign="center" mt={0}>
          {title}
        </Heading>
      </Container>
      <Container maxWidth="768px">
        <Image
          layout="responsive"
          src={image?.url}
          alt={image?.alt}
          priority={true}
          width={image?.dimensions?.width}
          height={image?.dimensions?.height}
        />
        {image?.copyright && (
          <Box p={2} mt={2}>
            <Text as="em" fontStyle="italic" fontSize="sm">
              Photo Credit: <strong>{image?.copyright}</strong>
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NewsHero;
