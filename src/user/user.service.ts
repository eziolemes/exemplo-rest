import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const user = await this.repository.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await this.repository.insert(user);

    return user;
  }

  async findAll() {
    const users = await this.repository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    //Carrega um usuário, caso exista
    //e adiciona os dados enviados
    const user = await this.repository.preload({
      id,
      ...data,
    });
    if (!user) throw new NotFoundException('User not found');

    await this.repository.save(user);

    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    return await this.repository.remove(user);
  }
}
