import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminProductUpdateService } from './admin-product-update.service';
import { AdminProductUpdate } from './model/adminProductUpdate';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent implements OnInit {

  product! : AdminProductUpdate;
  productForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private AdminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getProduct();
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    })
  }

  getProduct(){
    let id =  Number(this.router.snapshot.params['id']);
    this.AdminProductUpdateService.getProduct(id)
    .subscribe(product => this.productForm.setValue({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      currency: product.currency
    }));
 }
    
  submit(){
    let id =  Number(this.router.snapshot.params['id']);
    this.AdminProductUpdateService.saveProduct(id, this.productForm.value).subscribe(product => 
    this.productForm.setValue({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    currency: product.currency
    }));
    this.snackBar.open("Change accepted.","",{duration: 4000});  
  }
 }