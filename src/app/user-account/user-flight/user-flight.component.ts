import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-flight',
  templateUrl: './user-flight.component.html',
  styleUrls: ['./user-flight.component.css']
})
export class UserFlightComponent implements OnInit {

  uid;
  flightsOfUser;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(data => {
      this.uid = data;
    });
    // recuperer les vols A FAIRE :
  }

}
