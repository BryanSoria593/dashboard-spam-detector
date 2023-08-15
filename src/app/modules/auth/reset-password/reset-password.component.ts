import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: []
})
export class ResetPasswordComponent implements OnInit {

  formResetPassword: FormGroup = new FormGroup({});

  mailResponse$: boolean = false;

  constructor(
    private authService: AuthServiceService,
    

  ) { }

  ngOnInit(): void {
    this.newFormGroup();

  }

  newFormGroup(): void {
    this.formResetPassword = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),

      }
    )
  }

  resetPassword() {
    this.authService.validateMail(this.formResetPassword.value.email).subscribe(
      (res) => {
        
        this.mailResponse$ = true;

      },
      (err) => {
        console.log(err);
        
        this.mailResponse$ = true;
      }
    )
  }

}
