import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkNewComponent } from './bookmark-new.component';

describe('BookmarkNewComponent', () => {
  let component: BookmarkNewComponent;
  let fixture: ComponentFixture<BookmarkNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
