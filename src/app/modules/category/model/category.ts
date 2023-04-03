import { Product } from "../../product/model/poduct";

export interface Category{
    name:string,
    description: string,
    slug:string,
    products: Array<Product>
}