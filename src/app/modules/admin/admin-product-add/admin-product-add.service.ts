import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminProductUpdate } from '../admin-product-update/model/adminProductUpdate';
import { UploadResponse } from './model/UploadResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  constructor(private http: HttpClient) { }

  createProduct(product: AdminProductUpdate): Observable<AdminProductUpdate> {

    return this.http.post<AdminProductUpdate>("/api/admin/products", product)
  }
  

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("/api/admin/products/upload", formData);
  }
}