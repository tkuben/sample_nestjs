import { Controller, Body, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    private readonly logger = new Logger(ProductsController.name);
    constructor(private readonly productService: ProductsService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number): any {            
        const productId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: productId};
    }

    @Get()
    getAllProducts(): Product[] {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string): Product {
        return this.productService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number) {
        this.logger.log(`About to Update Product ${prodId}`);
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
    }
    



}