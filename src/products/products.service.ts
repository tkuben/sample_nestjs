import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './product.model'

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string {
        const newProduct = new Product(Math.round(Math.random() * 10000).toString(), title, desc, price);
        this.products.push(newProduct);
        return newProduct.id;
    }

    getProducts(): Product[] {
        return this.products;
    }

    getProduct(productId: string): Product {        
        return {...this.findProduct(productId)[0]};
    }

    updateProduct(productId: string, title: string, description: string, price: number): void {
        const [product, index] = this.findProduct(productId);
        const updateProduct = {...product};
        if (title) {
            updateProduct.title = title;
        }
        if (description) {
            updateProduct.description = description;
        }
        if (price) {
            updateProduct.price = price
        }
        this.products[index] = updateProduct;
    }
    
    deleteProduct(productId: string): void {
        const [_, index] = this.findProduct(productId);
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }


}