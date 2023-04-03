import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCategoryDto } from './adminCategoryDto';
import { Observable } from 'rxjs';
import { AdminCategory } from './model/adminCategory';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

 

  constructor(private http: HttpClient) { }

  createCategory(value: any):Observable<AdminCategory> {
    return this.http.post<AdminCategory>("/api/admin/categories", value);
  }

  getCategories():Observable<Array<AdminCategoryDto>>{
    return this.http.get<Array<AdminCategoryDto>>("/api/admin/categories");
  }

  getCategory(id: number) {
    return this.http.get<AdminCategory>("/api/admin/categories/"+id)
  }

  updateCategory(id: number, value: any): Observable<AdminCategory> {

    return this.http.put<AdminCategory>("/api/admin/categories/" +id, value);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>('/api/admin/categories/' + id);
  }

}
