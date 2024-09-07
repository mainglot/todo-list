import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todos } from './schemas/todos.schema';
import { CreateDto } from './dto/create.dto';
import { TodoItemIdDto } from './dto/todo-item-id.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectModel(Todos.name) private todoModel: Model<Todos>
    ) {}

    async getList(userId: string): Promise<Todos[]> {
        return this.todoModel.find({
            userId,
            deleted: false
        }).exec();
    }

    async create(createDto: CreateDto): Promise<Todos> {
        const createdTodos = new this.todoModel(createDto);
        return createdTodos.save();
    }

    async findOne(id: TodoItemIdDto): Promise<Todos> {
        return this.todoModel.findOne({
            _id: id.id
        }).exec();
    }

    async setDone(id: TodoItemIdDto, userId: string): Promise<Todos> {
        await this.todoModel.updateOne({
            _id: id.id,
            userId
        }, { done: true });
        return await this.findOne(id);
    }

    async delete(id: TodoItemIdDto, userId: string): Promise<boolean> {
        await this.todoModel.updateOne({
            _id: id.id,
            userId
        }, { deleted: true });
        return true;
    }
}
