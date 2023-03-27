import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AdminProductAddService } from './admin-product-add.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

  productForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private adminProductService: AdminProductAddService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }



  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    })
  }

  submit(){
    this.adminProductService.saveNewProduct(this.productForm.value)
    .subscribe(product =>{
      this.router.navigate(["/admin/products"])
      .then(() => this.snackBar.open("Product was been add","", {duration: 4000}))
    })
    
  }
}