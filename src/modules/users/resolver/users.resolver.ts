import { Resolver, Query } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from '../service/users.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  public getUsers() {}
}
