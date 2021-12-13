import { Module } from '@nestjs/common';
import { AuthenticationService } from '../service/auth.service';

@Module({
  imports: [],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
