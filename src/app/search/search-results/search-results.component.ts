import { FlightService } from './../../services/flight.service';
import { Flight } from './../../interfaces/flight';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  flights: Flight[];

  constructor(
    private flightService: FlightService
  ) { }

  ngOnInit(): void {
    this.flights =  this.flightService.getFoundedFlights();
    console.log(this.flights);
  }

}
