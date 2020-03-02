import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, of } from 'rxjs';

import { User } from '../interfaces/user.interfaces';
import { MatSelectList } from '../../core/interfaces/angular-material.interfaces';

@Injectable({
  providedIn: 'root'
})
// TODO: observable's typisation
export class UsersService {

  private apiLink: string;

  constructor(
    private http: HttpClient,
    private flashMessage: MatSnackBar,
  ) {
    this.apiLink = 'http://127.0.0.1:8000/api/'
  }

  public signUp(userInfo): Observable<any> {
    return this.http.post(this.apiLink + 'doctor/register', userInfo);
  }

  public signIn(email: string, password: string): Observable<any> {
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);
    return this.http.post(this.apiLink + 'login', body);
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

  public getDoctorsList(userToken: string): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/doctors?token=' + userToken);
  }

  public getEquipmentList(): Observable<MatSelectList<string>[]> {
    return of([]);
  }

  public errorHandler(err: HttpErrorResponse) {
    const errorMessage = err.error.error || 'Unexpected error, try again later';
    this.flashMessage.open(errorMessage, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
