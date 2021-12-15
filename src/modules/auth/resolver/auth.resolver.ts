import { cookiesOptions } from '@modules/auth/cookies-options';
import { LoginUserDto } from '@modules/auth/dto/login.dto';
import { RegisterUserDto } from '@modules/auth/dto/register.dto';
import { AuthenticationService } from '@modules/auth/service/auth.service';
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

  @Mutation(() => String)
  public async logout(@Context() ctx: Ctx) {
    ctx.res.cookie('Authentication', '');
    return 'successfully logged out';
  }
}
