import { Page } from "src/app/shared/model/page";
import { Product } from "../../product/model/poduct";
import { Category } from "./category";

export interface CategoryProducts{
    category: Category,
    products: Page<Product>
}