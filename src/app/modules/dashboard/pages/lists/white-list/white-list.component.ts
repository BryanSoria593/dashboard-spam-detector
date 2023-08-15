import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  getUsersWhiteListRequest } from 'src/app/state/actions/lists-filter.actions';
import { AppState } from 'src/app/state/app.state';
import {FilterUserModel} from 'src/app/core/models/list-filter/list-filter.interface';
import { Observable } from 'rxjs';
import { selectWhiteUsersFilter } from 'src/app/state/selectors/list-filter.selector';
@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: []
})
export class WhiteListComponent implements OnInit {

  whiteList$ :Observable<FilterUserModel[]> = new Observable<FilterUserModel[]>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.dispatch(getUsersWhiteListRequest({typeUser: 'white'}));
    this.whiteList$ = this.store.select(selectWhiteUsersFilter);

    
  }
  
  
}
