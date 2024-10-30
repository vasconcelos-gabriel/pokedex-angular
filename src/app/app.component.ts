import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'boilerplate';

  isDarkTheme = true; // Começar com o tema escuro

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyTheme(); // Aplica o tema no início
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(); // Chama o método para aplicar o tema
  }

  private applyTheme(): void {
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.addClass(document.body, theme);
  }
}
