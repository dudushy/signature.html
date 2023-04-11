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
    this.drawing = true;

    const x = event.clientX - event.target.getBoundingClientRect().x;
    const y = event.clientY - event.target.getBoundingClientRect().y;
    console.log(`[${this.title}#startDraw] event`, event, 'x:', x, 'y:', y);

    const canvas = document.getElementById('signaturePad') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.lineWidth = 2;
    ctx.lineJoin = ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  draw(event: any) {
    if (!this.drawing) return;

    const x = event.clientX - event.target.getBoundingClientRect().x;
    const y = event.clientY - event.target.getBoundingClientRect().y;
    console.log(`[${this.title}#draw] event`, event, 'x:', x, 'y:', y);

    const canvas = document.getElementById('signaturePad') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  stopDraw() {
    this.drawing = false;
  }

  clearCanvas() {
    console.log(`[${this.title}#clearCanvas]`);

    const canvas = document.getElementById('signaturePad') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  downloadCanvas() {
    const canvas = document.getElementById('signaturePad') as HTMLCanvasElement;
    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.download = 'signature.png';
      link.href = URL.createObjectURL(blob as Blob);
      link.click();
    }, 'image/png');
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
