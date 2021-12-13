import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
