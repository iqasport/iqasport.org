import { RichText } from 'prismic-reactjs';
import get from 'just-safe-get';
import dynamic from 'next/dynamic';

import { Flex, Heading, Box } from '@chakra-ui/react';
import { cardVariants } from 'components/card';
import { useRouter } from 'next/router';

import { getPrismicDocByUid, linkResolver } from 'modules/prismic';
import { useEffect, useState } from 'react';
import { InfoOutlineIcon, TimeIcon } from '@chakra-ui/icons';
import formatLocale from 'modules/dates';

const LEVEL_DATA = {
  Junior: {
    time: 'A few hours a week',
    color: 'orange.300',
  },
  'Team Lead': {
    time: '3-5 hours a week',
    color: 'yellow.300',
  },
  Manager: {
    time: '5-8 hours a week',
    color: 'purple.400',
  },
  Director: {
    time: '10+ hours a week',
    color: 'blue.300',
  },
  Trustee: {
    time: 'As needed',
    color: 'iqaGreen',
  },
};

const Slice = dynamic(() => import('components/slice'));
const Card = dynamic(() => import('components/card'));
const Text = dynamic(() => import('components/text'));
const HorizontalCard = dynamic(() => import('components/horizontal-card'));

const RoleCard = ({ role, isImageLeft, variant }) => {
  const [data, setData] = useState(null);
  const { locale } = useRouter();

  useEffect(() => {
    if (!data) {
      const getRole = async () => {
        const { data } = await getPrismicDocByUid('roles', role.uid, {
          lang: locale,
        });

        setData(data);
      };

      getRole();
    }
  }, [data, setData, role.uid, locale]);

  if (!data) {
    return (
      <Flex flexDirection="column" mb={5}>
        <Card />
      </Flex>
    );
  }

  const content = (
    <>
      {data?.level && (
        <div>
          <Text
            as="span"
            textTransform="uppercase"
            py={1}
            px={4}
            width="max-content"
            fontWeight="bold"
            fontSize="xs"
            bg={LEVEL_DATA[data?.level]?.color}
            borderLeftRadius="full"
            borderColor="gray.800"
            borderWidth="1px"
            borderStyle="solid"
            borderRightWidth="0px"
          >
            {data?.level}
          </Text>
          <Text
            borderColor="gray.800"
            borderWidth="1px"
            borderStyle="solid"
            as="span"
            textTransform="uppercase"
            py={1}
            px={4}
            width="max-content"
            fontWeight="bold"
            fontSize="xs"
            bg={LEVEL_DATA[data?.level]?.color}
            borderRightRadius="full"
          >
            {LEVEL_DATA[data?.level]?.time}
          </Text>
        </div>
      )}

      <Heading as="h2" fontSize="xl" fontFamily="body" mb={0}>
        {data?.title}
      </Heading>

      <Text fontSize="sm" fontStyle="italic" mt={2}>
        <InfoOutlineIcon mr={1} /> {data?.department}{' '}
        {data?.team && <>· {data.team}</>}
        {data?.close_date && (
          <>
            <br />
            <TimeIcon mr={1} /> Applications close{' '}
            {formatLocale({ date: new Date(data?.close_date), locale })}
          </>
        )}
      </Text>
      <RichText render={data?.description} linkResolver={linkResolver} />
    </>
  );

  return (
    <Flex flexDirection="column" mb={5}>
      <HorizontalCard
        variant={cardVariants[variant]}
        ariaLabel={data?.title}
        isImageLeft={isImageLeft}
        image={{
          src: data?.image?.url,
          alt: data?.image?.alt,
          height: data?.image?.height,
          width: data?.image?.width,
        }}
        href="/volunteer#volunteer-form"
        content={content}
      />
    </Flex>
  );
};

const RoleCardSlice = (rawData) => {
  const title = get(rawData, 'primary.title');
  const content = get(rawData, 'primary.content');
  const variant = get(rawData, 'primary.variant');
  const items = get(rawData, 'items');

  return (
    <Slice variant={variant}>
      {RichText.asText(title) && (
        <Heading
          as="h2"
          mt={2}
          textAlign="center"
          px={{ base: 0, md: 9 }}
          fontFamily="body"
        >
          {RichText.asText(title)}
        </Heading>
      )}

      {content && (
        <Box textAlign="center" pb={3} px={{ base: 0, md: 9 }}>
          <RichText render={content} linkResolver={linkResolver} />
        </Box>
      )}

      {items.map((item, i) => {
        const isImageLeft = item?.layout_content === 'image-left';

        return (
          <RoleCard
            variant={variant}
            role={item.role}
            isImageLeft={isImageLeft}
            key={`role-card-${i}-${item?.role?.uid}`}
          />
        );
      })}
    </Slice>
  );
};

export default RoleCardSlice;
