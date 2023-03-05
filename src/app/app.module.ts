// Angular
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";

// Store
import { NgxsModule } from '@ngxs/store';
import { PlayerState } from '../app/global/store/states/player';
import { RouteState } from '../app/global/store/states/route';
import { GameComponent } from './components/game/game.component';

// Particules
import { NgParticlesModule } from "ng-particles";

// App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { ParticulesComponent } from './components/game/particules/particules.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    GameComponent,
    ParticulesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgParticlesModule,
    NgxsModule.forRoot([PlayerState, RouteState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
