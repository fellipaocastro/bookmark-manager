import { Component, OnInit } from '@angular/core';

import { Bookmark } from './../../classes/bookmark';

import { BookmarkService } from './../../services/bookmark.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
})

export class BookmarkListComponent implements OnInit {
  bookmarks: Bookmark[];
  selectedBookmark: Bookmark;
  isStaff: string = localStorage.getItem('is_staff');

  constructor(
    private bookmarkService: BookmarkService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.bookmarkService.all()
      .subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  delete(bookmark) {
    this.bookmarkService.delete(bookmark.id)
      .subscribe(response => {
        const index = this.bookmarks.indexOf(bookmark);
        this.bookmarks.splice(index, 1);
      }
    );
  }

  logout() {
   this.userService.logout();
  }
}
