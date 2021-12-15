import { LoginUserDto } from '@modules/auth/dto/login.dto';
import { RegisterUserDto } from '@modules/auth/dto/register.dto';
import { AuthenticationService } from '@modules/auth/services/auth.service';
import { BooleanResult } from '@modules/core/dto/boolean-result.dto';
import { User } from '@modules/users/entities/user.entity';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
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

  @Mutation(() => User)
  public async login(
    @Args('loginUserInput') loginUserDto: LoginUserDto,
    @Context() ctx: Ctx
  ) {
    return this.authService.login(loginUserDto, ctx);
  }

  @Mutation(() => BooleanResult)
  public async logout(@Context() ctx: Ctx) {
    ctx.res.cookie('Authentication', '');
    return {
      success: true,
    };
  }
}
