import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-information',
  templateUrl: './generic-information.component.html',
  styleUrls: ['./generic-information.component.scss']
})
export class GenericInformationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<GenericInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public message:any
  ) { }

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close()
  }

}
