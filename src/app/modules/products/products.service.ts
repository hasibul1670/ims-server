import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      throw new NotFoundException(`Invalid product ID: ${id}`);
    }

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      throw new NotFoundException(`Invalid product ID: ${id}`);
    }

    try {
      return await this.prisma.product.update({
        where: { id: productId },
        data: updateProductDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      throw new NotFoundException(`Invalid product ID: ${id}`);
    }

    try {
      return await this.prisma.product.delete({
        where: { id: productId },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }
}
