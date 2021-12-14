import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as b from 'bcrypt';

import { UsersService } from '@modules/users/service/users.service';
import { RegisterUserDto } from '@modules/auth/dto/register.dto';
import { LoginUserDto } from '@modules/auth/dto/login.dto';
import { TokenPayload } from '@modules/auth/interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import { Ctx } from 'types/context';

const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: false,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getBy({ email });
      await this.verifyPassword(user.password, hashedPassword);

      return user;
    } catch (e) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public async register(registerUserDto: RegisterUserDto) {
    const hashedPassword = await b.hash(registerUserDto.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registerUserDto,
        password: hashedPassword,
      });

      return createdUser;
    } catch (e: any) {
      // postgres error appears while trying to add already existing row
      if (e?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async login(loginUserDto: LoginUserDto, ctx: Ctx) {
    const user = await this.usersService.getBy({ email: loginUserDto.email });

    if (!user) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.verifyPassword(loginUserDto.password, user.password);
    } catch (e) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }

    ctx.res.cookie('access_token', this.getCookieWithJwtToken(user.id));

    return user;
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME'
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await b.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
