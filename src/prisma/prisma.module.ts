import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 Makes this module available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Export the service so it can be injected elsewhere
})
export class PrismaModule { }
