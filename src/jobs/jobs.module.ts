import { Module } from '@nestjs/common';
import { CompaniesModule } from '../companies/companies.module.js';
import { JobsResolver } from './jobs.resolver.js';
import { JobsService } from './jobs.service.js';

@Module({
  imports: [CompaniesModule],
  providers: [JobsResolver, JobsService],
})
export class JobsModule {}
