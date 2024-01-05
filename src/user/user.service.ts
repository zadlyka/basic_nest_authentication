import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hash = await bcrypt.hash(password ?? 'not-set', 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.update(id, {
      ...user,
      ...updateUserDto,
    });

    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    this.userRepository.remove(user);
    return;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByOrFail({ email });
  }
}
