import { User } from './../interfaces/user';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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

  constructor(
    private flightService: FlightService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.flightService.flightSelected.subscribe(
      (f: Flight) => {
        this.flight = f;
      }
    );

    this.userFlightForm = this.flightService.getUserFlightForm();
    this.initForm();


  }

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

}
