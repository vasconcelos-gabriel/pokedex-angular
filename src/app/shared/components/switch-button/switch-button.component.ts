import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
})
export class SwitchButtonComponent implements OnInit {
  isDarkTheme = false;

  constructor(private renderer: Renderer2) {}

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
}
