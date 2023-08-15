import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-generic',
  templateUrl: './details-generic.component.html',
})
export class DetailsGenericComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DetailsGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public mail:any
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
