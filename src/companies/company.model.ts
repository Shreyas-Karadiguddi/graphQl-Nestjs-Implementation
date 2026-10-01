import { Field, Int, ObjectType } from '@nestjs/graphql';

// The "jobs" field is added by @ResolveField in CompaniesResolver
@ObjectType()
export class Company {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  website?: string | null;

  @Field()
  createdAt: Date;
}
