import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RegisterComponent } from './register/register.component';
import { ActiveAccountComponent } from './active-account/active-account.component';

const routes: Routes = [
  {
    path: '',	
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'reset-password',
    component: ResetPasswordComponent
  },
  {
    path:'reset-password/:token',
    component: NewPasswordComponent
  },
  {
    path:'activate-account/:token',
    component: ActiveAccountComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
