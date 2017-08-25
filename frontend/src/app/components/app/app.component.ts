import { Component } from '@angular/core';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'Bookmark Manager';

  constructor(
    private userService: UserService
  ) {}
}
