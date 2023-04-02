import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-admin-product-form',
  template: `
    <div [formGroup]="parentForm" fxLayout="column">
      <mat-form-field appearance="fill">
      <mat-label>Name</mat-label>
      <input matInput placeholder="Product name" formControlName="name">
      <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="erroMessages">
            <div *ngIf="name?.errors?.['required']">
              Name of product is required
            </div>
            <div *ngIf="name?.errors?.['minlength']">
              Name must have more than 4 digits.
            </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Friendly URL</mat-label>
      <input matInput placeholder="Product URL" formControlName="slug">
      <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)" class="erroMessages">
            <div *ngIf="slug?.errors?.['required']">
              Name of product is required
            </div>
            <div *ngIf="slug?.errors?.['minlength']">
              Name must have more than 4 digits.
            </div>
      </div>
    </mat-form-field>

    <mat-form-field appearance="fill">
        <mat-label>Description</mat-label>
        <textarea matInput rows="20" placeholder="Product description" formControlName="description"></textarea>
        <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="erroMessages">
            <div *ngIf="description?.errors?.['required']">
              Description is required
            </div>
            <div *ngIf="description?.errors?.['minlength']">
              Description must have more than 4 digits.
            </div>
      </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Full description</mat-label>
        <textarea matInput rows="20" placeholder="Full product description" formControlName="fullDescription"></textarea>
        <div *ngIf="fullDescription?.invalid && (fullDescription?.dirty || fullDescription?.touched)" class="erroMessages">
            <div *ngIf="fullDescription?.errors?.['required']">
              Description is required
            </div>
            <div *ngIf="fullDescription?.errors?.['minlength']">
              Description must have more than 4 digits.
            </div>
      </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Category</mat-label>
        <input matInput placeholder="Product Category" formControlName="category">
        <div *ngIf="category?.invalid && (category?.dirty || category?.touched)" class="erroMessages">
            <div *ngIf="category?.errors?.['required']">
              Category is required
            </div>
            <div *ngIf="category?.errors?.['minlength']">
              Category must have more than 4 digits.
            </div>
      </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Price</mat-label>
        <input matInput placeholder="Product price" formControlName="price">
        <div *ngIf="price?.invalid && (price?.dirty || price?.touched)" class="erroMessages">
            <div *ngIf="price?.errors?.['required']">
              Price is required
            </div>
            <div *ngIf="price?.errors?.['min']">
              Price must be bigger than 0
            </div>
      </div>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Currency</mat-label>
        <input matInput placeholder="Price currency" formControlName="currency">
        <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)" class="erroMessages">
            <div *ngIf="currency?.errors?.['required']">
              Currency is required. Must be one of PLN, USD, EUR
            </div>
            
      </div>
      </mat-form-field>

      <div fxLayoutAlign="end">
        <button mat-flat-button color="primary" [disabled]="!parentForm.valid">Save</button>
      </div>
</div>`,
  styles: [`
          .erroMessages{
            color: red;
          }`]
})
export class AdminProductFormComponent implements OnInit {

  @Input()
  parentForm!: FormGroup;

  ngOnInit(): void {

  }

  get name() {
    return this.parentForm.get("name");
  }

  get description() {
    return this.parentForm.get("description");
  }

  get fullDescription() {
    return this.parentForm.get("fullDescription");
  }

  get category() {
    return this.parentForm.get("category");
  }

  get price() {
    return this.parentForm.get("price");
  }

  get currency() {
    return this.parentForm.get("currency");
  }

  get slug() {
    return this.parentForm.get("slug");
  }

}