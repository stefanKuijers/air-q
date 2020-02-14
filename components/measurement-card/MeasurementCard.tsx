// import Link from 'next/link';

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

import Props from './measurementCard.interface';

const Header: React.FC<Props> = ({ value, label }: Props) => {
    return (
        <Box component="section" mt={5} mb={5}>
            <Typography variant="h6" component="h5">
                {label}
            </Typography>
            <Typography variant="h1" component="h5">
                {value}
            </Typography>
        </Box>
    );
};

export default Header;
