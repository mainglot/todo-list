import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todos } from './schemas/todos.schema';
import { todo } from 'node:test';
import { FilterDto } from './dto/filter.dto';
import { CreateDto } from './dto/create.dto';
import { TodoItemIdDto } from './dto/todo-item-id.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tasks')
export class TodosController {
    constructor(
        private todosService: TodosService
    ) {}

    @Get('')
    async getList(@Body() filter: FilterDto): Promise<Todos[]> {
        return this.todosService.getList(filter);
    }

    @Post('')
    async create(@Body() createDto: CreateDto): Promise<Todos> {
        return this.todosService.create(createDto);
    }

    @Patch(':id')
    async setDone(@Body() todoItemId: TodoItemIdDto): Promise<Todos> {
        return this.todosService.setDone(todoItemId);
    }

    @Delete(':id')
    async delete(@Body() todoItemId: TodoItemIdDto): Promise<boolean> {
        return this.todosService.delete(todoItemId);
    }
}
