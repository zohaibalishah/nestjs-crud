import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface.model';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get.task.filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAll();
    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const task= this.tasks.find((task) => task.id == id);
    if(!task){
      throw new NotFoundException(`Task Not found is this ${id}`)
    }
    return task
  }
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const task=this.getTaskById(id)
     this.tasks.filter((task) => task.id !== task.id);
  }
}
