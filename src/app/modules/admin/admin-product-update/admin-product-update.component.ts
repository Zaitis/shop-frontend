import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminMessageService } from '../admin-message.service';
import { AdminProductUpdateService } from './admin-product-update.service';
import { AdminProductUpdate } from './model/adminProductUpdate';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent implements OnInit {

  product!: AdminProductUpdate;
  productForm!: FormGroup;
  imageForm!: FormGroup;
  requriedFileTypes = "image/jpeg, image/png";
  image!: string;

  constructor(
    private router: ActivatedRoute,
    private adminProductUpdateService: AdminProductUpdateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      fullDescription: [''],
      categoryId: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required],
      image: [''],
      slug: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.imageForm = this.formBuilder.group({
      file: ['']
    })
  }

  getProduct() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.getProduct(id)
      .subscribe(product => this.image = product.image)
    this.adminProductUpdateService.getProduct(id)
      .subscribe(product =>
        this.productForm.setValue({
          name: product.name,
          description: product.description,
          fullDescription: product.fullDescription,
          categoryId: product.categoryId,
          price: product.price,
          currency: product.currency,
          image: product.image,
          slug: product.slug
        }))
  }

  submit() {
    let id = Number(this.router.snapshot.params['id']);
    this.adminProductUpdateService.saveProduct(id, this.productForm.value).subscribe({
      next: product => {
        this.productForm.setValue({
          name: product.name,
          description: product.description,
          fullDescription: product.fullDescription,
          categoryId: product.categoryId,
          price: product.price,
          currency: product.currency,
          image: this.image,
          slug: product.slug
        })
        this.snackBar.open("Change accepted.", "", { duration: 4000 });
      },
      error: err => this.adminMessageService.addSpringErrors(err.error)
    });
  }

  uploadFile() {

    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.adminProductUpdateService.uploadImage(formData)
      .subscribe(result => this.image = result.filename);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0]
      });
    }
  }
}