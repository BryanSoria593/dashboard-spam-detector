import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MailInfoModel } from '../../models/mail/mail.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-info-spam-ham',
  templateUrl: './info-spam-ham.component.html',
})
export class InfoSpamHamComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dateOfAnalysis', 'prediction'];

  dataSource: MatTableDataSource<MailInfoModel> = new MatTableDataSource<MailInfoModel>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  @Input() mails$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>();

  isModalOpen = false;
  hasData: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.mails$) {
      this.mails$.subscribe((data) => {
        // Mostrar todos los correos sin filtrar
        this.dataSource.data = data;

        // Puedes eliminar esta línea si no necesitas contar los datos
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
}

