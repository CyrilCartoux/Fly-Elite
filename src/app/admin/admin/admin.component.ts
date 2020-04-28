import { DataStorageService } from './../../services/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];
  flights = [];

  constructor(
    private dataService: DataStorageService
  ) { }

  ngOnInit(): void {

    this.dataService.allFlightsFromFirebaseSubject.subscribe(
      (flights) => {
        flights.forEach(elt => {
          this.flights.push(elt);
        });
      }
    );

    this.items = [{
      label: 'Mes vols',
      items: [
        { label: 'Modifier', icon: 'pi pi-pencil', routerLink: 'edit' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Ajouter un vol', icon: 'pi pi-plus', routerLink: 'add' },
      ]
    }];
  }

}
