import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RegisterUserDto {
  @Field()
  public email!: string;

  @Field({ nullable: true })
  public firstName?: string;

  @Field({ nullable: true })
  public lastName?: string;

  @Field()
  public password!: string;
}
