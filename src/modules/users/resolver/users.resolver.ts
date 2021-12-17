import { User } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/service/users.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
