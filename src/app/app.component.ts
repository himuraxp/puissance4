import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { Theme } from 'src/app/global/models/theme';
import { ThemeService } from 'src/app/global/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public theme: Observable<Theme> | undefined;
  public currentTheme = 'dark';

  title = 'puissance4';

  constructor(
    private themeService: ThemeService,
    private store: Store,
  ) { }

  // Track changing theme event 
  getTheme(choice: string) {
    this.currentTheme = choice;
  }

  // Theme initialization
  ngOnInit() {
    this.currentTheme = this.themeService.getTheme('theme').color ? this.themeService.getTheme('theme').color : 'light';
  }
}
