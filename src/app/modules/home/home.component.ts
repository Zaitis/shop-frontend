import { Component, OnInit } from '@angular/core';
import { Product } from '../common/model/poduct';
import { ProductService } from '../product/product.service';
import { SidebarService } from 'src/app/shared/components/sidebar/sidebar.service';
import { SideBarCategory } from 'src/app/shared/components/sidebar/model/sideBarCategory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  categories: SideBarCategory[] = [];
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts(0, 6).subscribe({
      next: (response) => {
        this.products = response.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.sidebarService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

}
