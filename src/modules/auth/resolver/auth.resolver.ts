import { AuthenticationService } from '@modules/auth/service/auth.service';
import { User } from '@modules/users/entities/user.entity';
import { Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => User)
  register() {}

  @Mutation()
  login() {}
}
