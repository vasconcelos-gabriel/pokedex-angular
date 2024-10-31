import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
  }

  private applyTheme(): void {
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.addClass(document.body, theme);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
