import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';


import { Bookmark } from './bookmark';
import { BOOKMARKS } from './mock-bookmarks';

@Injectable()
export class BookmarkService {
  constructor(private authHttp: AuthHttp) {}

  getBookmarks() {
    return this.authHttp.get(`http://localhost:8000/bookmarks/`)
      .map(response => <Bookmark[]> response.json())
  }
}
