import { Measurement } from '../../data/openaq/interfaces';

export interface ParsedMeasurements {
    [key: string]: {
        active: boolean;
        values: Measurement[];
    };
}

export interface PublicProps {
    location?: string;
}

export default PublicProps;
