import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';


import { Bookmark } from './bookmark';
import { BOOKMARKS } from './mock-bookmarks';

@Injectable()
export class BookmarkService {
  constructor(private authHttp: AuthHttp) {
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZjIiwiZXhwIjoxNTAzNTQ4MzIxLCJlbWFpbCI6ImNvbnRhY3RAZmVsbGlwZWNhc3Ryby5jb20ifQ.4oDDonSdn75fRjafOhJUz64_nQoO_-9dl3VfuyZYVBU');
  }

  getBookmarks() {
    return this.authHttp.get(`http://localhost:8000/bookmarks/`)
      .map(response => <Bookmark[]> response.json())
  }
}
