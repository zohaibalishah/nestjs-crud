import { IsIn, IsOptional, IsNotEmpty } from 'class-validator';
import { Task, TaskStatus } from '../task.interface.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}
