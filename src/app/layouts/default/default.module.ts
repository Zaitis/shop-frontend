import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { CategoryComponent } from 'src/app/modules/category/category.component';
import { ProductDetailsComponent } from 'src/app/modules/product-details/product-details.component';
import { CartComponent } from 'src/app/modules/cart/cart.component';
import { OrderComponent } from 'src/app/modules/order/order.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ForgotPasswordComponent } from 'src/app/modules/login/forgot-password/forgot-password.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { ReplacePipe } from 'src/app/modules/common/pipe/replacePipe';
import { PrivacyPolicyComponent } from 'src/app/modules/legal/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from 'src/app/modules/legal/terms-of-service/terms-of-service.component';
import { CookiePolicyComponent } from 'src/app/modules/legal/cookie-policy/cookie-policy.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductComponent,
    CategoryComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ReplacePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    CookiePolicyComponent
  ]
})
export class DefaultModule { }
