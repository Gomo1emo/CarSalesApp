import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { ShowcaseComponent } from './Pages/showcase/showcase.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'showcase', component: ShowcaseComponent},
  { path: 'nav-bar', component: NavBarComponent},
  { path: 'side', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
