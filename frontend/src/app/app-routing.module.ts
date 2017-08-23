import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'bookmarks', component: BookmarkListComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}
]

export const RouteModule = RouterModule.forRoot(appRoutes);
