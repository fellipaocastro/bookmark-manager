import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookmarkService } from './../../services/bookmark.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-bookmark-new',
  templateUrl: './bookmark-new.component.html',
})

export class BookmarkNewComponent implements OnInit {
  formNew: FormGroup;

  constructor(
    private bookmarkService: BookmarkService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formNew = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'url': ['', [Validators.required]]
    });
  }

  send() {
    if (this.formNew.valid) {
      this.bookmarkService.create(this.formNew.value)
        .subscribe(response => {
          this.router.navigate(['/bookmarks']);
        }
      );
    }
  }
}
