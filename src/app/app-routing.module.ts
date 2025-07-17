import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';
import { FullpageadminComponent } from './layouts/fullpageadmin/fullpageadmin.component';
import { AdminComponent } from './modules/admin/admin.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ProductComponent } from './modules/product/product.component';
import { AdminProductComponent } from 'src/app/modules/admin/admin-product/admin-product.component';
import { AdminProductUpdateComponent } from './modules/admin/admin-product/admin-product-update/admin-product-update.component';
import { AdminProductAddComponent } from './modules/admin/admin-product/admin-product-add/admin-product-add.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { AdminCategoryComponent } from './modules/admin/admin-category/admin-category.component';
import { AdminCategoryAddComponent } from './modules/admin/admin-category/admin-category-add/admin-category-add.component';
import { AdminCategoryUpdateComponent } from './modules/admin/admin-category/admin-category-update/admin-category-update.component';
import { CategoryComponent } from './modules/category/category.component';
import { AdminReviewComponent } from './modules/admin/admin-review/admin-review.component';
import { CartComponent } from './modules/cart/cart.component';
import { OrderComponent } from './modules/order/order.component';
import { AdminOrderUpdateComponent } from './modules/admin/admin-order/admin-order-update/admin-order-update.component';
import { AdminOrderComponent } from './modules/admin/admin-order/admin-order.component';
import { AdminOrderExportComponent } from './modules/admin/admin-order/admin-order-export/admin-order-export.component';
import { AdminOrderStatsComponent } from './modules/admin/admin-order/admin-order-stats/admin-order-stats.component';
import { AdminLoginComponent } from './modules/admin/admin-login/admin-login.component';
import { AdminemptyComponent } from './layouts/adminempty/adminempty.component';
import { AdminAuthorizeGuard } from './modules/admin/common/guard/adminAuthorizeGuard';
import { ProfileComponent } from './modules/profile/profile.component';
import { PrivacyPolicyComponent } from './modules/legal/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './modules/legal/terms-of-service/terms-of-service.component';
import { CookiePolicyComponent } from './modules/legal/cookie-policy/cookie-policy.component';


const routes: Routes = [
  {
    path:'', component: DefaultComponent, children: [
        {path: '', component: HomeComponent},
        {path: 'products', component: ProductComponent},
        {path: 'products/:slug', component: ProductDetailsComponent},
        {path: 'categories/:slug', component: CategoryComponent},
        {path: 'cart', component: CartComponent},
        {path: 'order', component: OrderComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'privacy', component: PrivacyPolicyComponent},
        {path: 'terms', component: TermsOfServiceComponent},
        {path: 'cookies', component: CookiePolicyComponent}
    ]
  },
  {
    path:'', component: FullpageComponent, children: [
        {path: 'login', component: LoginComponent}
         ]
  },
  {
    
      path: 'admin', 
      component: FullpageadminComponent, 
      canActivate: [AdminAuthorizeGuard],
      children: [
        { path: '', component: AdminComponent },
        { path: 'products', component: AdminProductComponent },
        { path: 'products/update/:id', component: AdminProductUpdateComponent },
        { path: 'products/add', component: AdminProductAddComponent },
        { path: 'categories', component: AdminCategoryComponent },
        { path: 'categories/update/:id', component: AdminCategoryUpdateComponent },
        { path: 'categories/add', component: AdminCategoryAddComponent },
        { path: 'reviews', component: AdminReviewComponent },
        { path: 'orders', component: AdminOrderComponent },
        { path: 'orders/update/:id', component: AdminOrderUpdateComponent },
        { path: 'orders/export', component: AdminOrderExportComponent },
        { path: 'orders/stats', component: AdminOrderStatsComponent }
      ]
    
  },
  {
    path:'', component: AdminemptyComponent, children: [
      
       {path: 'admin/login', component: AdminLoginComponent }

       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }