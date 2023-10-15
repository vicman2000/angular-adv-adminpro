import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos del Sistema
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// Componentes
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';


const routes: Routes = [
// path: '/dashboard' viene de PagesRouting
// path: '/auth'      viene de AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NotpagefoundComponent},
];


@NgModule({
  imports: [
     RouterModule.forRoot( routes ),
     PagesRoutingModule,
     AuthRoutingModule
   ],
  exports: [ RouterModule ] 

})
export class AppRoutingModule { }
