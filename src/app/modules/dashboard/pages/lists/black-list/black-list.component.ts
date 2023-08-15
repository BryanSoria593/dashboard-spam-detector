import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterUserModel } from 'src/app/core/models/list-filter/list-filter.interface';
import { getUsersBlackListRequest, getUsersWhiteListRequest } from 'src/app/state/actions/lists-filter.actions';

import { AppState } from 'src/app/state/app.state';
import { selectBlackUsersFilter } from 'src/app/state/selectors/list-filter.selector';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: []
})
export class BlackListComponent implements OnInit {

  blackList$ :Observable<FilterUserModel[]> = new Observable<FilterUserModel[]>();


  constructor(private store: Store<AppState>) {}


  ngOnInit(): void {
    this.store.dispatch(getUsersBlackListRequest({typeUser: 'black'}));
    this.blackList$ = this.store.select(selectBlackUsersFilter);
    // this.blackList$.subscribe((resp) => {
      // console.log(resp);
    // }
    // )
    
  }

}
