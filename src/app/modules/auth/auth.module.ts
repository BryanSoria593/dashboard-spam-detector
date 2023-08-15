import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// Components
import { CoreModule } from 'src/app/core/core.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

// Material
import { MaterialModule } from './material.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, NewPasswordComponent],
    imports: [
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule,

        // Material
        MaterialModule

    ],
    entryComponents: []

})
export class AuthModule { }
