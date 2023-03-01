import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: 'player', component: FormComponent },
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  { path: 'game', component: GameComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
