import { Category } from './category';

export interface FlightToSearch {
    departure: string;
    arrival: string;
    dates: Date[];
    nbrePersonnes?: number;
    noEscale?: boolean;
    category?: Category;
}
