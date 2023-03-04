import { Component } from '@angular/core';
import { Router } from '@angular/router';
import fr from 'src/app/global/languages/fr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public texts = fr;

  constructor(public router: Router) {

  }

  // Click event for redirect to homepage
  goHome() {
    this.router.navigate(['/']);
  }
}
