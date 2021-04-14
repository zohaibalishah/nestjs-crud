import { IsNotEmpty } from "class-validator";

export class CreateTask{
    id:string;
    
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description:string;
}