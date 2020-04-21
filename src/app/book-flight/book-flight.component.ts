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

  constructor(
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
    this.flightService.flightSelected.subscribe(
      (f: Flight) => {
        this.flight = f;
        console.log(f);
      }
    );
  }

}
