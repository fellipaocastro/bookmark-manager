import { Component } from '@angular/core';

export class Bookmark {
  id: number;
  name: string;
  url: string;
}

const BOOKMARKS: Bookmark[] = [
  { id: 11, name: 'Google 11', url: 'http://www.google.com' },
  { id: 12, name: 'Google 12', url: 'http://www.google.com' },
  { id: 13, name: 'Google 13', url: 'http://www.google.com' },
  { id: 14, name: 'Google 14', url: 'http://www.google.com' },
  { id: 15, name: 'Google 15', url: 'http://www.google.com' },
  { id: 16, name: 'Google 16', url: 'http://www.google.com' },
  { id: 17, name: 'Google 17', url: 'http://www.google.com' },
  { id: 18, name: 'Google 18', url: 'http://www.google.com' },
  { id: 19, name: 'Google 19', url: 'http://www.google.com' },
  { id: 20, name: 'Google 20', url: 'http://www.google.com' }
];

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
    <div *ngIf="selectedBookmark">
      <h2>{{selectedBookmark.name}} details!</h2>
      <div><label>id: </label>{{selectedBookmark.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="selectedBookmark.name" placeholder="name">
      </div>
      <div>
        <label>url: </label>
        <input [(ngModel)]="selectedBookmark.url" placeholder="name">
      </div>
    </div>
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
  `]
})
export class AppComponent {
  title = 'Bookmark Manager';
  bookmarks = BOOKMARKS;
  selectedBookmark: Bookmark;

  onSelect(bookmark: Bookmark): void {
    this.selectedBookmark = bookmark;
  }
}
