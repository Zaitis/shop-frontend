import { Product } from "../../common/model/poduct";

export interface Category{
    name:string,
    description: string,
    slug:string,
    products: Array<Product>
}