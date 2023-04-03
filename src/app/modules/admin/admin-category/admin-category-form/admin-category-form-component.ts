import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdminCategoryDto } from "../adminCategoryDto";


@Component({
  selector: 'app-admin-category-form',
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
        <textarea matInput rows="10" placeholder="Product description" formControlName="description"></textarea>  
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
export class AdminCategoryFormComponent implements OnInit {

  @Input()
  parentForm!: FormGroup;
  categories: Array<AdminCategoryDto> =[]; 

  constructor(){}
    ngOnInit(): void {
    }





  get name() {
    return this.parentForm.get("name");
  }

  get description() {
    return this.parentForm.get("description");
  }

  get slug() {
    return this.parentForm.get("slug");
  }

}