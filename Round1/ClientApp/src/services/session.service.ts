import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  public userId: number = 0;
  public username: string = '';
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  public isLoggedIn() {
    return this.userId > 0;
  }

  public logout() {
    let isLoggedIn = false;
    console.log('emitting logged in: ', isLoggedIn);
    this.isLoggedIn$.next(isLoggedIn);
    return this.userId = 0;
  }

  public login(userId: number, username: string) {
    this.userId = userId;
    this.username = username;
    let isLoggedIn = (this.userId > 0);
    console.log('emitting logged in: ', isLoggedIn);
    this.isLoggedIn$.next(isLoggedIn);
  }
}
