import { User } from '@modules/users/entities/user.entity';
import { UsersResolver } from '@modules/users/resolver/users.resolver';
import { UsersService } from '@modules/users/service/users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
