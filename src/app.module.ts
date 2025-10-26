import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './app/modules/products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './app/modules/brand/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProductsModule,
    BrandModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
