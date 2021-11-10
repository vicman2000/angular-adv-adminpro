import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  //** Rutas definidas en cada módulo y definido en la sección imports  PagesRoutingModule, AuthRoutingModule*/
  // path: '/dashboard' --> definido en PagesRouting
  // path: '/auth' --> definido en AuthRoutinf

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },     
  { path: '**', component: NopagefoundComponent },
]

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
    ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
