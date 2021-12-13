import { LoginUserDto } from '@modules/auth/dto/login.dto';
import { RegisterUserDto } from '@modules/auth/dto/register.dto';
import { AuthenticationService } from '@modules/auth/service/auth.service';
import { User } from '@modules/users/entities/user.entity';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => User)
  public register(@Args('registerUserInput') registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Mutation()
  public login(@Args('loginUserInput') loginUserDto: LoginUserDto) {}
}
