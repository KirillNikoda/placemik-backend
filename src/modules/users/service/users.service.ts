import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as b from 'bcrypt';

import { User } from '@modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '@modules/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  public async getBy(filterOptions: Partial<User>) {
    const user = await this.usersRepository.findOne(filterOptions);

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  public async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await b.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  public async create(registerUserDto: RegisterUserDto) {
    const newUser = await this.usersRepository.create(registerUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
