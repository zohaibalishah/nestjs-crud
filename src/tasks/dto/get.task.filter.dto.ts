import {Task, TaskStatus} from '../task.interface.model';
 
export class GetTasksFilterDto{
    status:TaskStatus;
    search:string;
}