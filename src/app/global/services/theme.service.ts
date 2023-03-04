import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Theme } from 'src/app/global/models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  localStorage: Storage;
  subject = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
  }

  // Get data theme from localstorage
  getTheme(key: string): any {
    if (this.localStorage) {
      return JSON.parse(this.localStorage.getItem(key) + '');
    }
    return null;
  }

  // Set data theme in localstorage and update subject
  setTheme(key: string, value: Theme): boolean {
    if (this.localStorage) {
      this.localStorage.setItem(key, JSON.stringify(value));
      this.subject.next({
        type: 'set',
        key,
        value,
      });
      return true;
    }
    return false;
  }
}
