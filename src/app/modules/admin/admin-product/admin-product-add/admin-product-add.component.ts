import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminMessageService } from '../../common/service/admin-message.service';
import { AdminProductAddService } from './admin-product-add.service';
import { AdminProductImageService } from '../admin-product-image.service';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {
  imageForm!: FormGroup;
  image!: string;
  productForm!: FormGroup;
  requriedFileTypes = "image/jpeg, image/png";
  constructor(private formBuilder: FormBuilder,
    private adminProductService: AdminProductAddService,
    private adminProductImageService: AdminProductImageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminMessageService: AdminMessageService
  ) { }



  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      fullDescription: ['',[Validators.required]],
      categoryId: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required],
      slug: ['', [Validators.required, Validators.minLength(4)]],
    })
    this.imageForm = this.formBuilder.group({
      file: ['']
    })
  }

  submit() {
    this.adminProductService.createProduct(this.productForm.value)
      .subscribe({
        next: product => {
          this.router.navigate(["/admin/products"])
            .then(() => this.snackBar.open("Product was been add", "", { duration: 5000 }))
        },
        error: err => this.adminMessageService.addSpringErrors(err.error)
      })
  }

  uploadFile() {

    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.adminProductImageService.uploadImage(formData)
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