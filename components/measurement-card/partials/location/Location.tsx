// import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { TextField, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

// TODO: set import alias to data & components
import OpenAQ from '../../../../data/openaq/api';
import { Country, City } from '../../../../data/openaq/interfaces';

import Props from './location.interface';

const Location: React.FC<Props> = ({ value, editing, onSet }: Props) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [country, setCountry] = useState<Country | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [city, setCity] = useState<City | null>(null);

    // const getMeasurements

    useEffect((): void => {
        OpenAQ.get('countries').then((data: Country[]) => {
            setCountries(
                data.map(country => ({
                    code: country.code,
                    name: country.name,
                })),
            );
        });
    }, []);

    const getCities = (byCountry: Country): void => {
        OpenAQ.get('cities', { country: byCountry.code }).then((data: City[]) => {
            setCities(
                data.map(city => ({
                    name: city.name,
                })),
            );
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCountryChange = (_event: any, newCountry: Country | null): void => {
        if (newCountry) {
            getCities(newCountry);
        }

        setCity(null);
        setCountry(newCountry);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCityChange = (_event: any, city: City | null): void => {
        setCity(city);
        onSet({
            city: city ? city.name : undefined,
            country: country ? country.name : undefined,
        });
    };

    const preventSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };

    return (
        <>
            {editing ? (
                <form noValidate autoComplete="off" onSubmit={preventSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={countries}
                                getOptionLabel={option => option.name}
                                // defaultValue={[location!]}
                                onChange={handleCountryChange}
                                renderInput={params => <TextField {...params} label="Country" fullWidth />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={cities}
                                value={city}
                                disabled={!(country && cities.length > 0)}
                                getOptionLabel={option => option.name}
                                onChange={handleCityChange}
                                renderInput={params => <TextField {...params} label="City" fullWidth />}
                            />
                        </Grid>
                    </Grid>
                </form>
            ) : (
                <Typography variant="h3">{value}</Typography>
            )}
        </>
    );
};

export default Location;
