import React from 'react';
import { Box, Typography } from '@material-ui/core';

import ValueProps from './value.interface';

const Value = ({ label, value }: ValueProps): JSX.Element => (
    <Box component="section" mt={1} mb={1} className="tclass-value">
        <Typography className="tclass-value-label">{label}</Typography>
        <Typography variant="h4" component="h5" className="tclass-value-value">
            {value}
        </Typography>
    </Box>
);

export default Value;
