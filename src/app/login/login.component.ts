import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient,private router: Router) { }

  login(username: string, password: string) {
    const credentials = { username: username, password: password };
    this.http.post<any>('/api/login', credentials).subscribe(data => {
      localStorage.setItem('token', data.token);
      // redirigir al usuario a la página de la tienda
      this.router.navigate(['/tienda']);
    });
  }
}
