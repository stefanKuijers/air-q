import React, { useState, useEffect } from 'react';
import { Box, Grid, ButtonGroup, Button, Paper } from '@material-ui/core';
import qs from 'qs';

import OpenAQ from '../../data/openaq/api';
import { Measurement } from '../../data/openaq/interfaces';

import Props, { ParsedMeasurements, ServerLocation } from './measurementCard.interface';
import Location from './partials/location/Location';
import { Location as LocationProps } from './partials/location/location.interface';
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

export const postLocation = async (location: ServerLocation): Promise<void> => {
    const res = await fetch('/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(location),
    });

    const data = await res.json();
    console.log(data);
};

const MeasurementCard: React.FC<Props> = ({ location = {}, adding, onSave }: Props) => {
    const [editing, setEditing] = useState(adding);
    const [newLocation, setNewLocation] = useState<LocationProps>({});
    const [measurementsState, setMeasurementState] = useState<'prestine' | 'loading' | 'completed'>('prestine');
    const [measurements, setMeasurements] = useState<ParsedMeasurements>({});

    const getMeasurements = (location?: ServerLocation | LocationProps): void => {
        if (!location || !location.city) {
            setMeasurements({});
            setMeasurementState('prestine');
            return;
        }
        setMeasurementState('loading');

        OpenAQ.get('measurements', {
            city: location.city,
            radius: 5000,
            // it seems there is no pm25 close to budapest
            parameter: location.parameters ? location.parameters : [],
            limit: 1000,
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

    const handleLocationChange = (locationData: LocationProps): void => {
        setNewLocation(locationData);
        getMeasurements(locationData as ServerLocation); // get data for newly set location
    };

    const availableParamenters = Object.keys(measurements);
    const activeParamenters = availableParamenters.filter(item => measurements[item].active);

    const save = (): void => {
        if (onSave) {
            onSave();
        }

        postLocation({
            ...newLocation,
            parameters: activeParamenters,
        });
        setEditing(false);
    };

    return (
        <Paper>
            <Box m={1} p={3}>
                <Box component="header" mt={6} mb={1}>
                    <Box mb={3}>
                        <Location value={location.city} editing={!!editing} onSet={handleLocationChange} />
                    </Box>

                    {availableParamenters.length > 0 && editing && (
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
                                    label={measurements[item].values[0].parameter}
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

                <Box component="footer" mt={3} mb={3}>
                    {editing && (
                        <Button onClick={save} color="primary" variant="contained">
                            Save
                        </Button>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default MeasurementCard;
