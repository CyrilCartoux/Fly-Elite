import { DataStorageService } from './data-storage.service';
import { BehaviorSubject } from 'rxjs';
import { FlightToSearch } from './../interfaces/flight-to-search';
import { Flight } from './../interfaces/flight';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights: Flight[] = [];

  // vols correspondants a la recherche :
  flightsFounded: Flight[];

  // vol selectionné par l'user dans search/results :
  flightSelected = new BehaviorSubject<Flight>(null);

  // formulaire recherche de l'user :
  userFlightForm: FlightToSearch;


  constructor(
    private dataStorage: DataStorageService
  ) { }
  
  // fetch from firebase
  fetchFlights() {
    this.dataStorage.flightsSubject.subscribe(
      (data: Flight[]) => {
        this.flights = data;
      }
    );
  }

  transformFlightInfos(flight) {
    return {
      departure: flight.departure,
      arrival: flight.arrival,
      dates: flight.dates.toLocaleString()
    };
  }

  findFlight(flightToSearch: FlightToSearch) {
    this.userFlightForm = flightToSearch;
    const flights = [];

    this.flights.forEach((elt: Flight) => {

      if (JSON.stringify(this.transformFlightInfos(elt)) === JSON.stringify(this.transformFlightInfos(flightToSearch))) {
        flights.push(elt);
      }

    });

    console.log(flights);

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
