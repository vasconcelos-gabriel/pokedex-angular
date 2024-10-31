import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isDarkTheme = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
  ) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
