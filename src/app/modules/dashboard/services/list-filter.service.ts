import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUserModel } from 'src/app/core/models/list-filter/list-filter.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListFilterService {
  private URL = environment.URLLOCAL;
  // private URL = environment.URLROOT;

  private readonly headers = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  getWhiteList( typeUser:string ): Observable<any> {
    const body={
      type_user: typeUser
    }
    
    return this.http.post(`${this.URL}/dashboard/get-whitelist`, body, { headers: this.headers })
  }
  postWhiteList(user: NewUserModel, typeUser:string): Observable<any> {
    const body = {
      email: user.email,
      username: user.username,
      type_user: typeUser
    }
    return this.http.post(`${this.URL}/dashboard/add-user-filter`, body, { headers: this.headers })
  }
  updateWhiteList(email:string, newEmail:string, newUsername:string): Observable<any> {
    const body = {
      email: email,
      newEmail: newEmail,
      newUsername: newUsername
    }
    return this.http.put(`${this.URL}/dashboard/update-whitelist`, body, { headers: this.headers })
  }

  deleteWhiteList(email: string): Observable<any> {
    const body = {
      email: email
    }
    return this.http.post(`${this.URL}/dashboard/delete-whitelist`, body, { headers: this.headers })
  }

  getBlackList(typeUser:string): Observable<any> {
    const body={
      type_user: typeUser
    }
    return this.http.post(`${this.URL}/dashboard/get-blacklist`, body, { headers: this.headers })
  }
}
