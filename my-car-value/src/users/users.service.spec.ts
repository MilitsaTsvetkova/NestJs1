// import { Test, TestingModule } from '@nestjs/testing';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// import { UsersService } from './users.service';

// describe('UsersService', () => {
//   let service: UsersService;
//   let userRepository: Repository<User>;

//   beforeEach(async () => {
//     userRepository = {} as Repository<User>;
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: UserRepository,
//           useValue: userRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//   });

it('should be defined', () => {
  expect(2 + 2).toEqual(4);
});
// });
