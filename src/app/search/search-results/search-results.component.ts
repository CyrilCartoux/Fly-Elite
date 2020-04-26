import { DataStorageService } from './../../services/data-storage.service';
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
    private router: Router,
    private dataStorage: DataStorageService
  ) { }

  ngOnInit(): void {
    this.flights =  this.flightService.getFoundedFlights();
  }

  onSelectFlight(index: number) {
    this.flightService.getFlightById(index);
    this.router.navigate(['/book-flight']);
  }

}
