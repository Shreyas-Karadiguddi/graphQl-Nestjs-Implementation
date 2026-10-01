import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CompaniesService } from '../companies/companies.service.js';
import { Company } from '../companies/company.model.js';
import { CreateJobInput } from './dto/create-job.input.js';
import { UpdateJobInput } from './dto/update-job.input.js';
import { Job } from './job.model.js';
import { JobsService } from './jobs.service.js';

@Resolver(() => Job)
export class JobsResolver {
  constructor(
    private readonly jobsService: JobsService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Query(() => [Job])
  jobs(
    @Args('location', { type: () => String, nullable: true }) location?: string,
    @Args('remote', { type: () => Boolean, nullable: true }) remote?: boolean,
  ) {
    return this.jobsService.findAll(location, remote);
  }

  @Query(() => Job)
  job(@Args('id', { type: () => Int }) id: number) {
    return this.jobsService.findOne(id);
  }

  @Mutation(() => Job)
  createJob(@Args('input') input: CreateJobInput) {
    return this.jobsService.create(input);
  }

  @Mutation(() => Job)
  updateJob(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateJobInput,
  ) {
    return this.jobsService.update(id, input);
  }

  @Mutation(() => Job)
  deleteJob(@Args('id', { type: () => Int }) id: number) {
    return this.jobsService.remove(id);
  }

  @ResolveField(() => Company)
  company(@Parent() job: Job) {
    return this.companiesService.findOne(job.companyId);
  }
}
