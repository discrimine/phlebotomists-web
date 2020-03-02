import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, of } from 'rxjs';

import { User } from '../interfaces/user.interfaces';
import { MatSelectList } from '../../core/interfaces/angular-material.interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private flashMessage: MatSnackBar,
  ) {

  }

  public signIn(email: string, password: string) {
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post('http://127.0.0.1:8000/api/login', body);
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
    return of([]);
  }

  public errorHandler(err: HttpErrorResponse) {
    const errorMessage = err.error.error || 'Unexpected error, try again later';
    this.flashMessage.open(errorMessage, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    })
  }
}
