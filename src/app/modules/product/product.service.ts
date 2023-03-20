import { Injectable } from '@angular/core';
import { Product } from './model/poduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[]{
    return [
      {
        name: "Product1",
        category: "Category1",
        description: "Description product1",
        price: 19.95,
        currency: "PLN"
      },
      {
        name: "Product2",
        category: "Category2",
        description: "Description product2",
        price: 2.95,
        currency: "PLN"
      },
      {
        name: "Product3",
        category: "Category3",
        description: "Description product3",
        price: 3.95,
        currency: "PLN"
      }
    ]
  }
}