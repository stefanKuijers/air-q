import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Grid } from '@material-ui/core';

import OpenAQ from '../../data/openaq/api';
import { Measurement } from '../../data/openaq/interfaces';
import Location from './partials/location/Location';

import Props, { ValueProps } from './measurementCard.interface';

const Value = ({ label, value }: ValueProps): JSX.Element => (
    <Box component="section" mt={5} mb={5}>
        <Typography variant="h6" component="h5">
            {label}
        </Typography>
        <Typography variant="h1" component="h5">
            {value}
        </Typography>
    </Box>
);

const MeasurementCard: React.FC<Props> = ({ location }: Props) => {
    const [editing, setEditing] = useState(!location);
    const [parameters, setParameters] = useState<{ [key: string]: string }>({});
    const [measurements, setMeasurements] = useState<Measurement[]>([]);

    const getMeasurements = (city?: string): void => {
        console.log('@getMeasurements', city);
        if (!city) {
            return;
        }

        OpenAQ.get('measurements', {
            location: city,
            radius: 10000,
            // it seems there is no pm25 close to budapest
            // parameter: ['pm25', 'pm10', 'so2'],
            // limit: 10,
        }).then(data => {
            setParameters(
                data.reduce((params, measurement: Measurement) => {
                    if (!params[measurement.parameter]) {
                        params[measurement.parameter] = false;
                    }
                }, {}),
            );
            setMeasurements(data);
        });
    };

    useEffect(() => {
        if (location) {
            console.log('get fresh data for known location');
        }
    }, []);

    // const toggleParam = (event) => {
    //     setParameters({
    //         ...parameters,
    //         []
    //     });
    // }

    const handleLocationChange = ({ city }: { city?: string }): void => {
        getMeasurements(city); // get data for newly set location
    };

    const availableParamenters = Object.keys(parameters);
    const activeParamenters = availableParamenters.filter(item => parameters[item]);

    return (
        <>
            <Box component="header" mt={5} mb={5}>
                <Location value={location} editing={editing} onSet={handleLocationChange} />

                {availableParamenters.length > 0 &&
                    availableParamenters.map((item, key) => <span /*onClick={}*/ key={key}>{item}</span>)}
            </Box>

            <Grid container>
                {measurements.length ? (
                    measurements
                        .filter(item => activeParamenters.indexOf(item.parameter) !== -1)
                        .map((item, key) => (
                            <Grid key={key} item xs={3} spacing={4}>
                                <Value label={item.parameter} value={item.value} />
                            </Grid>
                        ))
                ) : (
                    <Grid item xs={12}>
                        will fetch...
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default MeasurementCard;
