import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    usersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      createUser: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('creates a new user with a salted and hashed password', async () => {
      const user = await authService.signUp('asdf@asdf.com', 'asdf');
      expect(user.password).not.toEqual('asdf');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('should throw an error if user signs up with email that is in use', async () => {
      await authService.signUp('asdf@asdf.com', 'asdf');
      try {
        await authService.signUp('asdf@asdf.com', 'asdf');
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('signIn', () => {
    it('should throw an error if user signs in with unknown email', async () => {
      try {
        await authService.signIn('asdf@asdf.com', 'asdf');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw an error if user signs in with invalid password', async () => {
      await authService.signUp('asdf@asdf.com', 'asdf34');
      try {
        await authService.signIn('asdf@asdf.com', 'asdf');
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if user signs in with invalid password', async () => {
      await authService.signUp('asdf@asdf.com', 'mypassword');

      const user = await authService.signIn('asdf@asdf.com', 'mypassword');
      expect(user).toBeDefined();
    });
  });
});
