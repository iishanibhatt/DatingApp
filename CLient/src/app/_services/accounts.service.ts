import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private http = inject(HttpClient);
  baseURL = 'https://localhost:5001/api/';
currentUser = signal<User | null>(null);
  
  login(model: any) {
    return this.http.post<User>(this.baseURL + 'account/login', model).pipe(
      map(user =>{
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }
  register(model: any) {
    return this.http.post<User>(this.baseURL + 'account/register', model).pipe(
      map(user =>{
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
        return user;
      })
    );
  }
  logout(){
    localStorage.removeItem('user')
    this.currentUser.set(null)
  }
}
