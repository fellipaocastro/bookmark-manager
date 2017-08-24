import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { BookmarkNewComponent } from './bookmark-new/bookmark-new.component';
import { BookmarkEditComponent } from './bookmark-edit/bookmark-edit.component';
import { BookmarkDeleteComponent } from './bookmark-delete/bookmark-delete.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'bookmarks', component: BookmarkListComponent, canActivate: [AuthGuard]},
  {path: 'bookmarks/new', component: BookmarkNewComponent, canActivate: [AuthGuard]},
  {path: 'bookmarks/:id', component: BookmarkEditComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}
]

export const RouteModule = RouterModule.forRoot(appRoutes);
