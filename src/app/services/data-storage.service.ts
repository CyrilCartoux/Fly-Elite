import { Flight } from './../interfaces/flight';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  flights: Flight[] = [];

  flightsSubject = new Subject<Flight[]>();

  constructor() { }

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
  const query = firebase.database().ref('flights');
  query.on('value', (snapshot) => {
    this.flightsSubject.next(Object.values(snapshot.val()));
  });
}


emitFlights() {
  this.flightsSubject.next(this.flights);
}

}

