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

  getCategoryIcon(categoryName: string): string {
    const name = categoryName.toLowerCase();
    if (name.includes('desktop') || name.includes('computer')) return 'computer';
    if (name.includes('laptop')) return 'laptop';
    if (name.includes('monitor')) return 'monitor';
    if (name.includes('graphics') || name.includes('gpu')) return 'memory';
    if (name.includes('processor') || name.includes('cpu')) return 'developer_board';
    if (name.includes('memory') || name.includes('ram')) return 'memory';
    if (name.includes('storage') || name.includes('ssd') || name.includes('hdd')) return 'storage';
    if (name.includes('motherboard')) return 'developer_board';
    if (name.includes('case') || name.includes('cooling')) return 'cases';
    if (name.includes('accessory') || name.includes('accessories')) return 'keyboard';
    return 'category';
  }

  getDefaultDescription(categoryName: string): string {
    const name = categoryName.toLowerCase();
    if (name.includes('desktop') || name.includes('computer')) return 'Complete desktop computer systems and workstations for gaming, office work, and professional use';
    if (name.includes('laptop')) return 'Portable computers including gaming laptops, business laptops, and ultrabooks';
    if (name.includes('monitor')) return 'LCD, LED, OLED monitors for gaming, professional work, and general use';
    if (name.includes('graphics') || name.includes('gpu')) return 'Dedicated graphics cards for gaming, AI computing, and professional graphics work';
    if (name.includes('processor') || name.includes('cpu')) return 'CPUs from Intel and AMD for desktop and server systems';
    if (name.includes('memory') || name.includes('ram')) return 'RAM modules, DDR4, DDR5 memory for desktop and laptop computers';
    if (name.includes('storage') || name.includes('ssd') || name.includes('hdd')) return 'SSDs, HDDs, NVMe drives, and external storage solutions';
    if (name.includes('motherboard')) return 'Desktop motherboards for Intel and AMD processors';
    if (name.includes('case') || name.includes('cooling')) return 'Computer cases, CPU coolers, case fans, and liquid cooling systems';
    if (name.includes('accessory') || name.includes('accessories')) return 'Keyboards, mice, cables, adapters, and other computer accessories';
    return `Explore our ${categoryName} collection`;
  }

}
