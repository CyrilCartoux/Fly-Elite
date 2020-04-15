import { FlightToSearch } from './../interfaces/flight-to-search';
import { Flight } from './../interfaces/flight';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights: Flight[];

  constructor() {
    // this.flights = [{
    //   destination: 'Amsterdam',
    //   flightNumber: 1,
    //   departureTime: 9,
    //   landingTime: 13,
    //   departureDay: 13 / 08 / 2020,
    //   landingDay: 13 / 08 / 2020,

    //   flightTime: 4,
    //   company: 'AirFrance',
    //   noEscales: true
    // }, {
    //   destination: 'Marseille',
    //   flightNumber: 2,
    //   departureTime: 10,
    //   landingTime: 12,
    //   departureDay: 14 / 08 / 2020,
    //   landingDay: 14 / 08 / 2020,

    //   flightTime: 2,
    //   company: 'AirFrance',
    //   noEscales: true
    // }, {
    //   destination: 'Atlanta',
    //   flightNumber: 3,
    //   departureTime: 10,
    //   landingTime: 18,
    //   departureDay: 13 / 08 / 2020,
    //   landingDay: 13 / 08 / 1010,

    //   flightTime: 8,
    //   company: 'AirFrance',
    //   noEscales: true
    // }
    // ];
  }

  findFlight(flight: FlightToSearch): boolean {
    return;
  }


  compareDate(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return d1.getTime() === d2.getTime();
  }

  // function randomDate(start, end) {
  //   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  // }


}
