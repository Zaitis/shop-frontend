import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CategoryProducts } from './model/categoryProducts';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categoryProducts!: CategoryProducts;
  loading: boolean = false;
  
  // View and sorting properties
  viewMode: 'grid' | 'list' = 'grid';
  sortBy: string = 'name';
  
  // Pagination properties
  currentPage: number = 0;
  pageSize: number = 12;
  
  private sub!: Subscription;
  
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getCategoryWithProducts(0, this.pageSize));
    this.getCategoryWithProducts(0, this.pageSize);
  }

  getCategoryWithProducts(page: number, size: number) {
    let slug = this.route.snapshot.params['slug'];
    this.loading = true;
    this.categoryService.getCategoryWithProducts(slug, page, size)
      .subscribe({
        next: (categoryProducts) => {
          this.categoryProducts = categoryProducts;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading category products:', error);
          this.loading = false;
        }
      });
  }

  onPageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCategoryWithProducts(event.pageIndex, event.pageSize);
  }

  toggleView() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  onSortChange() {
    this.currentPage = 0;
    this.getCategoryWithProducts(0, this.pageSize);
  }
}
