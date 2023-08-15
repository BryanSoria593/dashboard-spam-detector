import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  formResetPassword: FormGroup = new FormGroup({});

  constructor(
    private routeA: ActivatedRoute,
    private authService: AuthServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.newFormGroup();
    this.validateToken();
  }

  newFormGroup(): void {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    this.formResetPassword = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(strongRegex)
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(strongRegex)
        ]),
      }
    )
  }
  validateToken(): void {
    const token = this.routeA.snapshot.paramMap.get('token');
    console.log(token);
    
    this.authService.validateTokenResetPassword(token).subscribe({      
      error: err => {        
        if (err.error.status !== 200) {
          this.route.navigate(['/404']);
        }
      }
    });
  }
  sendResetPassword() {
    const password = this.formResetPassword.value.password;
    const confirmPassword = this.formResetPassword.value.confirmPassword;
    const token = this.routeA.snapshot.paramMap.get('token') || '';
    this.authService.updatePassword(token, password, confirmPassword).subscribe({
      next: res => {
        
        this.route.navigate(['/']);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
