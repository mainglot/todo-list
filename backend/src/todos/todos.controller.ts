import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todos } from './schemas/todos.schema';
import { CreateDto } from './dto/create.dto';
import { TodoItemIdDto } from './dto/todo-item-id.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TodosController {
    constructor(
        private todosService: TodosService
    ) {}

    @Get()
    async getList(@Request() req): Promise<Todos[]> {
        const userId = req.user.sub;
        return this.todosService.getList(userId);
    }

    @Post()
    async create(@Body() createDto: CreateDto, @Request() req): Promise<Todos> {
        return this.todosService.create({
            ...createDto,
            userId: req.user.sub
        });
    }

    @ApiParam({ name: 'id', required: true })
    @Patch(':id')
    async setDone(@Param() param: TodoItemIdDto, @Request() req): Promise<Todos> {
        const userId = req.user.sub;
        return this.todosService.setDone(param, userId);
    }

    @ApiParam({ name: 'id', required: true })
    @Delete(':id')
    async delete(@Param() todoItemId: TodoItemIdDto, @Request() req): Promise<boolean> {
        const userId = req.user.sub;
        return this.todosService.delete(todoItemId, userId);
    }
}
