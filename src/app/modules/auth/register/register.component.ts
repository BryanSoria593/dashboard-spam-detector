import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as authActions from 'src/app/state/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthServiceService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.newFormGroup();
  }

  newFormGroup(): void {
    this.formRegister = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      },
      {
        validators: [this.checkPasswords, this.chechPatternPassword]
      }
    )
  }
  checkPasswords: ValidatorFn = (control: AbstractControl) => {
    const pass = control.get('password')?.value;
    const confirmPass = control.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  chechPatternPassword: ValidatorFn = (control: AbstractControl) => {
    const pass = control.get('password')?.value;
    const confirmPass = control.get('confirmPassword')?.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/;

    return pattern.test(pass) && pattern.test(confirmPass) ? null : { notPattern: true };
  }
  
  register(): void {
    
    const { username, email, password, confirmPassword } = this.formRegister.value;

    
    this.store.dispatch(authActions.registerRequest({ credentials: { username, email, password, confirmPassword } }))
    
  }
}
