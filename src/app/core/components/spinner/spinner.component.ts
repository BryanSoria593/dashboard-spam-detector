import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectLoading } from 'src/app/state/selectors/mail.selector';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  loading$: Observable<boolean> = new Observable<boolean>;
  constructor(
    private store: Store<AppState>,

  ) { }

  ngOnInit(): void {
    console.log('SpinnerComponent');
    
    this.loading$ = this.store.select(selectLoading)



  }


}
