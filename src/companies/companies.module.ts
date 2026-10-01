import { Module } from '@nestjs/common';
import { CompaniesResolver } from './companies.resolver.js';
import { CompaniesService } from './companies.service.js';

@Module({
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
