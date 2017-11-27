import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouletteLoginComponent } from './roulette-login/roulette-login.component';
import {RouletteService} from "./roulette.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import { GameComponent } from './game/game.component';
import {RouterModule} from "@angular/router";


const approutes = [
  {
    path: "", redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: "game", component: GameComponent
  },
  {
    path: "login", component: RouletteLoginComponent
  },

  {
    path: "**", component: RouletteLoginComponent
  }


];

@NgModule({
  declarations: [
    AppComponent,
    RouletteLoginComponent,
    GameComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(approutes)
  ],
  providers: [RouletteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
