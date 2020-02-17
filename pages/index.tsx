import { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { Box, Typography, Button } from '@material-ui/core';

import MeasurementCard from '../components/measurement-card/MeasurementCard';
import Layout from '../components/Layout';

const Page: NextPage = () => {
    const { data, error } = useSWR('/api/location', (url: string) => fetch(url).then(r => r.json()));
    const [adding, setAdding] = useState(false);

    const toggleAdding = (): void => {
        setAdding(!adding);
    };

    return (
        <Layout>
            <Box component="header" mt={6} mb={3}>
                <Typography variant="h3">Locations</Typography>
            </Box>

            <Box>
                {error && <Box>error while loading data</Box>}

                {/* // onSave={toggleAdding}  */}
                {adding && <MeasurementCard />}

                {data &&
                    (data.locations.length
                        ? data.locations.map((key: number, item: { name: string }) => (
                              <MeasurementCard key={key} location={item.name} />
                          ))
                        : !adding && (
                              <>
                                  <Typography>
                                      To show air quality measurements please add a location
                                      {/* manually or allow us to
                                      access your geo-location. */}
                                  </Typography>
                                  {/* <Button variant="contained" color="primary">
                                      Current Location
                                  </Button> */}
                                  <Button onClick={toggleAdding} variant="contained">
                                      Add
                                  </Button>
                              </>
                          ))}

                {!data && <Box>loading...</Box>}
            </Box>

            <Box component="footer">
                {data && data.locations.length > 0 && !adding && (
                    <Button onClick={toggleAdding} variant="contained">
                        Add
                    </Button>
                )}
            </Box>
        </Layout>
    );
};

export default Page;
