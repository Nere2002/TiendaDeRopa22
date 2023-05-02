import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {TiendaComponent} from "./tienda/tienda.component";
import {AuthGuard} from "./auth.guard";


const routes: Routes = [
  // aquí definimos nuestras rutas
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'tienda', component: TiendaComponent },
  { path: 'tienda', component: TiendaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
