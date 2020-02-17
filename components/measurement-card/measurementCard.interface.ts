import { Measurement } from '../../data/openaq/interfaces';
import { Location as LocationProps } from './partials/location/location.interface';

export interface ServerLocation extends LocationProps {
    parameters: string[];
}

export interface ParsedMeasurements {
    [key: string]: {
        active: boolean;
        values: Measurement[];
    };
}

export interface PublicProps {
    location?: LocationProps;
    adding?: boolean;
    onSave?: () => void;
}

export default PublicProps;
