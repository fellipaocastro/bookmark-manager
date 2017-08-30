import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Bookmark } from './../../classes/bookmark';

import { BookmarkService } from './../../services/bookmark.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-bookmark-edit',
  templateUrl: './bookmark-edit.component.html'
})

export class BookmarkEditComponent implements OnInit {
  formEdit: FormGroup;
  id: string;
  bookmark = new Bookmark();

  constructor(
    private bookmarkService: BookmarkService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );

    this.bookmarkService.get(this.id)
      .subscribe(response => this.bookmark = response);

    this.formEdit = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'url': ['', [Validators.required]]
    });
  }

  send() {
    if (this.formEdit.valid) {
      this.bookmarkService.update(this.id, this.bookmark)
        .subscribe(response => {
          this.router.navigate(['/bookmarks']);
        }
      );
    }
  }
}
