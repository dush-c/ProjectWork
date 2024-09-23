import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import { JWTService} from "./jwt.service";
import {User} from "../interfaces/user.entity";
import {APIURL} from "../enviroments/api-url";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser$ = new BehaviorSubject<User | null>(null);

  currentUser$ = this._currentUser$.asObservable();

  constructor(
    private jwtSrv: JWTService,
    private http: HttpClient,
    private router: Router
  ) {
    this.fetchUser();
  }

  isLoggedIn() {
    return this.jwtSrv.hasToken();
  }

  login(username: string, password: string) {
    return this.http
      .post<{ user: User; token: string }>(`${APIURL}/api/login`, { username, password })
      .pipe(
        tap((res) => this.jwtSrv.setToken(res.token)),
        tap((res) => this._currentUser$.next(res.user)),
        map((res) => res.user)
      );
  }

  register(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    picture: string
  ) {
    return this.http.post(`${APIURL}/api/register`, {
      firstName,
      lastName,
      username,
      password,
      picture
    })
  }

  logout() {
    this.jwtSrv.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/']);
  }

  public fetchUser() {
    console.log("api log ",`${APIURL}/api/users/me`);
    this.http
      .get<User>(`${APIURL}/api/users/me`)
      .subscribe((user) => {
        this._currentUser$.next(user);
        console.log("user log: ",user);
      }
      );
  }

  updatePassword(newPassword: string, confirmPassword: string) {
    const body = {
      newPassword,
      confirmPassword
    };
    this.http.patch<any>(`${APIURL}/api/users/updatePassword`, body)
      .subscribe(_ => {
        console.log("Password Aggiornata con successo");
      });
  }
}

