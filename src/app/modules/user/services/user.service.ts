import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.URLLOCAL;

  // private URL = environment.URLROOT;
  private readonly headers = new HttpHeaders({ 'Content-type': 'application/json' });


  constructor(
    private http: HttpClient

  ) { }


  updateProfile(currentUsername: string, currentEmail: string, newUsername: string, newEmail: string, password: string): Observable<any> {
    const body = {
      currentUsername,
      currentEmail,
      newUsername,
      newEmail,
      password
    }
    return this.http.post(`${this.URL}/auth/update-profile`, body, { headers: this.headers })
  }

  updatePassword(email: string, currentPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {

    console.log(email, currentPassword, newPassword, confirmNewPassword);
    
    const body = {
      email,
      currentPassword,      
      newPassword,
      confirmNewPassword
    }
    return this.http.post(`${this.URL}/auth/update-password`, body, { headers: this.headers })

  }

}
