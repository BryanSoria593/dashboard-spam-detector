import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private URL = environment.URLLOCAL;
  // private URL = environment.URLROOT;

  private readonly headers = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }


  mailsHam():Observable<any>{
    return this.http.get(`${this.URL}/dashboard/detected-ham`, { headers: this.headers })
  }

  mailsSpam():Observable<any>{
    return this.http.get(`${this.URL}/dashboard/detected-spam`, { headers: this.headers })
  }

  alertsSentUser():Observable<any>{
    return this.http.get(`${this.URL}/dashboard/sent-alert`, { headers: this.headers })
  }

  mailsReportsHowSpam():Observable<any>{
    return this.http.get(`${this.URL}/dashboard/spam-report`, { headers: this.headers })
  }

  mailsFromAndTo(): Observable<any> {
    return this.http.get(`${this.URL}/dashboard/mails-dashboard`, { headers: this.headers })
  }

  mails(): Observable<any> {
    return this.http.get(`${this.URL}/history/all`, { headers: this.headers })
  }

}
