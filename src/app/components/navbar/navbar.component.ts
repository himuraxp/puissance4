import { Component } from '@angular/core';
import fr from 'src/app/global/languages/fr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public texts = fr;
}
