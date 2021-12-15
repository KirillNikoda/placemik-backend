import { cookiesOptions } from '@modules/auth/cookies-options';
import { AuthCookies } from '@modules/auth/interfaces/auth-cookies';
import { TokenPayload } from '@modules/auth/interfaces/token-payload.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Ctx } from 'types/context';

@Injectable()
export class AuthCookiesConfigurationService {
  private tokensConfig: Record<string, string>;

  constructor(private configService: ConfigService, private jwtService: JwtService) {
    this.tokensConfig = this.getTokensConfig();
  }

  public setTokensIntoCookies(userId: number, ctx: Ctx) {
    ctx.res.cookie(
      'Authentication',
      this.generateJwtToken(
        userId,
        this.tokensConfig.accessTokenSecret,
        this.tokensConfig.accessTokenExpirationTime
      ),
      cookiesOptions
    );

    ctx.res.cookie(
      'Refresh',
      this.generateJwtToken(
        userId,
        this.tokensConfig.refreshTokenSecret,
        this.tokensConfig.refreshTokenExpirationTime
      ),
      cookiesOptions
    );
  }

  private getTokensConfig() {
    return {
      accessTokenExpirationTime: <string>(
        this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
      ),
      accessTokenSecret: <string>this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      refreshTokenExpirationTime: <string>(
        this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
      ),
      refreshTokenSecret: <string>this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    };
  }

  private generateJwtToken(userId: number, secret: string, expiresIn: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      expiresIn,
      secret,
    });
    return token;
  }
}
