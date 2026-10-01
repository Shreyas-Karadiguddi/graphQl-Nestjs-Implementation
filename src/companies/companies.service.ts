import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCompanyInput } from './dto/create-company.input.js';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return company;
  }

  findJobs(companyId: number) {
    return this.prisma.job.findMany({ where: { companyId } });
  }

  create(input: CreateCompanyInput) {
    return this.prisma.company.create({ data: input });
  }
}
