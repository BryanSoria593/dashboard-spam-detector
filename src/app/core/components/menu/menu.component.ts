import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from 'src/app/modules/auth/service/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  showToggle = 'hidden';

  hideWordsToMenu = '';

  widthMenu = 'w-40';

  logoArrow = 'fa-arrow-left';

  paddingLogoSpam = 'pl-4';

  marginArrowMenu = 'ml-32';
  showFilterMenu = false;

  constructor(
    private authService: AuthServiceService,
  ) { }

  ngOnInit(): void { }

  toggleFilters() {
    this.showFilterMenu = !this.showFilterMenu;
  }
  showMenu() {
    this.showToggle = this.showToggle === 'hidden' ? 'absolute z-10 sm:relative' : 'hidden';

  }
  closeMenu() {
    this.showToggle = this.showToggle === 'absolute z-10 sm:relative' ? 'hidden' : 'absolute z-10 sm:relative';
  }

  hideWords() {
    this.hideWordsToMenu = this.hideWordsToMenu === '' ? 'hidden' : '';
    this.widthMenu = this.widthMenu === 'w-40' ? 'w-16' : 'w-40';
    this.logoArrow = this.logoArrow === 'fa-arrow-left' ? 'fa-arrow-right' : 'fa-arrow-left';
    this.paddingLogoSpam = this.paddingLogoSpam === 'pl-4' ? 'pl-0' : 'pl-4';
    this.marginArrowMenu = this.marginArrowMenu === 'ml-32' ? 'ml-14' : 'ml-32';
  }

  logout() {
    this.authService.logout();
  }

}
