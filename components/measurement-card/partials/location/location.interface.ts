export interface Location {
    city?: string;
    country?: string;
    parameters?: string[];
}

export default interface Props {
    value?: string;
    editing: boolean;
    onSet: ({ city, country }: Location) => void;
}
