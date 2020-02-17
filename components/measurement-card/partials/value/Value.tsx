import React from 'react';
import { Box, Typography } from '@material-ui/core';

import ValueProps from './value.interface';

const Value = ({ label, value }: ValueProps): JSX.Element => (
    <Box component="section" mt={1} mb={1}>
        <Typography variant="h6" component="h5">
            {label}
        </Typography>
        <Typography variant="h1" component="h5">
            {value}
        </Typography>
    </Box>
);

export default Value;
