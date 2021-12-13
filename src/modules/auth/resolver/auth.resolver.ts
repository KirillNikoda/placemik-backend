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

  @Mutation(() => String)
  public async login(@Context() ctx: Ctx) {
    console.log(ctx.req.cookies);

    ctx.res.cookie('my-cookie', 'cookie value');
    return '123';
  }
}
