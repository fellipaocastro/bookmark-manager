import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from './../components/app/app.component';
import { BookmarkEditComponent } from './../components/bookmark-edit/bookmark-edit.component';
import { BookmarkListComponent } from './../components/bookmark-list/bookmark-list.component';
import { BookmarkNewComponent } from './../components/bookmark-new/bookmark-new.component';
import { LoginComponent } from './../components/login/login.component';
import { RegisterComponent } from './../components/register/register.component';

import { AuthGuard } from './../guards/auth.guard';

import { RouteModule } from './../modules/app-routing.module';

import { BookmarkService } from './../services/bookmark.service';
import { UserService } from './../services/user.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    BookmarkEditComponent,
    BookmarkListComponent,
    BookmarkNewComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouteModule
  ],
  providers: [
    BookmarkService,
    UserService,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
