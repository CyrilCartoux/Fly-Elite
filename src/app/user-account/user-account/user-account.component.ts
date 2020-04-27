import { FlightService } from './../../services/flight.service';
import { AuthService } from './../../auth/auth.service';
import { DataStorageService } from './../../services/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import * as firebase from 'firebase';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

    constructor(
        private dataStorage: DataStorageService,
        private authService: AuthService,
        private flightService: FlightService
    ) { }

    items: MenuItem[];
    flightUid;
    uid;
    flightsOfUser = [];

    ngOnInit() {

        this.authService.user.subscribe(data => {
            this.uid = data;
        });

        firebase.database().ref('users').child(this.uid).child('flights').on('value', (snapshot) => {
            snapshot.forEach(elt => {
                this.flightsOfUser.push(elt.val());
            });
        });

        this.items = [{
            label: 'Mes vols',
            items: [
                { label: 'Modifier', icon: 'pi pi-pencil', routerLink: 'edit' }
            ]
        },
        {
            label: 'Edit',
            items: [
                { label: 'Ajouter un vol', icon: 'pi pi-plus', routerLink: '/search' },
                { label: 'Annuler mes vols', icon: 'pi pi-trash' }
            ]
        }];
        // recuperer les vols A FAIRE :

        // this.flightUid = this.dataStorage.getFlightId();
        // console.log(this.flightUid.key);
    }

}
