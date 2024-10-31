import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { SwitchButtonComponent } from './components/switch-button/switch-button.component';

@NgModule({
  declarations: [PokemonCardComponent, SwitchButtonComponent],
  imports: [CommonModule, MatIconModule, MatInputModule, MatButtonModule, MatSlideToggleModule],
  exports: [
    CommonModule,
    PokemonCardComponent,
    SwitchButtonComponent,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
})
export class SharedModule {}
