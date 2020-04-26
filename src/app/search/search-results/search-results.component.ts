import { Router } from '@angular/router';
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
    private flightService: FlightService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // load all the flights that matches the user research to display them
    this.flights =  this.flightService.getFoundedFlights();
  }

  onSelectFlight(index: number) {
    this.flightService.getFlightById(index);
    this.router.navigate(['/book-flight']);
  }

}
