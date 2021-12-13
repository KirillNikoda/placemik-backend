import { AuthenticationResolver } from '@modules/auth/resolver/auth.resolver';
import { AuthenticationService } from '@modules/auth/service/auth.service';
import { CustomJwtModule } from '@modules/jwt/jwt.module';
import { UsersModule } from '@modules/users/module/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule, CustomJwtModule],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
