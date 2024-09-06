import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todos } from './schemas/todos.schema';
import { CreateDto } from './dto/create.dto';
import { TodoItemIdDto } from './dto/todo-item-id.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tasks')
export class TodosController {
    constructor(
        private todosService: TodosService
    ) {}

    @Get()
    async getList(): Promise<any> {
        return this.todosService.getList();
    }

    @Post()
    async create(@Body() createDto: CreateDto): Promise<Todos> {
        return this.todosService.create(createDto);
    }

    @ApiParam({ name: 'id', required: true })
    @Patch(':id')
    async setDone(@Param() req: TodoItemIdDto): Promise<Todos> {
        return this.todosService.setDone(req);
    }

    @ApiParam({ name: 'id', required: true })
    @Delete(':id')
    async delete(@Request() todoItemId: TodoItemIdDto): Promise<boolean> {
        return this.todosService.delete(todoItemId);
    }
}
