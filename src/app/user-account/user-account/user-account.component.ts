import { AuthService } from './../../auth/auth.service';
import { DataStorageService } from './../../services/data-storage.service';
import { Flight } from './../../interfaces/flight';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

    constructor(
        private dataStorage: DataStorageService,
        private authService: AuthService
    ) { }

    items: MenuItem[];
    uid;
    flightsOfUser;

    ngOnInit() {
        this.items = [{
            label: 'Mes vols',
            items: [
                { label: 'Voir', icon: 'pi pi-fw pi-plus', routerLink: 'flights' },
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
        this.authService.user.subscribe(data => {
            this.uid = data;
        })
        this.flightsOfUser = this.dataStorage.getFlightsOfUser(this.uid);
        console.log(this.flightsOfUser);
    }

}
