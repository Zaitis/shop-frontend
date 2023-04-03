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
}
