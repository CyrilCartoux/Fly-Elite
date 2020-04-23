import { Flight } from './../interfaces/flight';
import { FlightService } from './flight.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  flights: Flight[];

  constructor(
    private flightService: FlightService
  ) {
    this.flights = this.flightService.getAllFlights();
  }

  storeFlights() {
    for (const flight of this.flights) {
      firebase.database().ref('flights').push({
        departure: flight.departure,
        arrival: flight.arrival,
        flightNumber: flight.flightNumber,
        departureTime: flight.departureTime,
        landingTime: flight.landingTime,
        dates: flight.dates,
        company: flight.company,
        noEscales: flight.noEscales
      });
    }
  }

}

