import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserDto {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
