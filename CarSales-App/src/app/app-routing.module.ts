import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { HomeComponent } from './Pages/home/home.component';
import { ShowcaseComponent } from './Pages/showcase/showcase.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { PaymentPageComponent } from './Pages/payment-page/payment-page.component';
import { AddProductComponent } from './Pages/add-product/add-product.component';

const routes: Routes = [
  { path: 'sign-in', title: 'Sign in', component: LoginComponent},
  { path: 'sign-up', title: 'Sign up', component: SignUpComponent},
  { path: 'nav-bar', component: NavBarComponent},
  { path: 'side-bar', component: SideBarComponent},
  { path : '', title: 'Home', component: HomeComponent},
  { path: 'car-details/:id',title: 'Car Details', component: ShowcaseComponent},
  { path: 'payment', title: 'Payment', component: PaymentPageComponent},
  { path: 'add-product', title: 'Add Product', component: AddProductComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
