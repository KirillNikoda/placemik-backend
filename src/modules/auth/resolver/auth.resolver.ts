import { RegisterUserDto } from '@modules/auth/dto/register.dto';
import { AuthenticationService } from '@modules/auth/service/auth.service';
import { User } from '@modules/users/entities/user.entity';
import {
  Resolver,
  Mutation,
  Args,
  Context,
  GraphQLExecutionContext,
  Query,
} from '@nestjs/graphql';
import { Response } from 'express';
import { Ctx } from 'types/context';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => User)
  public async register(
    @Args('registerUserInput') registerUserDto: RegisterUserDto
  ) {
    return this.authService.register(registerUserDto);
  }

  @Mutation(() => String)
  public async login(@Context() ctx: Ctx) {}
}
