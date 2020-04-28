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

  constructor() { }

  ngOnInit(): void {

    // this.dataService.storeFlights();
    this.emitFlights();

    this.items = [
      {
        label: 'Editer',
        items: [
          { label: 'Ajouter un vol', icon: 'pi pi-plus', routerLink: 'add' },
        ]
      }];
  }

  emitFlights() {
    firebase.database().ref('flights').on('value', (snapshot) => {
      snapshot.forEach(elt => {
        this.flights.push(elt.val());
        this.keysOfFlights.push(elt.key);
      });
    });
  }

  onDeleteFlight(index: number) {
    const key = this.keysOfFlights[index];
    firebase.database().ref('flights').child(key).remove()
      .then(() => {
        this.flights = [];
        this.keysOfFlights = [];
        this.emitFlights();
      });
  }

}
