import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
})
export class AddOrEditUserComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  isUpdated: boolean = false; // Variable para indicar si se ha realizado una actualización

  showButtonAdd: boolean = true;
  showButtonEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddOrEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
   
  ngOnInit(): void {
    this.startForm();
  }

  startForm() {    
    if (this.data) {
      this.userForm = this.formBuilder.group({
        email: [this.data.email, [Validators.required, Validators.email]],
        username: [this.data.username, Validators.required]
      });
      this.showButtonAdd = false;
      this.showButtonEdit = true;

      // Guardar los valores iniciales del formulario
      const initialValues = this.userForm.value;
      this.userForm.valueChanges.subscribe((newValues) => {
        // Verificar si los valores han cambiado
        this.isUpdated = JSON.stringify(newValues) !== JSON.stringify(initialValues);
      });
    } else {
      this.userForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required]
      });
    }
  }
  
  addUser() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  updateUser() {
    if (this.userForm.valid && this.isUpdated) {
      this.dialogRef.close(this.userForm.value);
    } 
  }

  close() {
    this.dialogRef.close();
  }
}
