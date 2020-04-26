import { AuthService } from './../auth/auth.service';
import { Flight } from './../interfaces/flight';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  flights: Flight[] = [];

  allFlightsFromFirebaseSubject = new BehaviorSubject<Flight[]>(null);

  constructor(
    private authService: AuthService
  ) { }

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
      this.allFlightsFromFirebaseSubject.next(Object.values(snapshot.val()));
    });
  }

  storeFlight(flight: Flight) {

    const userId = this.authService.getUserId();
    console.log(userId);

    firebase.database().ref('users').child(userId.key).push(flight);

  }


  emitFlights() {
    this.allFlightsFromFirebaseSubject.next(this.flights);
  }

}

