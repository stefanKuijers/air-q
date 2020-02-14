import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';

import OpenAQ from '../data/openaq/api';
import MeasurementCard from '../components/measurement-card/MeasurementCard';
import Layout from '../components/Layout';

const Page: NextPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [airQuality, setAirQuality] = useState([] as any[]);

    useEffect((): void => {
        OpenAQ.get('measurements', {
            coordinates: '47.49,19.04',
            // radius: 1000,
            // it seems there is no pm25 close to budapest
            parameter: ['pm25', 'pm10', 'so2'],
            limit: 5,
        }).then(data => {
            setAirQuality(data);
        });
    }, []);

    return (
        <Layout>
            {airQuality.length ? (
                <>
                    <Box component="header" mt={5} mb={5}>
                        <Typography variant="h2">{airQuality.length}</Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <MeasurementCard label="PM2.5" value={12.4} />
                        </Grid>
                        <Grid item xs={6}>
                            <MeasurementCard label="PM10" value={9.7} />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <span>loading</span>
            )}
        </Layout>
    );
};

// Page.getInitialProps = async function(): Promise<any> {
//     const data = await OpenAQ.get('measurements', {
//         coordinates: '40.23,34.17',
//     });

//     console.log(`Show data fetched. Count: ${data.length}`, data);

//     return {
//         data,
//     };
// };

export default Page;
