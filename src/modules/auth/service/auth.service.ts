import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as b from 'bcrypt';

import { UsersService } from '@modules/users/service/users.service';
import { RegisterUserDto } from '@modules/auth/dto/register.dto';
import { LoginUserDto } from '@modules/auth/dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
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
    } catch (e) {
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

  public async login(loginUserDto: LoginUserDto) {}

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await b.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
