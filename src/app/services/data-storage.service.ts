import { AuthService } from './../auth/auth.service';
import { Flight } from './../interfaces/flight';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  flights: Flight[] = [];
  flightId;
  uid;

  allFlightsFromFirebaseSubject = new BehaviorSubject<Flight[]>(null);

  constructor(
    private authService: AuthService
  ) {
    this.authService.user.subscribe(
      data => {
        this.uid = data;
      }
    );
  }

  // storeFlights() {
  //   for (const flight of this.flights) {
  //     const departure = flight.departureTime.toUTCString();
  //     const landing = flight.landingTime.toUTCString();
  //     const datesVol = flight.dates.toLocaleString();

  //     firebase.database().ref('flights').push({
  //       departure: flight.departure,
  //       arrival: flight.arrival,
  //       flightNumber: flight.flightNumber,
  //       departureTime: departure,
  //       landingTime: landing,
  //       dates: datesVol,
  //       company: flight.company,
  //       noEscales: flight.noEscales
  //     });
  //   }
  // }

  // get all the flights from firebse, stores them in the BehaviorSubject, used by the flight service on app load
  getFlights() {
    const query = firebase.database().ref('flights');
    query.on('value', (snapshot) => {
      this.allFlightsFromFirebaseSubject.next(Object.values(snapshot.val()));
    });
  }

  storeFlight(flight: Flight) {
    // get the unique id generated by firebase
    this.flightId = firebase.database().ref('users').child(this.uid).child('flights').push(flight);
  }

  getFlightId() {
    return this.flightId;
  }

  // getFlightsOfUser(userId) {
  //   console.log(this.uid);
  //   const userFlights = [];
  //   firebase.database().ref('users').child(this.uid).child('flights').on('value', (snapshot) => {
  //     console.log(snapshot.val());
  //     userFlights.push(snapshot.val());
  //   });
  //   return userFlights;
  // }


  emitFlights() {
    this.allFlightsFromFirebaseSubject.next(this.flights);
  }

}

