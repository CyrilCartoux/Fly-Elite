import { FlightService } from './services/flight.service';
import { DataStorageService } from './services/data-storage.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private data: DataStorageService,
    private flightService: FlightService
  ) {
   
  }

  ngOnInit(): void {
    this.authService.autoLogIn();
    // load the flights from firebase
    this.data.getFlights();
    // load the flights in flightService!
    // otherwise if you open the app in some other url it won't load the flights
    this.flightService.fetchFlights();

  }


}
