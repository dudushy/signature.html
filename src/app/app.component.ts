/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { DbService } from './services/db/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppComponent';

  window = window;

  theme = 'dark';
  mobileMode = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private db: DbService,

  ) {
    console.log(`[${this.title}#constructor]`);

    this.theme = this.db.get('theme') || 'dark';
    this.toggleTheme(this.theme);

    this.toggleMobileMode();

    this.window.onresize = () => {
      console.log(`[${this.title}#window.onresize]`);

      this.toggleMobileMode();
    };
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  toggleTheme(theme: any) {
    console.log(`[${this.title}#toggleTheme] theme`, theme);

    this.theme = theme;

    document.body.setAttribute('theme', theme);

    this.updateView(this.title);
  }

  toggleMobileMode() {
    const width = window.innerWidth;
    const condition = width < 900;
    console.log(`[${this.title}#toggleMobileMode] width`, width, condition);

    if (condition) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }

    this.updateView(this.title);
  }
}
