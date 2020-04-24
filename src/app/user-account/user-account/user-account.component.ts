import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

    ngOnInit() {
        this.items = [{
            label: 'Mes vols',
            items: [
                {label: 'Voir', icon: 'pi pi-fw pi-plus', routerLink: 'flights'},
                {label: 'Modifier', icon: 'pi pi-pencil', routerLink: 'edit'}
            ]
        },
        {
            label: 'Edit',
            items: [
                {label: 'Ajouter un vol', icon: 'pi pi-plus', routerLink: '/search'},
                {label: 'Annuler mes vols', icon: 'pi pi-trash'}
            ]
        }];
    }

}
