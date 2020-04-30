import { DataStorageService } from './../../services/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];
  flights = [];
  keysOfFlights = [];

  constructor(
    private dataService: DataStorageService
  ) { }

  ngOnInit(): void {

    this.dataService.allFlightsFromFirebaseSubject.subscribe((flights) => {
      this.flights = flights;
    });
    this.keysOfFlights = this.dataService.getKeysOfFlights();

    this.items = [
      {
        label: 'Editer',
        items: [
          { label: 'Ajouter un vol', icon: 'pi pi-plus', routerLink: 'add' },
        ]
      }];
  }

  onDeleteFlight(index: number) {
    const key = this.keysOfFlights[index];
    firebase.database().ref('flights').child(key).remove()
      .then(() => {
        this.dataService.allFlightsFromFirebaseSubject.subscribe((flights) => {
          this.flights = flights;
          this.keysOfFlights = this.dataService.getKeysOfFlights();
        });
      });
  }

}
