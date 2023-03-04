import { Component, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { Theme, AddTheme } from 'src/app/global/models/theme';
import { ThemeService } from 'src/app/global/services/theme.service';

import fr from 'src/app/global/languages/fr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public theme: Theme = {
    color: 'dark'
  };
  public texts = fr;

  @Output() changeTheme = new EventEmitter<string>();

  constructor(
    private themeService: ThemeService,
    private store: Store,
    public router: Router
  ) { }

  // Click event for change theme and send parent event 
  switchTheme(choice: string = 'dark') {
    if (choice !== this.theme.color) {
      this.theme.color = choice === 'dark' ? 'dark' : 'light';
      this.store.dispatch(new AddTheme(this.theme));
      this.themeService.setTheme('theme', this.theme);
      this.changeTheme.emit(this.theme.color);
    }
  }

  // Click event for redirect to homepage
  goHome() {
    this.router.navigate(['/']);
  }

  // Theme initialization
  ngOnInit() {
    this.theme.color = this.themeService.getTheme('theme').color ? this.themeService.getTheme('theme').color : 'light';
  }
}
