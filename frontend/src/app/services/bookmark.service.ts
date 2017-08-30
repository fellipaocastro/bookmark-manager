import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';
import { Bookmark } from './../classes/bookmark';

@Injectable()
export class BookmarkService {
  constructor(private authHttp: AuthHttp) {}

  getBookmarks() {
    return this.authHttp.get(`${environment.apiUrl}/bookmarks/`)
      .map(response => <Bookmark[]> response.json());
  }

  get(id) {
    return this.authHttp.get(`${environment.apiUrl}/bookmarks/${id}/`)
      .map(response => <Bookmark> response.json());
  }

  create(data) {
    return this.authHttp.post(`${environment.apiUrl}/bookmarks/`, data)
      .map(response => response.json());
  }

  update(id, data) {
    return this.authHttp.put(`${environment.apiUrl}/bookmarks/${id}/`, data)
      .map(response => response.json());
  }

  delete(id) {
    return this.authHttp.delete(`${environment.apiUrl}/bookmarks/${id}/`)
      .map(response => response.json());
  }
}
