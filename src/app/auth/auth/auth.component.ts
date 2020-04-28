import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true;

    if (this.isLoginMode) {

      this.authService.signIn(form);
      this.isLoading = false;
      this.router.navigate(['search']);
    } else {
      this.authService.signUp(form);
      this.isLoading = false;
      this.router.navigate(['search']);
    }

    form.reset();
  }

}

