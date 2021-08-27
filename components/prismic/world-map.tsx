import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import get from 'just-safe-get';
import { geoVanDerGrinten3 } from 'd3-geo-projection';

import { Slice, Box, Heading, Button } from 'components';
import { buttonVariants } from 'components/button';
import { getDocs } from 'modules/prismic';

const mapPath =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m-simplified.json';

const WorldMap = (rawData) => {
  const variant = get(rawData, 'primary.variant') || 'primary';
  const [members, setMembers] = useState(null);

  useEffect(() => {
    const getMembers = async () => {
      const allMembers = await getDocs('members');
      setMembers(allMembers);
    };

    getMembers();
  }, [rawData, setMembers]);

  const memberFill = variant === 'primary' ? '#F6AF95' : '#62b058';

  return (
    <Slice variant={variant} size="full">
      <Heading fontFamily="body" textAlign="center">
        Quidditch around the world
      </Heading>

      <Box>
        <ComposableMap
          projection={geoVanDerGrinten3().scale(150).center([0, 30])}
          width={980}
          height={500}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <Geographies geography={mapPath}>
            {({ geographies }) =>
              geographies.map((geo) => {
                if (geo?.properties?.NAME === 'Antarctica') {
                  return;
                }

                const isMember = members?.some(
                  ({ data }) => geo?.properties?.NAME === data?.country
                );

                const fill = isMember ? memberFill : '#ffffff';

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill,
                        stroke: '#949494',
                        strokeWidth: 0.5,
                      },
                      hover: {
                        fill,
                        stroke: '#949494',
                        strokeWidth: 0.5,
                      },
                      pressed: {
                        fill,
                        stroke: '#949494',
                        strokeWidth: 0.5,
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </Box>
      <Box textAlign="center" mt={2}>
        <Button variant={buttonVariants[variant]} href="/about/members">
          See all our members
        </Button>
      </Box>
    </Slice>
  );
};

export default WorldMap;
