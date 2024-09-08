import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Pages/home/home.component';
import { ShowcaseComponent } from './Pages/showcase/showcase.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { PaymentPageComponent } from './Pages/payment-page/payment-page.component';
import { AddProductComponent } from './Pages/add-product/add-product.component';
import { authGuardsGuard } from './guards/auth-guards.guard';
import { BackComponent } from './Components/back/back.component';

const routes: Routes = [
  { path: 'sign-in', title: 'Sign in', component: LoginComponent},
  { path: 'sign-up', title: 'Sign up', component: SignUpComponent},
  { path: 'nav-bar', component: NavBarComponent},
  { path : '', title: 'Home', component: HomeComponent},
  { path: 'car-details/:id',title: 'Car Details', component: ShowcaseComponent},
  { path: 'payment/:id', title: 'Payment', component: PaymentPageComponent, canActivate: [authGuardsGuard]},
  { path: 'add-product', title: 'Add Product', component: AddProductComponent, canActivate: [authGuardsGuard]},
  { path: 'back', component: BackComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
