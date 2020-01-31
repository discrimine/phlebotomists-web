import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../interfaces/user.interface';
import { MatSelectList } from 'src/app/core/interfaces/angular-material.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [
    {
      id: '1',
      login: '1',
      name: 'andriy',
      email: 'andriy.com',
      password: '1',
    },
    {
      id: '2',
      login: '2',
      name: 'sasha',
      email: 'sasha.com',
      password: '2',
    },
    {
      id: '3',
      login: '3',
      name: 'petro',
      email: 'petro.com',
      password: '3',
    },
  ];

  constructor() {

  }

  public signIn(login: string, password: string) {
    return this.users.find((user: User) => {
      return user.login === login && user.password === password;
    });
  }

  public getUser(id: number): Observable<User> {
    return null;
  }

  public getUsers() {

  }

  public addUser() {

  }

  public editUser() {

  }

  public deleteUser() {

  }

  public getEquipmentList(): Observable<MatSelectList<string>[]> {
    return of([
      {
        title: 'stethoscope',
        value: '6',
      },
      {
        title: 'bandage',
        value: '7',
      },
      {
        title: 'syringe 1mm',
        value: '1',
      },
      {
        title: 'syringe 2mm',
        value: '2',
      },
      {
        title: 'syringe 5mm',
        value: '3',
      },
      {
        title: 'gloves',
        value: '4',
      },
      {
        title: 'ice',
        value: '5',
      },
    ]);
  }
}
