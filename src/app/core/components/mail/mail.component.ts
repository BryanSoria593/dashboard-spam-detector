import { AfterViewInit, Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Observable } from 'rxjs';
import { selectLoading, selectMails } from 'src/app/state/selectors/mail.selector';

import { MailReportModel } from 'src/app/core/models/mail/mail.interface';
import { MatDialog } from '@angular/material/dialog';

import { GeneralService } from 'src/app/modules/services/general.service';
import { DetailsGenericComponent } from 'src/app/modules/components/mat-dialogs/details-generic/details-generic.component';


@Component({
  selector: 'app-mail',
  styleUrls: ['./mail.component.scss'],
  templateUrl: './mail.component.html',
})
export class MailComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'dateOfReport', 'to', 'from', 'subject', 'prediction',  'actions'];

  dataSource: MatTableDataSource<MailReportModel> = new MatTableDataSource<MailReportModel>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  mails$: Observable<MailReportModel[]> = new Observable<MailReportModel[]>;
  loading$: Observable<boolean> = new Observable<boolean>();

  isModalOpen = false;
  hasData: boolean = false;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private generalService: GeneralService

  ) { }

  ngOnInit(): void {

    this.loading$ = this.store.select(selectLoading)
    this.mails$ = this.store.select(selectMails)

    if (this.mails$) {
      this.mails$.subscribe((data) => {
        this.dataSource.data = data;
        this.hasData = data.length > 0;
      });
    }
  }

  ngAfterViewInit() {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDetails(row: any) {

    if (!this.isModalOpen) {
      const dialogRef = this.dialog.open(DetailsGenericComponent, {
        data: {
          mail: row
        },
        hasBackdrop: true,
        width: '800px'
      });

      dialogRef.backdropClick().subscribe(() => {
        // Realizar alguna acción al hacer clic fuera del modal
        dialogRef.close();
        this.isModalOpen = false;
      });

      dialogRef.afterClosed().subscribe(() => {
        // Al cerrar el modal, actualiza la variable isModalOpen
        this.isModalOpen = false;
      });

      // Actualiza la variable isModalOpen al abrir el modal
      this.isModalOpen = true;
    }
  }  
}


