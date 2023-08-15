import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor(    
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.newFormGroup();
  }

  newFormGroup(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          
        ]),
        password: new FormControl('', [
          Validators.required,
        ]),
      }
    )
  }
  sendLogin(){
    this.store.dispatch(authActions.loginRequest({credentials: this.formLogin.value}));
  }

}
