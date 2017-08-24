import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    private router: Router
  ) {}

  login(data){
    let payload;

    payload = {
      username: data.username,
      password: data.password
    };

    return this.http.post(`${environment.apiUrl}/api-token-auth/`, payload)
      .map(response => response.json())
  }

  logout(){
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
