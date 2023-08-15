import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UserModule { }
