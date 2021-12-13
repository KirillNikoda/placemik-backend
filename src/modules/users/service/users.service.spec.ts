import { UsersService } from '@modules/users/service/users.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
