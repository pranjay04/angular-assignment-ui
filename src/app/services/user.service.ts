import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(
      `${environment.BASE_URL_API}/user`
    );
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.BASE_URL_API}/user`,
      user
    );
  }

  public editUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(
      `${environment.BASE_URL_API}/user`,
      user
    );
  }

  public deleteUser(_id: string): Observable<any> {
    return this.httpClient.delete<Array<User>>(
      `${environment.BASE_URL_API}/user/${_id}`
    );
  }

}
