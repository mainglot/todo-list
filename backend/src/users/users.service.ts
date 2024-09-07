import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
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
    
    async findOne(name: string): Promise<User | undefined> {
        return this.userModel.findOne({
          name: name
        }).exec();
    }

    async removeSession(user: User) {
      await this.userModel.updateOne({
        name: user.name
      }, {
        token: null,
      });
    }

    async addSession(user: User, token: string) {
      await this.userModel.updateOne({
        name: user.name
      }, {
        token
      });
    }
}
