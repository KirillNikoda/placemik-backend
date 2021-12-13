import { Field, ObjectType } from '@nestjs/graphql';

import { LoginUserDto } from '@modules/auth/dto/login.dto';

@ObjectType()
export class RegisterUserDto extends LoginUserDto {
  @Field({ nullable: true })
  public firstName?: string;

  @Field({ nullable: true })
  public lastName?: string;
}
