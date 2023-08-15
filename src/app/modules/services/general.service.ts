import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { ConfirmGenericComponent } from '../dashboard/components/mat-dialogs/confirm-generic/confirm-generic.component';

import { GenericInformationComponent } from 'src/app/core/components/mat-dialogs/generic-information/generic-information.component';
import { LoadingComponent } from 'src/app/core/components/mat-dialogs/loading/loading.component';
import { ConfirmGenericComponent } from '../components/mat-dialogs/confirm-generic/confirm-generic.component';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private dialog: MatDialog

  ) { }

  openDialogConfirm(title: string, description: string, logo: string, color: string) {

    const dialogRef = this.dialog.open(ConfirmGenericComponent, {
      width: '350px',
      hasBackdrop: true,
      data: {
        title,
        description,
        logo,
        color
      },

    })
    dialogRef.backdropClick().subscribe(() => {
      // Realizar alguna acción al hacer clic fuera del modal
      dialogRef.close();
    });
    return dialogRef.afterClosed()

  }

  openDialogGeneric(title:string,logo:string, color:string) {
    const dialogRef = this.dialog.open(GenericInformationComponent, {
      width: '350px',
      data:{
        title,
        logo,
        color,
        
      },            
    })

    setTimeout(() => {
      dialogRef.close()     
    }, 2000);
  }
  openDialogLoading(logo:string, color:string, length:number=0, count:number=0){
    const dialogRef = this.dialog.open(LoadingComponent, {
      width: '350px',
      data:{        
        logo,
        color,
        length,
        count
      },            
    })
    return dialogRef

  }


}
