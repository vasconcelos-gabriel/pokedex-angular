import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class PagesModule {}
