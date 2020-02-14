import { NextPage } from 'next';
import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';

import MeasurementCard from '../components/measurement-card/MeasurementCard';
import Layout from '../components/Layout';

const Home: NextPage = () => {
    const city = 'Budapest';
    return (
        <Layout>
            <Box component="header" mt={5} mb={5}>
                <Typography variant="h2">{city}</Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <MeasurementCard label="PM2.5" value={12.4} />
                </Grid>
                <Grid item xs={6}>
                    <MeasurementCard label="PM10" value={9.7} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Home;
