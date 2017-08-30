import { RouterModule, Routes } from '@angular/router';

import { BookmarkEditComponent } from './../components/bookmark-edit/bookmark-edit.component';
import { BookmarkListComponent } from './../components/bookmark-list/bookmark-list.component';
import { BookmarkNewComponent } from './../components/bookmark-new/bookmark-new.component';
import { LoginComponent } from './../components/login/login.component';
import { RegisterComponent } from './../components/register/register.component';

import { AuthGuard } from './../guards/auth.guard';

const appRoutes: Routes = [
  {path: 'bookmarks', component: BookmarkListComponent, canActivate: [AuthGuard]},
  {path: 'bookmarks/new', component: BookmarkNewComponent, canActivate: [AuthGuard]},
  {path: 'bookmarks/edit/:id', component: BookmarkEditComponent, canActivate: [AuthGuard]},
  {path: 'accounts/login', component: LoginComponent},
  {path: 'accounts/register', component: RegisterComponent},
  {path: '**', redirectTo: '/accounts/login'}
];

export const RouteModule = RouterModule.forRoot(appRoutes);
