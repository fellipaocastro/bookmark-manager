import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { BookmarkService } from './../bookmark.service';
import { Bookmark } from './../bookmark';

@Component({
  selector: 'app-bookmark-edit',
  templateUrl: './bookmark-edit.component.html',
  styleUrls: ['./bookmark-edit.component.css']
})
export class BookmarkEditComponent implements OnInit {
  formEdit: FormGroup;
  id: string;
  bookmark = new Bookmark();

  constructor(
    private bookmarkService: BookmarkService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

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
    })
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
