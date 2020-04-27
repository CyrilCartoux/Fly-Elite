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
        if (user ) {
          this.user = user;
        } else {
          this.user = null;
        }
      }
    );
  }

  logout() {
    this.authService.user.next(null);
  }

}
