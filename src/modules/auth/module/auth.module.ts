import { AuthenticationResolver } from '@modules/auth/resolver/auth.resolver';
import { AuthenticationService } from '@modules/auth/service/auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
