import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { GetTaskFilterDto } from 'src/dto/getTodofilter.dto';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
    constructor(private todoService: TodosService) {}

    @Get('/:id')
    getTodoById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Todo> {
        return this.todoService.getTodoById(id, user)
    }

    @Get()
    getTodos(
        @Query() filerDto: GetTaskFilterDto,
        @GetUser() user: User
    ): Promise<Todo[]> {
        return this.todoService.getTodos(filerDto, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTodo(
        @Body() createDto: CreateTodoDto,
        @GetUser() user: User
    ): Promise<Todo> {
        return this.todoService.createTodo(createDto, user)
    }

    @Delete('/:id')
    deleteTodo(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Object> {
        return this.todoService.deleteTodo(id, user)
    }

    @Patch('/:id')
    updateTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body('todo') todo: string,
        @Body('completed', ParseBoolPipe) completed: boolean,
        @GetUser() user: User
    ): Promise<Todo> {
        return this.todoService.updateTodo(id, todo, completed, user)
    }
}
