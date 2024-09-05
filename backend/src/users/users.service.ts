import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
    ];

    constructor(
      @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    }

    async findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }
    
    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({
          name: username
        }).exec();
    }
}
