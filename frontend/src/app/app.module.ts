import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { BookmarkService } from './bookmark.service';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { RouteModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { BookmarkNewComponent } from './bookmark-new/bookmark-new.component';
import { BookmarkEditComponent } from './bookmark-edit/bookmark-edit.component';
import { RegisterComponent } from './register/register.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    BookmarkListComponent,
    LoginComponent,
    BookmarkNewComponent,
    BookmarkEditComponent,
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
