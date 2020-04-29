import { DataStorageService } from './../../services/data-storage.service';
import { Users } from './../../interfaces/user';
import { AuthService } from './../../auth/auth.service';
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
        private authService: AuthService,
        private dataService: DataStorageService
    ) { }

    items: MenuItem[];
    uid;
    passengers: Users[];
    flightsOfUser = [];
    keysOfFlights = [];

    ngOnInit() {
        // get uid from connectedUser
        this.authService.user.subscribe(data => {
            this.uid = data;
        });

        this.emitFlights();

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
                { label: 'Annuler mes vols', icon: 'pi pi-trash', }
            ]
        }];
    }

    // load the flights under the current user from firebase, store them in flightOfUser +
    // load the flights keys from the current user, store the in keysOfFlights
    emitFlights() {
        firebase.database().ref('users').child(this.uid).child('flights').on('value', (snapshot) => {
            snapshot.forEach(elt => {
                this.flightsOfUser.push(elt.val());
                this.keysOfFlights.push(elt.key);
            });
        });
    }

    // get the index of flight, search the flight key associated to it, then delete it
    deleteFlight(index: number) {
        const key = this.keysOfFlights[index];
        // connect to database, remove the flight than empty both arrays and call emitFlight again to store the new list of flights
        firebase.database().ref('users').child(this.uid).child('flights').child(key).remove().then(
            () => {
                this.flightsOfUser = [];
                this.keysOfFlights = [];
                this.emitFlights();
            }
        );
    }

    // TODO : delete
    onDeleteAllFlights() {
        this.dataService.deleteAllFlightsOfUser(this.uid);
        this.flightsOfUser = [];
        this.keysOfFlights = [];
        this.emitFlights();
    }

}
