import { Assignment } from "./assignment";
import { TaskQuestion } from "./task-question";

export class AssignmentResponse {

   id!:number 
   title!:string
   taskQuestion:TaskQuestion[]=[]
}
