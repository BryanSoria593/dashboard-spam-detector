import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-generic',
  templateUrl: './confirm-generic.component.html',
})
export class ConfirmGenericComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }


  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

}
