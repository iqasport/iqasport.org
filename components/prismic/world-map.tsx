import { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoVanDerGrinten3 } from 'd3-geo-projection';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

import { Box, Heading } from '@chakra-ui/react';
import { buttonVariants } from 'components/button';
import { getDocs } from 'modules/prismic';

const Slice = dynamic(() => import('components/slice'));
const Button = dynamic(() => import('components/button'));

const mapPath = '/worldmap.json';

const WorldMap = ({ primary }) => {
  const [ref, inView] = useInView({ threshold: 0 });
  const [loaded, setLoaded] = useState(false);
  const [members, setMembers] = useState([]);

  const { variant = 'primary' } = primary;

  useEffect(() => {
    if (inView && !loaded) {
      setLoaded(true);
    }
  }, [inView, loaded]);

  useEffect(() => {
    const getMembers = async () => {
      if (loaded && members.length === 0) {
        const allMembers = await getDocs('members', { pageSize: 100 });
        setMembers(allMembers);
      }
    };

    getMembers();
  }, [setMembers, loaded, members]);

  const memberFill = variant === 'primary' ? '#fff019' : '#62b058';

  return (
    <Slice variant={variant} size="full">
      <Heading fontFamily="body" textAlign="center" ref={ref}>
        Quidditch around the world
      </Heading>

      <Box>
        {loaded && (
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
        )}
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
