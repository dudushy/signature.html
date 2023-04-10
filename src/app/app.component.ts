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

  drawing = false;

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

  startDraw(event: any) {
    console.log(`[${this.title}#startDraw] event`, event);

    this.drawing = true;
  }

  draw(event: any) {
    if (!this.drawing) return;

    console.log(`[${this.title}#draw] event`, event);

    const x = event.offsetX;
    const y = event.offsetY;
    console.log(`[${this.title}#draw] x:`, x, 'y:', y);

    const canvas = document.getElementById('signaturePad') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.fillStyle = 'black';
    ctx?.fillRect(x, y, 2, 2);
  }

  stopDraw(event: any) {
    if (!this.drawing) return;

    console.log(`[${this.title}#stopDraw] event`, event);

    this.drawing = false;
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
