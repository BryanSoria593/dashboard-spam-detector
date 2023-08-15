import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserService } from '../../services/user.service';
import { selectUsername, selectMail } from 'src/app/state/selectors/user.selector';
import { Observable, combineLatest, filter, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/modules/services/general.service';
import * as UserActions from 'src/app/state/actions/auth.actions';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: []
})

export class EditProfileComponent implements OnInit {

  username$: Observable<string> = new Observable<string>();
  mail$: Observable<string> = new Observable<string>();

  form: FormGroup = new FormGroup({}) ;
  formUpdateInfo: FormGroup = new FormGroup({});
  formUpdatePassword: FormGroup = new FormGroup({});

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private generalService: GeneralService,
    private fb: FormBuilder,
    

    
  ) { }

  ngOnInit(): void {
    this.newFormGroup();
    this.getInfoForUser();
    this.setValuesInFormInfoUser();
    
  }

  getInfoForUser(): void {
    this.username$ = this.store.select(selectUsername);
    this.mail$ = this.store.select(selectMail);
  }
  newFormGroup(): void {
    this.formUpdateInfo = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,

        ]),
        email: new FormControl('', [
          Validators.email,
          Validators.required

        ]),
        password: new FormControl('', [
          Validators.required,
        ]),
      }
    )
    this.formUpdatePassword = new FormGroup({
        currentPassword: new FormControl('', [
          Validators.required,
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
                
      },{
        validators: [this.checkPasswords, this.chechPatternPassword]
      }
    )
  }

  checkPasswords: ValidatorFn = (control: AbstractControl) => {
    const pass = control.get('newPassword')?.value;
    const confirmPass = control.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  chechPatternPassword: ValidatorFn = (control: AbstractControl) => {
    
    const pass = control.get('newPassword')?.value;
    const confirmPass = control.get('confirmPassword')?.value;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/;
    
    return pattern.test(pass) && pattern.test(confirmPass) ? null : { notPattern: true };
  }

  currentInfoUser(): { currentMail: string, currentUsername: string } {
    let currentUsername = ''
    let currentMail = ''

    combineLatest([this.mail$, this.username$]).subscribe(([email, username]) => {
      currentMail = email;
      currentUsername = username;
    });
    return { currentMail, currentUsername }
  }

  setValuesInFormInfoUser(): void {
    this.username$.pipe(take(1)).subscribe(username => {
      this.formUpdateInfo.patchValue({
        username: username
      });
    });

    this.mail$.pipe(take(1)).subscribe(email => {
      this.formUpdateInfo.patchValue({
        email: email
      });
    });
  }

  updateProfile(): void {
    const { currentMail, currentUsername } = this.currentInfoUser();
    if (this.formUpdateInfo.invalid) {
      this.generalService.openDialogGeneric('Debes completar todos los campos', 'fa-solid fa-xmark', 'text-red-500');
      return;
    }
    const dialogRef = this.generalService.openDialogConfirm('Actualizar información de usuario', '¿Estás seguro de actualizar los datos?', 'fa-solid fa-question', 'text-blue-500');

    dialogRef.subscribe((result) => {
      if (result) {
        this.store.dispatch(UserActions.updateProfileRequest({
          credentials: {
            currentUsername: currentUsername,
            currentEmail: currentMail,
            newUsername: this.formUpdateInfo.value.username,
            newEmail: this.formUpdateInfo.value.email,
            password: this.formUpdateInfo.value.password
          }
        }))
      }
    });
  }

  updatePassword(): void {
    if (this.formUpdatePassword.invalid) {
      this.generalService.openDialogGeneric('Debes completar todos los campos', 'fa-solid fa-xmark', 'text-red-500');
      return;
    }
    const dialogRef = this.generalService.openDialogConfirm('Actualizar contraseña', '¿Estás seguro de actualizar la contraseña?', 'fa-solid fa-question', 'text-blue-500');
    const { currentMail } = this.currentInfoUser();

    dialogRef.subscribe((result) => {
      if (result) {
        this.store.dispatch(UserActions.updatePasswordRequest({
          credentials: {
            email: currentMail,
            currentPassword: this.formUpdatePassword.value.currentPassword,
            newPassword: this.formUpdatePassword.value.newPassword,
            confirmNewPassword: this.formUpdatePassword.value.confirmPassword
          }
        }))
      }
    });
  }
}
