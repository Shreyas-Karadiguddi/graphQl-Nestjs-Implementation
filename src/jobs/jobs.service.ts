import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJobInput } from './dto/create-job.input.js';
import { UpdateJobInput } from './dto/update-job.input.js';

@Injectable()
export class JobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly companiesService: CompaniesService,
  ) {}

  findAll(location?: string, remote?: boolean) {
    return this.prisma.job.findMany({
      where: {
        location: location ? { contains: location } : undefined,
        remote: remote ?? undefined,
      },
    });
  }

  async findOne(id: number) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with id ${id} not found`);
    }
    return job;
  }

  async create(input: CreateJobInput) {
    // Throws NotFoundException if the company doesn't exist
    await this.companiesService.findOne(input.companyId);
    return this.prisma.job.create({ data: input });
  }

  async update(id: number, input: UpdateJobInput) {
    await this.findOne(id);
    return this.prisma.job.update({ where: { id }, data: input });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.job.delete({ where: { id } });
  }
}
