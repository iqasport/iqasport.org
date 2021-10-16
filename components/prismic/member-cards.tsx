import { RichText, Link } from 'prismic-reactjs';
import get from 'just-safe-get';
import dynamic from 'next/dynamic';
import { InfoOutlineIcon, ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';

import { Flex, Heading, Box, Grid } from '@chakra-ui/react';
import { cardVariants } from 'components/card';

import { getPrismicDocByUid, linkResolver } from 'modules/prismic';
import { useEffect, useState } from 'react';

const Slice = dynamic(() => import('components/slice'));
const Card = dynamic(() => import('components/card'));
const Text = dynamic(() => import('components/text'));

const MIN_CARDS = 3;

const MemberCard = ({ member, variant }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      const getMember = async () => {
        const { data } = await getPrismicDocByUid('members', member.uid);

        setData(data);
      };

      getMember();
    }
  }, [data, setData, member.uid]);

  const linkProps = {
    href: Link.url(data?.link, linkResolver),
    ariaLabel: data?.title,
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  const content = (
    <>
      <Heading fontSize="3xl" fontFamily="body" mb={0} mt={0}>
        {data?.title}
      </Heading>
      <Text fontSize="sm" fontStyle="italic" mt={2}>
        <InfoOutlineIcon mr={2} color="gray.400" />
        {data?.country}
        <br />
        <StarIcon mr={2} color="gray.400" />
        {data?.membership_type}
        {data?.link?.url && (
          <>
            <br />
            <ExternalLinkIcon mr={2} color="gray.400" />
            {data?.link?.url}
          </>
        )}
      </Text>
    </>
  );

  if (!data) {
    return (
      <Flex flexDirection="column">
        <Card />
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column">
      <Card
        {...linkProps}
        content={content}
        variant={cardVariants[variant]}
        image={{
          src: data?.ngb_photo?.url,
          alt: data?.ngb_photo?.alt,
          height: data?.ngb_photo?.dimensions?.height,
          width: data?.ngb_photo?.dimensions?.width,
        }}
        logo={{
          src: data?.ngb_logo?.url,
          alt: data?.ngb_logo?.alt,
          height: data?.ngb_logo?.dimensions?.height,
          width: data?.ngb_logo?.dimensions?.width,
        }}
      />
    </Flex>
  );
};

const MemberCardsSlice = (rawData) => {
  const title = get(rawData, 'primary.title');
  const content = get(rawData, 'primary.content');
  const variant = get(rawData, 'primary.variant');
  const items = get(rawData, 'items');

  let spacers = [];

  if (items.length < MIN_CARDS) {
    spacers = new Array(MIN_CARDS - items.length).fill(0);
  }

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

      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gridGap={8}
      >
        {items.map(({ member }, i) => (
          <MemberCard
            variant={variant}
            member={member}
            key={`member-card-${i}-${member?.uid}`}
          />
        ))}
        {!!spacers.length &&
          spacers.map((_, i) => <div key={`spacer-member-cards-${i}`} />)}
      </Grid>
    </Slice>
  );
};

export default MemberCardsSlice;
