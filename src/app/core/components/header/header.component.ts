import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/modules/auth/service/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string='DASHBOARD';


  constructor(
    private authService: AuthServiceService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();

  }

}
