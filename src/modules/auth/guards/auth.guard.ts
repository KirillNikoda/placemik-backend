import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.cookies['Authentication'];

    if (!token) {
      return false;
    }

    const isVerified = await this.jwtService.verify(token);

    if (!isVerified) {
      return false;
    }

    return true;
  }
}
