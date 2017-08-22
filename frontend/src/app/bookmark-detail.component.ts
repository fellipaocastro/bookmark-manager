import { Component, Input } from '@angular/core';

import { Bookmark } from './bookmark';
@Component({
  selector: 'bookmark-detail',
  template: `
    <div *ngIf="bookmark">
      <h2>{{bookmark.name}} details!</h2>
      <div><label>id: </label>{{bookmark.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="bookmark.name" placeholder="name">
      </div>
      <div>
        <label>url: </label>
        <input [(ngModel)]="bookmark.url" placeholder="name">
      </div>
    </div>
  `
})
export class BookmarkDetailComponent {
  @Input() bookmark: Bookmark;
}
