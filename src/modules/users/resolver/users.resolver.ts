import { User } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/service/users.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  public getUsers() {}
}
