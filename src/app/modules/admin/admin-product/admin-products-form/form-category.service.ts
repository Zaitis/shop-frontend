import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCategoryNameDto } from './adminCategoryNameDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormCategoryService {

  constructor(private http: HttpClient) { }

  getCategories():Observable<Array<AdminCategoryNameDto>>{
    return this.http.get<Array<AdminCategoryNameDto>>("/api/admin/categories");
  }
}
