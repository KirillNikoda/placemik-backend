import { AuthenticationResolver } from '@modules/auth/resolver/auth.resolver';
import { AuthenticationService } from '@modules/auth/service/auth.service';
import { CustomJwtModule } from '@modules/jwt/jwt.module';
import { UsersModule } from '@modules/users/module/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, CustomJwtModule, ConfigModule],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
