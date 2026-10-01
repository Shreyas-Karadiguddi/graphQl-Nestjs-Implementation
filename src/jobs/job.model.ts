import { Field, Int, ObjectType } from '@nestjs/graphql';

// The "company" field is added by @ResolveField in JobsResolver
@ObjectType()
export class Job {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  remote: boolean;

  @Field(() => Int, { nullable: true })
  salary?: number | null;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  companyId: number;
}
