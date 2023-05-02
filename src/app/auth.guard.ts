import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      const token = localStorage.getItem('token');

      if (token) {
        // el usuario ha iniciado sesión, permitir el acceso a la ruta
        return true;
      } else {
        // el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
        return this.router.parseUrl('/login');
      }
    }

}
