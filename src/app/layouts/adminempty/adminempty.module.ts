import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminemptyComponent } from './adminempty.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from 'src/app/modules/admin/admin-login/admin-login.component';




@NgModule({
  declarations: [
    AdminemptyComponent,
   AdminLoginComponent

  
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    
    RouterModule   
  ]
})
export class AdminemptyModule { }