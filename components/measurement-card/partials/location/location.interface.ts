interface Location {
    city?: string;
    country?: string;
}

export default interface Props {
    value?: string;
    editing: boolean;
    onSet: ({ city, country }: Location) => void;
}
