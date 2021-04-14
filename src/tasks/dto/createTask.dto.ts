import { IsNotEmpty } from "class-validator";

export class CreateTaskDTO{
    id:string;
    
    @IsNotEmpty()
    title:string;

    
    @IsNotEmpty()
    description:string;
}