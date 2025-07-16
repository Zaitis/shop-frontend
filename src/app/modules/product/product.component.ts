import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/modules/common/model/page';
import { Product } from '../common/model/poduct';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  page!: Page<Product>;
  loading: boolean = false;
  
  // Search and filter properties
  searchTerm: string = '';
  sortBy: string = 'name';
  priceRange: string = 'all';
  viewMode: 'grid' | 'list' = 'grid';
  
  // Pagination properties
  currentPage: number = 0;
  pageSize: number = 12;
  
  // Original data for filtering
  allProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.getProductPage(0, this.pageSize);
  }

  onPageEvent(event: PageEvent){
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProductPage(event.pageIndex, event.pageSize);
  }

  onSearchChange() {
    this.currentPage = 0;
    this.getProductPage(0, this.pageSize);
  }

  onSortChange() {
    this.currentPage = 0;
    this.getProductPage(0, this.pageSize);
  }

  onPriceFilterChange() {
    this.currentPage = 0;
    this.getProductPage(0, this.pageSize);
  }

  toggleView() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  clearFilters() {
    this.searchTerm = '';
    this.sortBy = 'name';
    this.priceRange = 'all';
    this.currentPage = 0;
    this.getProductPage(0, this.pageSize);
  }

  private getProductPage(page: number, size: number) {
    this.loading = true;
    this.productService.getProducts(page, size)
      .subscribe({
        next: (response) => {
          this.page = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.loading = false;
        }
      });
  }
}
