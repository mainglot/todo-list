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

    async getList(): Promise<Todos[]> {
        return this.todoModel.find({
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

    async setDone(id: TodoItemIdDto): Promise<Todos> {
        await this.todoModel.updateOne({
            _id: id.id
        }, { done: true });
        return await this.findOne(id);
    }

    async delete(id: TodoItemIdDto): Promise<boolean> {
        await this.todoModel.updateOne({
            _id: id.id
        }, { deleted: true });
        return true;
    }
}
