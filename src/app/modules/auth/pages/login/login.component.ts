import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalAuthService } from '../../../../shared/services/global-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private globalAuthService: GlobalAuthService
  ) { }

  ngOnInit(): void {
    if (this.globalAuthService.isLoggedIn) {
      this.router.navigate(['tasks']);
    }
  }
}
