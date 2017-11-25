import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouletteLoginComponent } from './roulette-login/roulette-login.component';
import {RouletteService} from "./roulette.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { GameComponent } from './game/game.component';
import { PracComponent } from './prac/prac.component';

@NgModule({
  declarations: [
    AppComponent,
    RouletteLoginComponent,
    GameComponent,
    PracComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [RouletteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
