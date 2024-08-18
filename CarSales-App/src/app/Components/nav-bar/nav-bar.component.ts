import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  loggedInUser: any;
  role: any

  constructor(private router: Router, private authService: AuthServiceService) { }

  ngOnInit(){
    if(this.authService.getUserIdFromToken() === null){
      this.loggedInUser = false;
    }
    else{
      this.loggedInUser = true;
    }
    this.role = this.authService.getRoleFromToken();
    console.log("role " + this.role);
  }

  logout(){
    this.authService.logout();

    this.refreshPage();

    this.router.navigate([''])
  }

  refreshPage() {
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload(); // Reload the page to refresh
    });
  }
}
