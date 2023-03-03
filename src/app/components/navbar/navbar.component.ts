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

  constructor(private router: Router) {

  }

  goHome() {
    this.router.navigate(['/']);
  }
}
