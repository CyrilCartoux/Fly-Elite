import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
  }

  logout() {
    this.authService.logOut();
  }

}
