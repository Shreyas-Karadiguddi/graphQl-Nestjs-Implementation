import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Job } from '../jobs/job.model.js';
import { CompaniesService } from './companies.service.js';
import { Company } from './company.model.js';
import { CreateCompanyInput } from './dto/create-company.input.js';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Query(() => [Company])
  companies() {
    return this.companiesService.findAll();
  }

  @Query(() => Company)
  company(@Args('id', { type: () => Int }) id: number) {
    return this.companiesService.findOne(id);
  }

  @Mutation(() => Company)
  createCompany(@Args('input') input: CreateCompanyInput) {
    return this.companiesService.create(input);
  }

  @ResolveField(() => [Job])
  jobs(@Parent() company: Company) {
    return this.companiesService.findJobs(company.id);
  }
}
