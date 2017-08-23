import { Component, OnInit } from '@angular/core';

import { Bookmark } from './bookmark';
import { BookmarkService } from './bookmark.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <h2>My Bookmarks</h2>
    <ul class="bookmarks">
      <li *ngFor="let bookmark of bookmarks" (click)="onSelect(bookmark)">
        <span class="badge">{{bookmark.id}}</span> {{bookmark.name}}
      </li>
    </ul>
    <bookmark-detail [bookmark]="selectedBookmark"></bookmark-detail>
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .bookmarks {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .bookmarks li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .bookmarks li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .bookmarks li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .bookmarks .text {
      position: relative;
      top: -3px;
    }
    .bookmarks .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  providers: [BookmarkService]
})
export class AppComponent implements OnInit {
  title = 'Bookmark Manager';
  bookmarks: Bookmark[];
  selectedBookmark: Bookmark;

  constructor(private bookmarkService: BookmarkService) { }

  getBookmarks(): void {
    this.bookmarkService.getBookmarks().then(bookmarks => this.bookmarks = bookmarks);
  }

  ngOnInit(): void {
    this.getBookmarks();
  }

  onSelect(bookmark: Bookmark): void {
    this.selectedBookmark = bookmark;
  }
}
