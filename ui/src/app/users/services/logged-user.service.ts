import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  public user: User;

  constructor() {
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }
}
