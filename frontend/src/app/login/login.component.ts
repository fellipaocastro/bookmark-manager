import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { LoginService } from './../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (tokenNotExpired()) {
      this.router.navigate(['/bookmarks']);
    }

    this.formLogin = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  send() {
    if (this.formLogin.valid) {
      this.loginService.login(this.formLogin.value)
        .subscribe(response => {
          localStorage.setItem('token', response.token);

          this.router.navigate(['/bookmarks']);
        }
      );
    }
  }
}
