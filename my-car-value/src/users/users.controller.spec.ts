import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      // signUp: () => {},
    };

    userService = {
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
      },
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'password',
        } as User);
      },
      // remove: () => {},
      // update: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: userService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('findAllUsers returns a list wof users with given email', async () => {
      const users = await controller.findAllUsers('asdf@asdf.com');
      expect(users.length).toEqual(1);
      expect(users[0].email).toEqual('asdf@asdf.com');
    });
  });
  describe('findOne', () => {
    it('returns a single user with given id', async () => {
      const user = await controller.findUser('123');
      expect(user).toBeDefined();
    });
    it('should throw an error if user not found', async () => {
      userService.findOne = () => null;
      try {
        await controller.findUser('123');
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('signIn', () => {
    it('signin updates session and returns user', async () => {
      const session = { userId: 0 };
      const user = await controller.signIn(
        {
          email: 'asdf@asdf.com',
          password: 'password',
        },
        session,
      );
      expect(user.id).toEqual(1);
      expect(session.userId).toEqual(1);
    });
  });
});
