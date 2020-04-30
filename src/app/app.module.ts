import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchFlightComponent } from './search/search-flight/search-flight.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { PublicityComponent } from './publicity/publicity.component';
import { CheckInComponent } from './check-in/check-in.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { UserAccountComponent } from './user-account/user-account/user-account.component';
import { EditComponent } from './user-account/edit/edit.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AddComponent } from './admin/add/add.component';
import { AdminEditComponent } from './admin/admin-edit/admin-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchFlightComponent,
    SearchResultsComponent,
    PublicityComponent,
    CheckInComponent,
    BookFlightComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    UserAccountComponent,
    EditComponent,
    AdminComponent,
    AddComponent,
    AdminEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    CalendarModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    CardModule,
    MenuModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
