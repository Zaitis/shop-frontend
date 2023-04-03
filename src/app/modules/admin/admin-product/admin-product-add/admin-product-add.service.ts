import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminProductUpdate } from '../model/adminProductUpdate';
import { UploadResponse } from '../../common/model/UploadResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  constructor(private http: HttpClient) { }

  createProduct(product: AdminProductUpdate): Observable<AdminProductUpdate> {

    return this.http.post<AdminProductUpdate>("/api/admin/products", product)
  }
  
}