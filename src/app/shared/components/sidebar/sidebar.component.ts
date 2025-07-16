import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SideBarCategory } from './model/sideBarCategory';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories!: Array<SideBarCategory>

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.sidebarService.getCategories()
    .subscribe(categories => this.categories=categories);
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

}
