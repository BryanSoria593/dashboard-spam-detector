import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FilterUserModel } from 'src/app/core/models/list-filter/list-filter.interface';
import { AddOrEditUserComponent } from '../mat-dialogs/add-or-edit-user/add-or-edit-user.component';

import { ConfirmGenericComponent } from '../mat-dialogs/confirm-generic/confirm-generic.component'
import { GeneralService } from '../../services/general.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { deleteUserListRequest, postUserBlackListRequest, postUserWhiteListRequest, updateUserWhiteListRequest } from 'src/app/state/actions/lists-filter.actions';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: []
})
export class ListFilterComponent implements OnInit {

  @Input() identifier: string = '';
  @Input() listUsers$: Observable<FilterUserModel[]> = new Observable<FilterUserModel[]>;

  dataSource: MatTableDataSource<FilterUserModel> = new MatTableDataSource<FilterUserModel>();
  displayedColumns: string[] = ['id', 'username', 'email', 'date', 'actions'];
  countListUser: number = 5;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: false }) sort: MatSort | null = null;

  isModalOpen = false;
  hasData: boolean = false;

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private generalService: GeneralService,
    private store: Store<AppState>

  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });
  }

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

  addUser() {
    if (!this.isModalOpen) {
      const dialogRef = this.dialog.open(AddOrEditUserComponent, {
        hasBackdrop: true,
        width: '370px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (this.identifier == 'white') {
            this.store.dispatch(postUserWhiteListRequest({ user: result, typeUser: this.identifier }));
            return
          }
          if (this.identifier == 'black') {
            this.store.dispatch(postUserBlackListRequest({ user: result, typeUser: this.identifier }));
            return
          }
        }
      }
      )
    }
  }
  editUser(row: FilterUserModel) {
    if (!this.isModalOpen) {
      const dialogRef = this.dialog.open(AddOrEditUserComponent, {
        hasBackdrop: true,
        width: '370px',
        data: row
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.store.dispatch(updateUserWhiteListRequest({
            email: row.email,
            newEmail: result.email,
            newUsername: result.username
          }));
        }
      });
    }
  }
  deleteUser(row: FilterUserModel) {
    if (!this.isModalOpen) {
      const dialogRef = this.generalService.openDialogConfirm('Eliminar usuario', '¿Estás seguro de eliminar este usuario de la lista blanca?', 'fa-solid fa-triangle-exclamation', 'text-red-500');
      dialogRef.subscribe((result) => {
        if (result) {
          this.store.dispatch(deleteUserListRequest({ userDelete: row, typeUser: this.identifier }));
        }
      });
    }
  }
}
