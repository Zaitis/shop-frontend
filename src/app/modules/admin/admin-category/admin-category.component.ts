import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminCategoryDto } from './adminCategoryDto';
import { AdminCategoryService } from './admin-category.service';
import { AdminConfirmDialogService } from '../admin-confirm-dialog.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  displayedColumns: string[] = ["id", "name", "actions"];
  dataSource: Array<AdminCategoryDto> = [];
  @ViewChild(MatTable) table!: MatTable<any>

  constructor(private adminCategoryService: AdminCategoryService,
        private dialogService: AdminConfirmDialogService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.adminCategoryService.getCategories()
    .subscribe(categories => this.dataSource= categories)
  }

  confirmDelete(element: AdminCategoryDto){
    this.dialogService.openConfirmDialog("Do you really want delete this category?")
    .afterClosed()
    .subscribe(result => {
      if(result)
        this.adminCategoryService.deleteProduct(element.id)
        .subscribe(() => {
          this.dataSource.forEach((value,index) => {
            if(element == value) {
              this.dataSource.splice(index, 1); 
              this.table.renderRows();
            }
          })
        })
    });
  }
}
