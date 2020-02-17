import React, { useState, useEffect } from 'react';
import { Box, Grid, ButtonGroup, Button } from '@material-ui/core';

import OpenAQ from '../../data/openaq/api';
import { Measurement } from '../../data/openaq/interfaces';

import Props, { ParsedMeasurements } from './measurementCard.interface';
import Location from './partials/location/Location';
import Value from './partials/value/Value';

export const parseMeasurements = (data: Measurement[]): ParsedMeasurements => {
    return data.reduce((params: ParsedMeasurements, measurement: Measurement): ParsedMeasurements => {
        if (!params[measurement.parameter]) {
            params[measurement.parameter] = {
                active: true,
                values: [],
            };
        }

        params[measurement.parameter].values = [...params[measurement.parameter].values, measurement];

        return params;
    }, {} as ParsedMeasurements);
};

const MeasurementCard: React.FC<Props> = ({ location }: Props) => {
    const [editing, setEditing] = useState(!location);
    const [measurementsState, setMeasurementState] = useState<'prestine' | 'loading' | 'completed'>('prestine');
    const [measurements, setMeasurements] = useState<ParsedMeasurements>({});

    const getMeasurements = (city?: string): void => {
        console.log('@getMeasurements', city);
        if (!city) {
            setMeasurements({});
            setMeasurementState('prestine');
            return;
        }
        setMeasurementState('loading');

        OpenAQ.get('measurements', {
            location: city,
            radius: 5000,
            // it seems there is no pm25 close to budapest
            // parameter: ['pm25', 'pm10', 'so2'],
            // limit: 10,
        }).then(data => {
            setMeasurements(parseMeasurements(data));
            setMeasurementState('completed');
        });
    };

    useEffect(() => {
        if (location) {
            getMeasurements(location);
        }
    }, []);

    const toggleParam = (param: string): void => {
        setMeasurements({
            ...measurements,
            [param]: {
                active: !measurements[param].active,
                values: measurements[param].values,
            },
        });
    };

    const handleLocationChange = ({ city }: { city?: string }): void => {
        getMeasurements(city); // get data for newly set location
    };

    const availableParamenters = Object.keys(measurements);
    const activeParamenters = availableParamenters.filter(item => measurements[item].active);

    return (
        <>
            <Box component="header" mt={6} mb={1}>
                <Box mb={3}>
                    <Location value={location} editing={editing} onSet={handleLocationChange} />
                </Box>

                {availableParamenters.length > 0 && (
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {availableParamenters.map((item, key) => (
                            <Button
                                color={measurements[item].active ? 'primary' : 'default'}
                                variant="contained"
                                onClick={(): void => {
                                    toggleParam(item);
                                }}
                                key={key}
                            >
                                {item}
                            </Button>
                        ))}
                    </ButtonGroup>
                )}
            </Box>

            <Grid container>
                {activeParamenters.length > 0 &&
                    activeParamenters.map((item, key) => (
                        <Grid key={key} item xs={4}>
                            <Value
                                label={`${measurements[item].values[0].parameter} - measurements: ${measurements[item].values.length}`}
                                value={measurements[item].values[0].value}
                            />
                        </Grid>
                    ))}

                <Grid item xs={12}>
                    {measurementsState === 'prestine' && 'data will fetch once you selected a country and city'}
                    {measurementsState === 'loading' && 'fetching result data'}
                    {measurementsState === 'completed' &&
                        availableParamenters.length === 0 &&
                        'there are no results for this location'}
                </Grid>
            </Grid>
        </>
    );
};

export default MeasurementCard;
