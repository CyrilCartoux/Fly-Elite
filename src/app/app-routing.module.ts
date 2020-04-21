import { BookFlightComponent } from './book-flight/book-flight.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { CheckInComponent } from './check-in/check-in.component';
import { SearchFlightComponent } from './search/search-flight/search-flight.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: SearchFlightComponent},
  { path: 'search', component: SearchFlightComponent, children: [
    {path: 'results', component: SearchResultsComponent}
  ]},
  { path: 'checkin', component: CheckInComponent},
  { path: 'book-flight', component: BookFlightComponent},
  { path: '**', redirectTo: 'search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
