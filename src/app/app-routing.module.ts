import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './scavenger/config.component';
import { ConfigeComponent } from './engraver/confige.component';

const routes: Routes = [
  { path: 'config', component: ConfigComponent },
  { path: 'confige', component: ConfigeComponent},
  { path: '', redirectTo: '/config', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
