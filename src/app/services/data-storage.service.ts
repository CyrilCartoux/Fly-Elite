import { Flight } from './../interfaces/flight';
import { FlightService } from './flight.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  flights: Flight[] = [];

  flightsSubject = new Subject<Flight[]>();

  constructor(
    // private flightService: FlightService
  ) {
    // this.flights = this.flightService.getAllFlights();
  }

  storeFlights() {
    for (const flight of this.flights) {
      const departure = flight.departureTime.toUTCString();
      const landing = flight.landingTime.toUTCString();
      const datesVol = flight.dates.toLocaleString();

      firebase.database().ref('flights').push({
        departure: flight.departure,
        arrival: flight.arrival,
        flightNumber: flight.flightNumber,
        departureTime: departure,
        landingTime: landing,
        dates: datesVol,
        company: flight.company,
        noEscales: flight.noEscales
      });
    }
  }

  getFlights() {
    firebase.database().ref('flights').on('value', (data) => {
      console.log(data.val())
      this.flights = data.val();
      this.emitFlights();
    });
  }

  emitFlights() {
    this.flightsSubject.next(this.flights);
  }

}

