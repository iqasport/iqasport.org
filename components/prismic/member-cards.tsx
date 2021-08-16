import { RichText, Link } from 'prismic-reactjs';
import get from 'just-safe-get';

import { Flex, Heading, Box, Slice, Card, Grid, Text } from 'components';
import { cardVariants } from 'components/card';

import { getPrismicDocByUid, linkResolver } from 'modules/prismic';
import { useEffect, useState } from 'react';

const MIN_CARDS = 3;

const MemberCardsSlice = (rawData) => {
  const [members, setMembers] = useState([]);

  const title = get(rawData, 'primary.title');
  const content = get(rawData, 'primary.content');
  const variant = get(rawData, 'primary.variant');
  const items = get(rawData, 'items') || [];

  useEffect(() => {
    const getMembers = async () => {
      const membersPromises = items.map(({ member }) =>
        getPrismicDocByUid('members', member.uid)
      );

      const settled = await Promise.all(membersPromises);
      setMembers(settled);
    };

    getMembers();
  }, [items, setMembers, getPrismicDocByUid]);

  let spacers = [];

  if (members.length < MIN_CARDS) {
    spacers = new Array(MIN_CARDS - members.length).fill(0);
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
        {members.map(({ data }, i) => {
          const linkProps = {
            href: Link.url(data?.link, linkResolver),
            ariaLabel: data?.title,
            target: '_blank',
            rel: 'noopener noreferrer',
          };

          const content = (
            <Text>
              <strong>Country:</strong> {data?.country}
              <br />
              <strong>Web:</strong> {data?.link?.url}
            </Text>
          );

          return (
            <Flex
              flexDirection="column"
              key={`cards-${i}-${data?.title}-${data?.content}`}
            >
              <Card
                {...linkProps}
                title={data?.title}
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
        })}
        {!!spacers.length &&
          spacers.map((space, i) => <div key={`spacer-${i}`} />)}
      </Grid>
    </Slice>
  );
};

export default MemberCardsSlice;
