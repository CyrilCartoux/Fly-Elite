import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, AuthResponse } from '../auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isLoggedIn = false;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
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

  closeErrorModal() {
    this.error = null;
  }

}

