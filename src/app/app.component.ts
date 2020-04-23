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
    private data: DataStorageService
  ) {
    
  }

  ngOnInit(): void {
    this.authService.autoLogIn();

    this.data.getFlights();

    this.data.flightsSubject.subscribe(
      (flight) => {
        console.log("flights recupéré depuis le serveur : " );
      }
    );
  }


}
