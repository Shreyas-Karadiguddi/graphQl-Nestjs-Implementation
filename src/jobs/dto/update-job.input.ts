import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateJobInput } from './create-job.input.js';

// Same fields as CreateJobInput (except companyId), but all optional
@InputType()
export class UpdateJobInput extends PartialType(
  OmitType(CreateJobInput, ['companyId'] as const),
) {}
