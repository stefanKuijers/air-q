export type Resource = 'measurements' | 'cities' | 'countries';
export type Options = { [key: string]: string | number | string[] };

export interface Country {
    count?: number;
    code: string;
    name: string;
}

export interface City {
    name: string;
    country?: string;
    count?: number;
    locations?: number;
}

export interface Measurement {
    parameter: string;
    date: Date;
    value: number;
    unit: string;
    location: string;
    country: string;
    city: string;
    sourceName: string;
    averagingPeriod: {
        value: number;
        unit: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
    attribution?: {
        name: string;
        url?: string;
    }[];
}
