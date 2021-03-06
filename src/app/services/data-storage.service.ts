import { AuthService } from './../auth/auth.service';
import { Flight } from './../interfaces/flight';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Users } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  flights: Flight[] = [];
  flightId;
  uid;

  allFlightsFromFirebaseSubject = new BehaviorSubject<Flight[]>(null);
  allKeysOfFlightsFromFirebase = [];

  allFlightKeyOfUser = [];

  constructor(
    private authService: AuthService
  ) {
    // store the user id
    this.authService.user.subscribe(
      data => {
        this.uid = data;
      }
    );
    // load all the flights from firebase
    this.allFlightsFromFirebaseSubject.subscribe(flights => {
      this.flights = flights;
    });
  }

  // get all the flights from firebase, stores them in the BehaviorSubject, used by the flight service on app load
  getFlights() {
    firebase.database().ref('flights').on('value', (snapshot) => {
      if (snapshot.exists()) {
        // have to use Object.values here to transform data into an array
        this.allFlightsFromFirebaseSubject.next(Object.values(snapshot.val()));
        snapshot.forEach(elt => {
          // load all the keys and stores them
          this.allKeysOfFlightsFromFirebase.push(elt.key);
        });
      } else {
        // no more flights in firebase so empty everything
        this.allFlightsFromFirebaseSubject.next(null);
        this.allKeysOfFlightsFromFirebase = [];
      }
    });
  }

  getKeysOfFlights() {
    return this.allKeysOfFlightsFromFirebase;
  }

  storeFlight(flight: Flight) {
    // get the unique id generated by firebase
    this.flightId = firebase.database().ref('users').child(this.uid).child('flights').push(flight);
    return this.flightId;
  }

  // stores the users from check-in component under the current flight of signed in user
  async storeUsers(passengers: Users[], uid, flightUid) {
    await passengers.forEach(passenger => {
      firebase.database()
        .ref('users')
        .child(uid)
        .child('flights')
        .child(flightUid.key)
        .push({
          email: passenger.email,
          nom: passenger.nom,
          prenom: passenger.prenom
        });
    });
  }

  // receives a form then create flight in firebase, used by the admin-add component
  async createFlight(form) {
    // need to transform some data
    const departure = form.value.departureTime.toUTCString();
    const landing = form.value.landingTime.toUTCString();
    const datesVol = form.value.dates.toLocaleString();
    await firebase.database().ref('flights').push({
      departure: form.value.departure,
      arrival: form.value.arrival,
      flightNumber: form.value.flightNumber,
      departureTime: departure,
      landingTime: landing,
      dates: datesVol,
      company: form.value.company,
      noEscale: form.value.noEscale
    });
  }

  deleteAllFlightsOfUser(uid) {
    firebase.database().ref('users').child(uid).child('flights').remove().catch((error) => {
      console.log(error.message);
    });
  }

  // delete the flight at index , then reload the flights from firebase to update the view
  async deleteFlight(index) {
    // need to load all the keys then get the flight at key index
    const key = this.allKeysOfFlightsFromFirebase[index];
    await firebase.database().ref('flights').child(key).remove().then(() => {
      this.getFlights();
    });
  }

  async deleteAllFlights() {
    await firebase.database().ref('flights').remove().then(() => {
      this.allFlightsFromFirebaseSubject.next(this.flights);
    });
  }

  // take the flight key to edit and the form. Then update firebase with new data
  async editFlight(key, form) {
    const departure = form.value.departureTime.toUTCString();
    const landing = form.value.landingTime.toUTCString();
    const datesVol = form.value.dates.toLocaleString();
    await firebase.database().ref('flights').child(key).update({
      departure: form.value.departure,
      arrival: form.value.arrival,
      flightNumber: form.value.flightNumber,
      departureTime: departure,
      landingTime: landing,
      dates: datesVol,
      company: form.value.company,
      noEscale: form.value.noEscale
    });
    console.log(key + ' is updated');
  }

  async editFlightOfUser(index, form) {
    const departure = form.value.departure;
    const arrival = form.value.arrival;
    const category = form.value.category.name;
    const noEscale = form.value.noEscale;
    const datesVol = form.value.dates.toLocaleString();
    // need to load all the flights from the current user
    await firebase.database().ref('users').child(this.uid).child('flights').on('value', (snapshot) => {
      snapshot.forEach(elt => {
        // load all the flights keys
        this.allFlightKeyOfUser.push(elt.key);
      });
    });
    // get the flight at edit index
    const key = this.allFlightKeyOfUser[index];
    await firebase.database().ref('users').child(this.uid).child('flights').child(key).update({
      departure: departure,
      arrival: arrival,
      category: category,
      noEscale: noEscale,
      dates: datesVol
    });
  }

  // load the current user infos to display in account
  async getUserInfos(uid) {
    let email;
    let nom;
    let prenom;
    await firebase.database().ref('users').child(uid).once('value', (snapshot) => {
      email = snapshot.val().email;
      nom = snapshot.val().nom;
      prenom = snapshot.val().prenom;
    });
    return [email, nom, prenom];
  }

}

