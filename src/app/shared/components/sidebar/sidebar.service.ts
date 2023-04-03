import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SideBarCategory } from './model/sideBarCategory';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) { }

  getCategories():Observable<Array<SideBarCategory>>{
    return this.http.get<Array<SideBarCategory>>("/api/categories");
  }
}
