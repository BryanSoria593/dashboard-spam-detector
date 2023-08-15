import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  MailListModel } from 'src/app/core/models/mail/mail.interface';
import { AppState } from 'src/app/state/app.state';
import { GeneralService } from '../../services/general.service';
import { DetailsGenericComponent } from '../mat-dialogs/details-generic/details-generic.component';

// import { selectLoading } from 'src/app/state/selectors/dashboard.selector';
// import { DetailsComponent } from '../../dashboard/components/mat-dialogs/details/details.component';
DetailsGenericComponent

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
export class ListComponent implements OnInit {

  @Input() title: string ='';
  @Input() listUsers$: Observable<MailListModel[]> = new Observable<MailListModel[]>;

  loading$: Observable<boolean> = new Observable<boolean>();

  displayedColumns: string[] = ['user', 'cargo', 'detection', 'counts'];

  dataSource: MatTableDataSource<MailListModel> = new MatTableDataSource<MailListModel>();
  @Input() countListUser : number = 5;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  isModalOpen = false;
  hasData: boolean = false;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private generalService: GeneralService

  ) { }

  ngOnInit(): void {

    if (this.listUsers$) {
      this.listUsers$.subscribe((data) => {
        
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
