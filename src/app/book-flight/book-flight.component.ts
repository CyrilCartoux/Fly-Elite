import { Router } from '@angular/router';
import { DataStorageService } from './../services/data-storage.service';
import { Users } from './../interfaces/user';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FlightToSearch } from './../interfaces/flight-to-search';
import { Flight } from './../interfaces/flight';
import { FlightService } from './../services/flight.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  flight: Flight;
  userFlightForm: FlightToSearch;

  addUserForm: FormGroup;

  passengers: Users[] = [];

  isLoading = false;

  constructor(
    private flightService: FlightService,
    private formBuilder: FormBuilder,
    private dataStorage: DataStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // load the selected flight from search-results by the user
    this.flightService.flightSelected.subscribe(
      (vol: Flight) => {
        this.flight = vol;
      }
    );
    // load the user research form, to display categorie etc
    this.userFlightForm = this.flightService.getUserFlightForm();
    this.initForm();

  }

  // Manage form and user (add, delete) : 
  private initForm() {
    this.addUserForm = this.formBuilder.group({
      users: this.formBuilder.array([
        this.newUser()
      ])
    });
  }

  get users() {
    return this.addUserForm.get('users') as FormArray;
  }

  newUser(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required]
    });
  }

  addMoreUsers() {
    this.users.push(this.newUser());
  }

  deleteUser(index: number) {
    this.users.removeAt(index);
  }

  onSubmit() {
    this.isLoading = true;
    // push the form value into passengers array
    this.passengers.push(...this.addUserForm.value.users);

    // store the flight under user in firebase :
    this.dataStorage.storeFlight(this.flight);

    setInterval(() => {
      this.isLoading = false;
      this.router.navigate(['account']);
    }, 1500);
  }

  onCancel() {
    this.router.navigate(['search']);
  }

  // end of form management


}

