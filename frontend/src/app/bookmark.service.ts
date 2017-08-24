import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../environments/environment';


import { Bookmark } from './bookmark';
import { BOOKMARKS } from './mock-bookmarks';

@Injectable()
export class BookmarkService {
  constructor(private authHttp: AuthHttp) {}

  getBookmarks() {
    return this.authHttp.get(`${environment.apiUrl}/bookmarks/`)
      .map(response => <Bookmark[]> response.json())
  }
}
