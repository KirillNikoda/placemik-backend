import { AuthenticationService } from '@modules/auth/services/auth.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();

    service = module.get(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
