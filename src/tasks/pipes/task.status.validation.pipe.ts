import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.interface.model';

export class TaskStatusValidationPipe implements PipeTransform {
    // array for define status
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

//   method to check the status in array
  private isStatusValidate(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
//   builtin method for va;lidation
  transform(value: any, metadta: ArgumentMetadata) {
    // console.log("value",value)
    // console.log("metadta",metadta)
    value = value.toUpperCase();
    if (!this.isStatusValidate(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return value;
  }
}
