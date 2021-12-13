import { Resolver, Mutation } from '@nestjs/graphql';

import { User } from 'src/modules/users/entities/user.entity';
import { AuthenticationService } from '../service/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthenticationService) {}

  @Mutation(() => User)
  register() {}

  @Mutation()
  login() {}
}
