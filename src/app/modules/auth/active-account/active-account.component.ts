import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html'
})
export class ActiveAccountComponent implements OnInit {

  username: string = '';
  email: string = '';

  constructor(
    private routeA: ActivatedRoute,
    private authService: AuthServiceService,
    private route: Router,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.validateToken();
  }

  validateToken(): void {
    const token = this.routeA.snapshot.paramMap.get('token');
    const dialogRef = this.generalService.openDialogLoading('fa-solid fa-spinner fa-spin', 'text-blue-500');
    this.authService.validateToken(token).subscribe({      
      next: ({data}) => {
        this.username = data.username;
        this.email = data.email;
        dialogRef.close();
      },
      error: err => {
        dialogRef.close();
        if (err.error.status !== 200) {
          this.route.navigate(['/404']);
        }
      }
    });
  }
  acceptUser(): void {
    const token = this.routeA.snapshot.paramMap.get('token') || '';
    const ref = this.generalService.openDialogLoading('fa-solid fa-spinner fa-spin', 'text-blue-500');
    this.authService.acceptUser(token).subscribe({
      next: (data) => {
        ref.close();
        this.route.navigate(['/auth/']);
        this.generalService.openDialogGeneric(data.message, 'fa-solid fa-check', 'text-green-500');
      }
    });
  }
  rejectUser(): void {
    const token = this.routeA.snapshot.paramMap.get('token') || '';
    this.authService.rejectUser(token).subscribe({
      next: ({data}) => {
        console.log(data);
        this.route.navigate(['/auth/']);
      }
    });

  }

}
