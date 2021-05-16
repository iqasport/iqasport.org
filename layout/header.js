import { Flex, Heading } from 'components';
import LanguageSwitcher from 'components/language-switcher';

export default function Header({ page /* lang */ }) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      as="header"
      h="60px"
      bg="white"
      position="sticky"
      top="0"
      boxShadow="md"
      zIndex={10}
      px={3}
    >
      <Heading color="iqaGreen">IQA</Heading>
      <LanguageSwitcher altLangs={page.alternate_languages} />
    </Flex>
  );
}
