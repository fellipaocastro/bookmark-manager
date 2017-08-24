import { Component, OnInit } from '@angular/core';

import { Bookmark } from './../../bookmark';
import { BookmarkService } from './../../services/bookmark.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {
  title = 'Bookmark Manager';
  bookmarks: Bookmark[];
  selectedBookmark: Bookmark;
  isStaff: string = localStorage.getItem('is_staff');

  constructor(
    private bookmarkService: BookmarkService,
    private userService: UserService
  ) { }

  getBookmarks(): void {
    this.bookmarkService.getBookmarks().subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  ngOnInit(): void {
    this.getBookmarks();
  }

  delete(bookmark) {
    this.bookmarkService.delete(bookmark.id)
      .subscribe(response => {
        const index = this.bookmarks.indexOf(bookmark);
        this.bookmarks.splice(index, 1);
      }
    );
  }
}
