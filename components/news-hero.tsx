import { Heading, Container, Box, Text, Flex, Image } from 'components';
import format from 'date-fns/format';

const NewsHero = ({ title, date, category, image }) => (
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
        <Text>{format(new Date(date), 'd MMMM, yyyy')}</Text>
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
        width={image?.dimensions?.width}
        height={image?.dimensions?.height}
        borderRadius={{ base: 'none', md: '2xl' }}
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

export default NewsHero;
