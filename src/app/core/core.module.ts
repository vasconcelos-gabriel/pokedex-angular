import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PokemonService } from './services/pokemon.service';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [HttpClientModule, SharedModule],
  exports: [HeaderComponent],
  providers: [PokemonService],
})
export class CoreModule {}
