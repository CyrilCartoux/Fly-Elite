export interface Flight {
    destination: string;
    flightNumber: number;

    departureTime: number;
    landingTime: number;
    departureDay: number;
    landingDay: number;

    flightTime: number;
    company: string;
    noEscales: boolean;
}
