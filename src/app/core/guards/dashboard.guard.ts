import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/modules/auth/service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verifyLogin();
  }
  async verifyLogin() {
    if (await this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/auth/']);
    return false;
  }
  

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

}
