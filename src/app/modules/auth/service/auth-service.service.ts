import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { UserModel } from 'src/app/core/models/user/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';

import * as AuthAction from 'src/app/state/actions/auth.actions';


@Injectable({
  providedIn: 'root',

})
export class AuthServiceService {

  private URL = environment.URLLOCAL;
  // private URL = environment.URLROOT;

  private helper = new JwtHelperService();
  private readonly headers = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  async isLoggedIn(): Promise<boolean> {
    const token = this.cookieService.get('token');
    if (!token) {
      this.cookieService.delete('token', '/');
      return false;
    }
    try {
      const result = await lastValueFrom(this.validateToken(token));
      if (!result.ok) {
        this.cookieService.delete('token', '/');
        return false;
      }

      this.store.dispatch(AuthAction.persistUser({ user: result }));
      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/auth/']);
  }

  login(email: string, password: string): Observable<UserModel> {
    const body = {
      email,
      password
    }
    return this.http.post<UserModel>(`${this.URL}/auth/login`, body, { headers: this.headers })
  }

  register(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const body = {
      username,
      email,
      password,
      confirmPassword
    }
    return this.http.post<any>(`${this.URL}/auth/register`, body, { headers: this.headers })
  }

  acceptUser(token: string): Observable<any> {
    const body = {
      token
    }

    return this.http.post<any>(`${this.URL}/auth/activate-account`, body, { headers: this.headers })

  }

  rejectUser(token: string): Observable<any> {
    const body = {
      token
    }

    return this.http.post<any>(`${this.URL}/auth/reject-account`, body, { headers: this.headers })

  }

  mails() {
    return this.http.get(`${this.URL}/history`, { headers: this.headers })
  }

  validateMail(email: string): Observable<any> {
    const body = {
      email
    }
    return this.http.post<any>(`${this.URL}/auth/reset-password/get-email`, body, { headers: this.headers })
  }

  validateToken(token: any): Observable<any> {
    const body = {
      token
    }
    return this.http.post<any>(`${this.URL}/auth/validate-token-auth`, body, { headers: this.headers })
  }

  validateTokenResetPassword(token: any): Observable<any> {
    const body = {
      token
    }
    return this.http.post<any>(`${this.URL}/auth/validate-token`, body, { headers: this.headers })
  }

  updatePassword(token: string, password: string, confirmPassword: string): Observable<any> {
    const body = {
      password,
      confirmPassword,
      token
    }
    return this.http.post<any>(`${this.URL}/auth/reset-password/update-password`, body, { headers: this.headers })
  }




}
