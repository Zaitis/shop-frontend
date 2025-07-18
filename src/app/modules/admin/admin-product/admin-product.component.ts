import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { map, startWith, switchMap } from 'rxjs';
import { AdminConfirmDialogService } from '../common/service/admin-confirm-dialog.service';
import { AdminProductService } from './admin-product.service';
import { AdminProduct } from './model/adminProduct';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!:MatTable<any>;
  displayedColumns: string[] = ["id", "image", "name","category" , "price", "actions"];
  totalElements: number = 0;
  dataSource: AdminProduct[] = [];
   
  constructor(
    private adminProductService: AdminProductService,
    private dialogService: AdminConfirmDialogService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() =>{
        return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize)
      }),
      map(data =>{
        this.totalElements=data.totalElements;
        return data.content;
      })
    ).subscribe(data => this.dataSource = data);
  }

  confirmDelete(element: AdminProduct){
    this.dialogService.openConfirmDialog("Do you really want delete this product?")
    .afterClosed()
    .subscribe(result => {
      if(result)
        this.adminProductService.deleteProduct(element.id)
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

  openImageDialog(imagePath: string): void {
    // For now, just open image in new tab
    // In a real app, you could create a dialog component to show the image
    const imageUrl = `/api/data/productImage/${imagePath}`;
    window.open(imageUrl, '_blank');
  }
}