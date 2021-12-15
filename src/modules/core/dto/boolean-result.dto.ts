import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BooleanResult {
  @Field()
  public success!: boolean;
}
