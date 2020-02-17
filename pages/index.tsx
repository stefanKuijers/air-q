import { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { Box, Typography, Button } from '@material-ui/core';

import MeasurementCard from '../components/measurement-card/MeasurementCard';
import { ServerLocation } from '../components/measurement-card/measurementCard.interface';
import Layout from '../components/Layout';

const Page: NextPage = () => {
    const { data, error } = useSWR('/api/location', (url: string) => fetch(url).then(r => r.json()));
    const [adding, setAdding] = useState(false);

    const toggleAdding = (): void => {
        setAdding(!adding);
    };

    return (
        <Layout>
            <Box pt={6} pb={6}>
                <Box component="header" mb={3} mt={3}>
                    <Typography variant="h3">Locations</Typography>
                </Box>

                <Box mb={3}>
                    {error && <Box>error while loading data</Box>}

                    {/* // onSave={toggleAdding}  */}
                    {adding && <MeasurementCard adding={adding} onSave={toggleAdding} />}

                    {data &&
                        (data.locations.length
                            ? data.locations.map((item: ServerLocation, key: number) => (
                                  <MeasurementCard key={key} location={item} />
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

                <Box component="footer" mt={3} mb={3}>
                    {data && data.locations.length > 0 && !adding && (
                        <Button onClick={toggleAdding} variant="contained">
                            New Location
                        </Button>
                    )}
                </Box>
            </Box>
        </Layout>
    );
};

export default Page;
