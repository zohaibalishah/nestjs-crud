import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetTasksFilterDto } from '../tasks/dto/get.task.filter.dto';
import { Task, TaskStatus } from '../tasks/task.interface.model';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getalltask(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilter(filterDto);
    } else {
      return this.taskService.getAll();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.createTask(title, description);
  }

  @Get(':id')
  getById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('status') staus: TaskStatus): Task {
    return this.taskService.updateTask(id, staus);
  }
}
