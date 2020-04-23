import { BehaviorSubject } from 'rxjs';
import { FlightToSearch } from './../interfaces/flight-to-search';
import { Flight } from './../interfaces/flight';
import { Injectable  } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights: Flight[];

  // vols correspondants a la recherche :
  flightsFounded: Flight[];

  // vol selectionné par l'user dans search/results :
  flightSelected = new BehaviorSubject<Flight>(null);

  // formulaire recherche de l'user :
  userFlightForm: FlightToSearch;


  constructor() {
    this.flights = [{
      departure: 'Marseille',
      arrival: 'Amsterdam',
      flightNumber: 1,
      departureTime: new Date(2020, 3, 22, 9),
      landingTime: new Date(2020, 3, 22, 13),
      dates: [new Date(2020, 3, 22), new Date(2020, 3, 29)],
      flightTime: 4,
      company: 'AirFrance',
      noEscales: true
    },
    {
      departure: 'Los Angeles',
      arrival: 'Dubaï',
      flightNumber: 1,
      departureTime: new Date(2020, 3, 22, 9),
      landingTime: new Date(2020, 3, 22, 13),
      dates: [new Date(2020, 3, 22), new Date(2020, 3, 29)],
      flightTime: 4,
      company: 'AirFrance',
      noEscales: true
    },
    {
      departure: 'Los Angeles',
      arrival: 'Dubaï',
      flightNumber: 1,
      departureTime: new Date(2020, 3, 22, 15),
      landingTime: new Date(2020, 3, 23, 17),
      dates: [new Date(2020, 3, 22), new Date(2020, 3, 29)],
      flightTime: 4,
      company: 'AirFrance',
      noEscales: true
    },
    {
      departure: 'Atlanta',
      arrival: 'Tokyo',
      flightNumber: 1,
      departureTime: new Date(2020, 3, 22, 9),
      landingTime: new Date(2020, 3, 22, 13),
      dates: [new Date(2020, 3, 22), new Date(2020, 3, 29)],
      flightTime: 4,
      company: 'AirFrance',
      noEscales: true
    }
    ];
  }

  getFlightInfo(flight: Flight): FlightToSearch {
    return {
      departure: flight.departure,
      arrival: flight.arrival,
      dates: flight.dates
    };
  }

  findFlight(flightToSearch: FlightToSearch): boolean {
    this.userFlightForm = flightToSearch;
    const flights = [];
    for (const flight of this.flights) {
      if (JSON.stringify(this.getFlightInfo(flight)) === JSON.stringify(this.getFlightInfo(flightToSearch))) {
        flights.push(flight);
      }
    }
    this.flightsFounded = flights;
    if (flights.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  getFoundedFlights(): Flight[] {
    if (this.flightsFounded === undefined) {
      return;
    } else {
      return this.flightsFounded;
    }
  }

  getAllFlights() {
    return this.flights;
  }

  getFlightById(index: number) {
    this.flightSelected.next(this.flightsFounded[index]);
  }

  getUserFlightForm(): FlightToSearch {
    return this.userFlightForm;
  }



  // compare departureDate()
  // compareDates(date1: Date, date2: Date): boolean {

  //   const d1 = new Date(date1);
  //   const d2 = new Date(date2);

  //   return d1.getTime() === d2.getTime();
  // }

}
