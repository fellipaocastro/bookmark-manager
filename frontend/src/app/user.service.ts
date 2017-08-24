import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private router: Router
  ) {}

  login(data){
    let payload;

    payload = {
      username: data.username,
      password: data.password
    };

    this.http.post(`${environment.apiUrl}/api-token-auth/`, payload)
      .map(response => response.json())
      .subscribe(response => {
        localStorage.setItem('token', response.token);

        const jwtHelper = new JwtHelper();
        const id = jwtHelper.decodeToken(response.token).user_id;

        this.detail(id)
          .subscribe(
            response => {
              localStorage.setItem('is_staff', response.is_staff);
              this.router.navigate(['/bookmarks']);
            },
            error => {
              this.logout();
            }
          );
      }
    );
  }

  detail(id){
    return this.authHttp.get(`${environment.apiUrl}/users/${id}/`)
      .map(response => response.json())
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');

    this.router.navigate(['/login']);
  }

  create(data){
    let payload;

    payload = {
      username: data.username,
      password: data.password
    };

    return this.http.post(`${environment.apiUrl}/users/`, payload)
      .map(response => response.json());
  }
}
