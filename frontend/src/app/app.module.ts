import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { BookmarkDetailComponent } from './bookmark-detail/bookmark-detail.component';
import { BookmarkService } from './bookmark.service';
import { LoginComponent } from './login/login.component';
import { RouteModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { AUTH_PROVIDERS } from 'angular2-jwt';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkListComponent,
    BookmarkDetailComponent,
    LoginComponent,
    BookmarkListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouteModule
  ],
  providers: [BookmarkService, AuthGuard, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
