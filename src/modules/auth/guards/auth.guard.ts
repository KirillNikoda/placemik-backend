import { UsersService } from '@modules/users/service/users.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const cookie = ctx.getContext().req.cookies['access_token'];
    console.log(cookie);

    if (!cookie) {
      return false;
    }

    const token = cookie.split('=')[1];

    const isVerified = await this.jwtService.verify(token);

    if (!isVerified) {
      return false;
    }

    return true;
  }
}
