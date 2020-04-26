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
    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.authService.signIn(form);
    } else {
      authObs = this.authService.signUp(form);
    }

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        console.log(resData);
        const prevUrl = history.back();
        this.router.navigate(['prevUrl']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  closeErrorModal() {
    this.error = null;
  }

}

