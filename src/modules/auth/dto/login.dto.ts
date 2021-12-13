import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginUserDto {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
