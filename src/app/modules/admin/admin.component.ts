import { Component, OnInit } from '@angular/core';
import { AdminProductService } from './admin-product/admin-product.service';
import { AdminCategoryService } from './admin-category/admin-category.service';
import { AdminOrderService } from './admin-order/admin-order.service';
import { AdminReviewService } from './admin-review/admin-review.service';
import { forkJoin } from 'rxjs';

interface RecentActivity {
  icon: string;
  description: string;
  time: Date;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  totalOrders: number = 0;
  totalProducts: number = 0;
  totalCategories: number = 0;
  totalReviews: number = 0;
  recentActivities: RecentActivity[] = [];

  constructor(
    private adminProductService: AdminProductService,
    private adminCategoryService: AdminCategoryService,
    private adminOrderService: AdminOrderService,
    private adminReviewService: AdminReviewService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadRecentActivities();
  }

  private loadDashboardData(): void {
    // Load dashboard statistics
    forkJoin({
      orders: this.adminOrderService.getOrders(0, 1),
      products: this.adminProductService.getProducts(0, 1),
      categories: this.adminCategoryService.getCategories(),
      reviews: this.adminReviewService.getReviews()
    }).subscribe({
      next: (data) => {
        this.totalOrders = data.orders.totalElements;
        this.totalProducts = data.products.totalElements;
        this.totalCategories = data.categories.length;
        this.totalReviews = data.reviews.length;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        // Set default values in case of error
        this.totalOrders = 0;
        this.totalProducts = 0;
        this.totalCategories = 0;
        this.totalReviews = 0;
      }
    });
  }

  private loadRecentActivities(): void {
    // Mock recent activities for now - in a real app, this would come from an API
    this.recentActivities = [
      {
        icon: 'shopping_cart',
        description: 'New order received',
        time: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        icon: 'inventory',
        description: 'Product stock updated',
        time: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        icon: 'rate_review',
        description: 'New review submitted',
        time: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
      }
    ];
  }
}