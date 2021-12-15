import { AuthenticationResolver } from '@modules/auth/resolver/auth.resolver';
import { AuthCookiesConfigurationService } from '@modules/auth/services/auth-cookies-configurator.service';
import { AuthenticationService } from '@modules/auth/services/auth.service';
import { CustomJwtModule } from '@modules/jwt/jwt.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, CustomJwtModule, ConfigModule],
  providers: [
    AuthenticationService,
    AuthCookiesConfigurationService,
    AuthenticationResolver,
  ],
})
export class AuthenticationModule {}
