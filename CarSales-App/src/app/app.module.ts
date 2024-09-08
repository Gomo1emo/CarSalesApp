import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { ShowcaseComponent } from './Pages/showcase/showcase.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Components/footer/footer.component';
import { PaymentPageComponent } from './Pages/payment-page/payment-page.component';
import { AddProductComponent } from './Pages/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackComponent } from './Components/back/back.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomeComponent,
    ShowcaseComponent,
    SignUpComponent,
    FooterComponent,
    PaymentPageComponent,
    AddProductComponent,
    BackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
