import { DataStorageService } from './../../services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from './../../interfaces/category';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Airport } from 'src/app/interfaces/airport';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  success = false;
  editFlightForm: FormGroup;
  checked = true;
  // Dates :
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  date: Date;
  date1: Date;
  es: any;
  invalidDates: Array<Date>;

  categories: Category[];
  airports: Airport[];
  idToEdit;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (res) => {
        this.idToEdit = res.get('id');
      }
    );

    this.editFlightForm = new FormGroup({
      departure: new FormControl(),
      arrival: new FormControl(),
      dates: new FormControl(),
      category: new FormControl(),
      noEscale: new FormControl(),
    });
    this.airports = [
      { label: 'LAX', value: 'Los Angeles' },
      { label: 'DXB', value: 'Dubaï' },
      { label: 'ATL', value: 'Atlanta' },
      { label: 'PEK', value: 'Beijing' },
      { label: 'HND', value: 'Tokyo' },
      { label: 'ORD', value: 'Chicago' },
      { label: 'LHR', value: 'London' },
      { label: 'HKG', value: 'Hong-Kong' },
      { label: 'CDG', value: 'Paris' },
      { label: 'AMS', value: 'Amsterdam' },
      { label: 'FRA', value: 'Frankfurt' },
      { label: 'SIN', value: 'Singapore' },
      { label: 'MRS', value: 'Marseille' }
    ];
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      monthNamesShort: ['jan', 'fev', 'mar', 'avr', 'may', 'jun', 'jul', 'aou', 'sep', 'oct', 'nov', 'dec'],
      today: 'Hoy',
      clear: 'Borrar'
    };

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const prevMonth = (month === 0) ? 11 : month - 1;
    const prevYear = (prevMonth === 11) ? year - 1 : year;
    const nextMonth = (month === 11) ? 0 : month + 1;
    const nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    const invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
    this.categories = [
      { name: 'Economy' },
      { name: 'Business' },
      { name: 'Premiere' }
    ];
  }

  onSubmitEditFlightForm() {
    console.log(this.editFlightForm.value);
    this.dataService.editFlightOfUser(this.idToEdit, this.editFlightForm);
    this.success = true;
    setTimeout(() => {
      this.success = false;
      this.router.navigate(['search']);
    }, 1500);
  }

}
