import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      (user) => {
        if (user) {
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
